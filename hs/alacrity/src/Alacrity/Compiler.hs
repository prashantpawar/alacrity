module Alacrity.Compiler where

import Numeric.Natural
import Control.Monad.State.Lazy
import qualified Data.Map.Strict as M
import Data.Foldable
import qualified Data.Sequence as S
import Data.Text.Prettyprint.Doc
import Language.JavaScript.Parser as JS
import System.Exit
import Z3.Monad as Z3

import Alacrity.AST
import Alacrity.Parser

{- Inliner

   We remove XL_FunApp and convert XL_If into IF-THEN-ELSE where
   possible.

 -}

type XLFuns = M.Map XLVar ([XLVar], XLExpr)
type XLIFuns = M.Map XLVar (Bool, ([XLVar], XLExpr))
type InlineMonad a = State (XLFuns, XLIFuns) (Bool, a)

inline_fun :: XLVar -> InlineMonad ([XLVar], XLExpr)
inline_fun f = do
  (σi, σo) <- get
  case M.lookup f σo of
    Just v -> return v
    Nothing -> do
      case M.lookup f σi of
        Nothing -> error $ "Inline: Function unbound, or in cycle: " ++ show f
        Just (formals, fun_body) -> do
          let σi' = M.delete f σi
          put (σi', σo)
          (fp, fun_body') <- inline_expr fun_body
          let v = (fp, (formals, fun_body'))
          (σi'', σo') <- get          
          let σo'' = M.insert f v σo'
          put (σi'', σo'')
          return v

inline_exprs :: [XLExpr] -> InlineMonad [XLExpr]
inline_exprs es = foldM (\(tp, es') e -> do
                            (ep, e') <- inline_expr e
                            return (tp && ep, e' : es'))
                  (True, []) (reverse es)

inline_expr :: XLExpr -> InlineMonad XLExpr
inline_expr e =
  case e of
    XL_Con _ -> return (True, e)
    XL_Var _ -> return (True, e)
    XL_PrimApp p es -> inline_exprs es >>= \(ep, es') -> return (ep, XL_PrimApp p es')
    XL_If _ ce te fe -> do
      (cp, ce') <- inline_expr ce
      (tp, te') <- inline_expr te
      (fp, fe') <- inline_expr fe
      return (cp && tp && fp, XL_If (tp && fp) ce' te' fe')
    XL_Assert ae -> do
      (_, ae') <- inline_expr ae
      --- Assert is impure because it could fail
      return (False, XL_Assert ae')
    XL_ToConsensus p ins pe ce -> do
      (_, pe') <- inline_expr pe
      (_, ce') <- inline_expr ce
      return (False, XL_ToConsensus p ins pe' ce')
    XL_FromConsensus be -> do
      (_, be') <- inline_expr be
      return (False, XL_FromConsensus be')
    XL_Values es -> inline_exprs es >>= \(ep, es') -> return (ep, XL_Values es')
    XL_Transfer to te -> do
      (_, tp') <- inline_expr te
      return (False, XL_Transfer to tp')
    XL_Declassify de -> do
      (dp, de') <- inline_expr de
      return (dp, XL_Declassify de')
    XL_LetValues mp mvs ve be -> do
      (vp, ve') <- inline_expr ve
      (bp, be') <- inline_expr be
      return (vp && bp, XL_LetValues mp mvs ve' be')
    XL_FunApp f args -> do
      (arp, args') <- inline_exprs args
      (fp, (formals, fun_body')) <- inline_fun f
      return (arp && fp, XL_LetValues Nothing (Just formals) (XL_Values args') fun_body')

inline_defs :: [XLDef] -> XLFuns -> XLExpr -> XLExpr
inline_defs [] σ me = me'
  where ((_, me'), _) = runState (inline_expr me) (σ, M.empty)
inline_defs (XL_DefineFun f args body : ds) σ me = inline_defs ds σ' me
  where σ' = M.insert f (args,body) σ
inline_defs (XL_DefineValues vs e : ds) σ me = inline_defs ds σ me'
  where me'= XL_LetValues Nothing (Just vs) e me

inline :: XLProgram -> XLInlinedProgram
inline (XL_Prog defs ps m) = XL_InlinedProg ps (inline_defs defs M.empty m)

{- ANF

   See AST for a description of the job of this pass.

   The ANF monad stores the next available variable and the list of
   defined variables.

   XXX The ANF process has a big problem, because it is separate from
   EPP. If A transmits 'v' and B already knows 'v', then this code
   completely ignores that and does not introduce an assertion that
   the transmitted value is the same as the value already known. The
   correct behavior can be implemented manually by programmers, by not
   sharing names, but it would be more robust if this was done
   automatically. Unfortunately, the renaming environment in ANF does
   not track what each party knows, so it can't do this. One strategy
   would be to change XLRenaming to (Role -> XLVar -> ILArg) and
   record a separate renaming environment for everyone. This would be
   quite awkward, especially because the Contract role is really
   "everyone".

 -}

type ANFElem = (Role, ILVar, ILExpr)
type ANFMonad a = State (Natural, S.Seq ANFElem) a

runANF :: ANFMonad a -> a
runANF am = if null vs then a else error "ANF: Left variables in state!"
  where
    (a, (_, vs)) = runState am (0, S.Empty)

--- Run an ANF computation, with local new variables, but a global new
--- variable counter.
collectANF :: (ANFElem -> a -> a) -> (ANFMonad a) -> ANFMonad a
collectANF f ma = do
  (v0, vs0) <- get
  let (a, (v1, vs1)) = runState ma (v0, S.Empty)
  put (v1, vs0)
  return (foldr f a vs1)

consumeANF :: String -> ANFMonad ILVar
consumeANF s = do
  (nv, vs) <- get
  put (nv+1, vs)
  return (nv, s)

consumeANF_N :: Natural -> ANFMonad [ILVar]
consumeANF_N 0 = return []
consumeANF_N n = do
  v <- consumeANF ("ANF_N" ++ show n)
  vs <- consumeANF_N (n - 1)
  return $ v : vs

allocANF :: Role -> String -> ILExpr -> ANFMonad ILVar
allocANF mp s e = do
  (nvi, vs) <- get
  let nv = (nvi, s)
  put (nvi + 1, vs S.|> (mp, nv, e))
  return nv

allocANFs :: Role -> String -> [ILExpr] -> ANFMonad [ILVar]
allocANFs mp s es = mapM (allocANF mp s) es

type XLRenaming = M.Map XLVar ILArg

anf_parg :: (XLVar, ExprType) -> (XLRenaming, [(ILVar, ExprType)]) -> ANFMonad (XLRenaming, [(ILVar, ExprType)])
anf_parg (v, t) (ρ, args) =
  case M.lookup v ρ of
    Nothing -> do
      nv <- consumeANF v
      return (M.insert v (IL_Var nv) ρ, args' nv)
    Just (IL_Var nv) -> return (ρ, args' nv)
    Just _ -> error $ "ANF: Participant argument not bound to variable: " ++ v
  where args' nv = args ++ [(nv,t)]

anf_part :: (XLRenaming, ILPartInfo) -> (Participant, [(XLVar, ExprType)]) -> ANFMonad (XLRenaming, ILPartInfo)
anf_part (ρ, ips) (p, args) = do
  (ρ', args') <- foldrM anf_parg (ρ, []) args
  let ips' = M.insert p args' ips
  return (ρ', ips')

anf_parts :: XLPartInfo -> ANFMonad (XLRenaming, ILPartInfo)
anf_parts ps = foldM anf_part (M.empty, M.empty) (M.toList ps)

anf_exprs :: Role -> XLRenaming -> [XLExpr] -> ([ILArg] -> ANFMonad (Natural, ILTail)) -> ANFMonad (Natural, ILTail)
anf_exprs me ρ es mk =
  case es of
    [] -> mk []
    e : more ->
      anf_expr me ρ e k1
      where k1 [ e' ] = anf_exprs me ρ more k2
              where k2 es' = mk $ e' : es'
            k1 evs = error $ "anf_exprs, expect 1, got " ++ show evs

vsOnly :: [ILArg] -> [ILVar]
vsOnly [] = []
vsOnly (IL_Var v : m) = v : vsOnly m
vsOnly (_ : m) = vsOnly m

anf_renamed_to :: XLRenaming -> XLVar -> ILArg
anf_renamed_to ρ v =
  case M.lookup v ρ of
    Nothing -> error ("ANF: Variable unbound: " ++ (show v))
    Just a -> a

anf_out_rename :: XLRenaming -> [XLVar] -> ANFMonad (XLRenaming, [ILVar])
anf_out_rename ρ outs = foldM aor1 (ρ, []) (reverse outs)
  where aor1 (ρ', outs') ov =
          case M.lookup ov ρ' of
            Just (IL_Var iv) -> return (ρ', iv:outs')
            Just (IL_Con _) -> return (ρ', outs')
            Nothing -> do
              iv <- consumeANF "Consensus_Out"
              return (M.insert ov (IL_Var iv) ρ', iv:outs') 

anf_expr :: Role -> XLRenaming -> XLExpr -> ([ILArg] -> ANFMonad (Natural, ILTail)) -> ANFMonad (Natural, ILTail)
anf_expr me ρ e mk =
  case e of
    XL_Con b ->
      mk [ IL_Con b ]
    XL_Var v -> mk [ anf_renamed_to ρ v ]
    XL_PrimApp p args ->
      anf_exprs me ρ args (\args' -> ret_expr "PrimApp" (IL_PrimApp p args'))
    XL_If is_pure ce te fe ->
      anf_expr me ρ ce k
      where k [ ca ] =
              if is_pure then
                anf_expr me ρ te
                  (\ tvs ->
                      anf_expr me ρ fe
                        (\ fvs ->
                           if (length tvs /= length fvs) then
                             error "ANF: If branches don't have same continuation arity"
                           else do
                             ks <- allocANFs me "PureIf" $ zipWith (\ t f -> IL_PrimApp (CP IF_THEN_ELSE) [ ca, t, f ]) tvs fvs
                             mk $ map IL_Var ks))
              else do
                (tn, tt) <- anf_tail me ρ te mk
                (fn, ft) <- anf_tail me ρ fe mk
                unless (tn == fn) $ error "ANF: If branches don't have same continuation arity"
                return (tn, IL_If ca tt ft)
            k _ = error "anf_expr XL_If ce doesn't return 1"
    XL_Assert ae ->
      anf_expr me ρ ae (\[ aa ] -> ret_expr "Assert" (IL_Assert aa))
    XL_FromConsensus le -> do
      (ln, lt) <- anf_tail RoleContract ρ le mk
      return (ln, IL_FromConsensus lt)
    XL_ToConsensus from ins pe ce ->
      anf_expr (RolePart from) ρ pe
      (\ [ pa ] -> do
         let ins' = vsOnly $ map (anf_renamed_to ρ) ins
         (cn, ct) <- anf_tail RoleContract ρ ce mk
         return (cn, IL_ToConsensus from ins' pa ct))
    XL_Values args ->
      anf_exprs me ρ args (\args' -> mk args')
    XL_Transfer to ae ->
      anf_expr me ρ ae (\[ aa ] -> ret_expr "Transfer" (IL_Transfer to aa))
    XL_Declassify ae ->
      anf_expr me ρ ae (\[ aa ] -> ret_expr "Declassify" (IL_Declassify aa))
    XL_LetValues mwho mvs ve be ->
      anf_expr who ρ ve k
      where who = case mwho of
                    Nothing -> me
                    Just p -> RolePart p
            k nvs = anf_expr me ρ' be mk
              where ρ' = M.union ρvs ρ
                    ρvs = case mvs of
                      Nothing -> ρ
                      Just ovs ->
                        let olen = length ovs
                            nlen = length nvs in
                        if olen == nlen then
                          (M.fromList $ zip ovs nvs)
                        else
                          error $ "ANF XL_LetValues, context arity mismatch, " ++ show olen ++ " vs " ++ show nlen
    XL_FunApp _ _ -> error $ "ANF XL_FunApp, impossible after inliner"
  where ret_expr s ne = do
          nv <- allocANF me s ne
          mk [ IL_Var nv ]

anf_addVar :: ANFElem -> (Natural, ILTail) -> (Natural, ILTail)
anf_addVar (mp, v, e) (c, t) = (c, IL_Let mp (Just v) e t)

anf_tail :: Role -> XLRenaming -> XLExpr -> ([ILArg] -> ANFMonad (Natural, ILTail)) -> ANFMonad (Natural, ILTail)
anf_tail me ρ e mk = do
  collectANF anf_addVar (anf_expr me ρ e mk)

anf_ktop :: [ILArg] -> ANFMonad (Natural, ILTail)
anf_ktop args = return (int2nat (length args), IL_Ret args)

int2nat :: Int -> Natural
int2nat n = fromInteger $ toInteger n

anf :: XLInlinedProgram -> ILProgram
anf xilp = IL_Prog ips xt
  where
    XL_InlinedProg ps main = xilp
    (ips, xt) = runANF xm
    xm :: ANFMonad (ILPartInfo, ILTail)
    xm = do
      (ρ, nps) <- anf_parts ps
      (_, mt) <- anf_tail RoleContract ρ main anf_ktop
      return (nps, mt)

--- End-Point Projection

{-

This stage needs to generate the sub-programs and verify the following
properties:

1. The program is well-typed. (All types can be derived from the types
   of the participant's initial knowledge, so we only require
   annotations on those.) [This implies that the contract has no
   free-variables.]

2. The contract does not execute illegal primitives. The participants
   do not execute transfer.

3. No secret information is shared. (By default, all participants'
   initial knowledge is secret.)

4. All parties assert that information they receive as message
contents are the same as things they already know.

XXX Maybe more

-}

--- XXX The default type of variables is Secret
data SecurityLevel
  = Secret
  | Public
  deriving (Show)

type SType = (ExprType, SecurityLevel)

epp :: ILProgram -> BLProgram
epp _ = error $ "XXX epp"

{- Compilation to Javascript

   I'm imagining the type of the JS export is:

   Network -> Participant -> NetworkArgs x Args x (Result -> A) -> A or doesn't

   We have some standard way of interacting with the network (so we
   don't depend in the compiler on whether we're using rinkydink or
   whatever or what the name is.) Then, you can look up the code for
   one of the participants (by name). Then you provide extra arguments
   for the network (such as the contract / game id) and the
   participant's initial knowledge, then a continuation for what to do
   with the result.
  -}

as_js :: BLProgram -> JS.JSAST
as_js _ = error $ "XXX as_js"

emit_js :: BLProgram -> String
emit_js blp = JS.renderToString $ as_js blp

{- Compilation to Solidity

   The handler program becomes a contract factory where the first
   interaction is tied into the contract creation. The contract has a
   different function for each consensus block. The arguments are the
   input variables. At the end, the output variables are emitted via
   an event.

   In the future, when we compile to EVM directly, it won't work that
   way though. Instead, we'll do dispatch ourselves.
 -}

--- XXX The consensus block can know all of the variables to do hash storage.
emit_sol :: BLProgram -> Doc ann
emit_sol _ = error $ "XXX emit_sol"

{- Z3 Theory Generation

   The Z3 theory has to prove a few different things.

   1. The balance of CTC at the end of the protocol is 0. It will have
   to do this by employing something like the State monad to represent
   all the various modifications to the CTC value overtime and assert
   that it is 0 at the end. This ensure that the protocol doesn't
   "leave anything on the table".

   2. For each assert! in the program, assuming that all previous
   assert!s are true (including those in other participants and the
   contract) and DISHONEST is FALSE, the assert is true.

   3. For each assert! in the program, assuming that all previous
   assert!s are true (EXCLUDING those in other participants, but
   INCLUDING the contract) and DISHONEST is TRUE, the assert is true.

   When

   #1 has to be done in both #2 and #3 modes, because the transfer
   amounts may rely on participant data.

 -}

emit_z3 :: BLProgram -> Z3.Z3 [String]
emit_z3 _
  -- XXX Actually implement theory generation
 = do
  Z3.push
  f <- Z3.mkFalse
  Z3.assert f
  (res, mm) <- Z3.solverCheckAndGetModel
  Z3.pop 1
  case res of
    Z3.Unsat -> return []
    Z3.Sat ->
      case mm of
        Nothing -> return ["Problem; no model!"]
        Just m -> do
          s <- modelToString m
          return [s]
    Z3.Undef -> return []

compile :: FilePath -> IO ()
compile srcp = do
  xlp <- readAlacrityFile srcp
  writeFile (srcp ++ ".xl") (show (pretty xlp))
  let xilp = inline xlp
  writeFile (srcp ++ ".xil") (show (pretty xilp))
  let ilp = anf xilp
  writeFile (srcp ++ ".il") (show (pretty ilp))
  let blp = epp ilp
  writeFile (srcp ++ ".bl") (show (pretty blp))
  z3res <- evalZ3 (emit_z3 blp)
  case z3res of
    [] -> do
      writeFile (srcp ++ ".sol") (show (emit_sol blp))
      writeFile (srcp ++ ".js") (show (emit_js blp))
      exitSuccess
    ps -> do
      mapM_ (\x -> putStrLn $ ("Z3 error:" ++ x)) ps
      die "Z3 failed to verify!"
