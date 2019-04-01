# Alacrity

Alacrity is a domain-specific language for trustworthy distributed
applications. It uses a cascading style of verification with
guarantees about program execution, compilation, correctness,
security, and efficiency. It uses a suite of verification methods,
like type theory, theorem proving, model checking, the strand spaces
method, and dynamical system simulation.

The core philosophy of Alacrity is to design a highly constrained
programming language that makes it easy to automatically prove the
structural components of desirable properties about applications and
makes it possible to easily prove the user-specific components of
those properties. This is in contrast to designing an unconstrained
language and providing a novel new proving technique.

### License

This code is being developed as free software by LegiLogic, Inc., for
the sake of Alacris, Ltd., that owns the copyright and publishes the
code.

The Alacrity software is distributed under the GNU Lesser General
Public License, version 2.1. See the file [LICENSE](LICENSE).

### Design and Terminology

In the space of verified distributed software, there are a large
number of terms with similar and overlapping meanings. We use the
following terms in Alacrity:

A **message** is a term generated by a free algebra involving atomic
values (like strings, bytes, numbers, and keys), concatenation, and
encryption.

We abstract different cryptographic functions as particular kinds of
keys. For example: a symmetric encryption is a key that is its own
decryptor; a one-way hash is encryption with a key that has no
inverse; an asymmetric encryption has a pair of keys that are related
by the `inverse` operation; and so on.

We distinguish messages and patterns that describe those
messages. Patterns represent encryption abstractly, by indicating
which key in an environment is used to encrypt. This means that
_participants_ must declare a pattern and an encryption environment.
Similarly, when concrete bytes are received, they are parsed with
reference to an environment (that contains keys used to decrypt parts
of the message.)

We may express this as a type:

```
MsgPat := Atom Bytes | Concat MsgPat MsgPat | Encrypt MsgPat Var
Msg := (Var -> Key) x MsgPat
Raw := Bytes

write : Msg -> Raw
read  : (Var -> Key) x Raw -> Msg
```

A **blockchain** is a unique ordered list of messages that is common
knowledge, globally authoritative, and monotonically
increasing. Alacrity is not a blockchain; it uses existing
blockchains. The minimal API Alacrity expects from a blockchain is:

XXX Also, by this definition, the "messages" in a typical "blockchain"
    is actually a list of individual transactions plus administrative
    data. Maybe we should call the list-of-message abstraction
    something else than a "blockchain". Maybe a message history or
    something? And then say a blockchain is a history of blocks?

YYY This is all true, but I think it is beneath the level of
    abstraction Alacrity is at. For example, if the administrative
    messages are relevant, then they are part of the message history;
    otherwise they are just details about the blockchain was
    implemented.

```
data Chain = Genesis | Confirmed Raw Chain

current : () -> Chain

post : Raw -> Boolean
```

XXX Why not just a list or sequence (actually trie) of blocks? This
    way we can abstract a way the means of sequencing and use
    generic theorems about sequences instead of introducing new ad hoc
    chaining constructors.

YYY We are not actually using this type. It is just for explanatory
    purposes. Furthermore, I don't believe there are relevant theorems
    about sequences other than fold.

XXX Also, why does `post` return a boolean and not unit, if we're
    having side-effects anyway?

YYY This represents how posting may not succeed.

XXX Finally, a block usually includes a set of valid transactions, not just one;
    a miner may post a block, but individual users post a single transaction
    that a miner may eventually include in a block, or not.
    One essential thing a blockchain does bring, though, is a *consensus*,
    that ensures that the state grows monotonically, and
    you cannot remove a message from the history.

YYY Below our abstraction. This isn't a description of how to
    implement a blockchain. It is just what we want from it. The fact
    that an actual blockchain has a bunch in one block just means that
    when you observe incoming messages, they come in chunks. They are
    not truly set-like btw because even within a block they are
    ordered.

That is, Alacrity only expects that a blockchain provides the ability
to observe the history of the chain (`current`) and attempt to post a
message to chain (`post`). We refer to this posting process as
*execution*. Some blockchains may in fact provide more functionality
than this, such as the ability for message sequences to observe
properties like balancing and so on. Alacrity implementations (such as
compilers specific to particular blockchains) may make use of these
features, as an optimization, but we intentionally choose a
lowest-common denominator perspective on blockchains.

Alacrity assumes that blockchain platforms provide per-application
chains; in other words, if two distributed applications X and Y are
both deployed on chain A, then the messages for X and Y can never be
confused with each other. For platforms that do not actually support
this, Alacrity compiles messages to be prefixed with unique designations
that isolate communication for an application, in a way analogous to
ports in TCP/UDP.

XXX The sub-blockchains are even per-application-instance. If we play
    rock-paper-scissors many time, each instance will have its own
    prefix or encoding.  In practice, it's not so much a prefix as it
    is part of the "address" of the computation: In Bitcoin, you'd
    send money to a continuation "script" identified by the hash of
    code including all closed-over variables, which if needed would
    include some unique differentiating value.  In rchain's rholang,
    which uses a variant of the Pi calculus, this would be even more
    directly supported.  On Ethereum, the code would be in a
    "contract" with a unique address and a read/write state (at the VM
    level, a map from uint256 to uint256, but higher-level languages
    build arbitrary stuff on top of that). You'd somehow generate a
    unique address for the interaction that can't be faked by third
    parties (hash of the player addresses and number they provide),
    and would store the state of the interaction under that address.
    When we prove full abstraction for the sub-blockchain and study
    the strand spaces, we must show somehow that indeed each instance
    of interaction is well separate from the others.  Presumably, at
    the beginning at least, we'll axiomatize that the proper use of
    contracts works.  Later on, we may prove it from a model of the
    Blockchain.

A **distributed application** is a collection of _participants_ that post
to a _blockchain_ to collaboratively implement some functionality. These
participants agree on a _protocol_.

XXX Apparently, our current investors prefer the term "Decentralized Application"
    to "Distributed Application". Go figure.
    
YYY Feel free to `replace-string`

A **protocol** is the language of _messages_ that the set of
_participants_ in a _distributed application_, as well as an
interpretation of the messages.  By "interpretation of the messages",
we mean an abstract type that represents the meaning of the chain. For
example, this type might be an account ledger (a mapping of account
names to balances.)  We may express this as a type:

```
Protocol State := {
 valid   : Msg -> Boolean;
 init    : State
 observe : State x Msg -> State
}
```

In this type, we represent the set of valid messages for a protocol as
a predicate that determines membership in the set, `valid`. Alacrity
does not actually require users to write a `valid` function; instead
it includes an expressive specification language for these valid
message sets that is guaranteed to produce membership functions with
desirable properties, like computability. This also facilitates
specially compiling protocols for particular blockchain platforms with
expressive message constraints.

XXX Yes, but then, there is also a concept of context-dependent
    validity, that is not captured by the internal structure of the
    message alone, but also by the current State, i.e. you can't
    withdraw more than you have in your account. Maybe we need two
    separate words for that.  I propose well-formed vs valid, a common
    distinction in logic.  Or do we want to reserve well-formed for an
    element merely being of the correct type, with some different name
    for some additional intermediate state-less predicate?
    
YYY I agree that this is a problem with the representation. As
    written, the `valid` predicate is state-independent and
    corresponds to well-formed-ness. The problem with validity is that
    it depends on some way to describe the public perspective on the
    message. My plan is to represent invalid messages as idempotent
    messages where `observe s invalid = s`.

Our representation of the interpretation is similarly subtle. It is
plausible to use a representation such as `interp : Chain ->
State`. This is problematic because it means that the interpretation
of `Confirmed m1 c0` can be arbitrarily different from the
interpretation of `c0`. This means, for example, that a message in the
future can cause a message in the past to have a completely different
effect. Our representation (as a catamorphism) guarantees that there
is a unique interpretation of every chain that is independent of the
future. Like with `valid`, Alacrity guarantees that `observe` is
computable and deterministic.

Strictly speaking, `valid` is not necessary, because we could write a
version of `observe` that performs its task:

```
new_observe s m :=
  if valid m then
     observe s m
  else
     s
```

However, we include `valid` because some blockchain platforms offer
the efficient ability to reject messages based on their structure.

From the perspective of Alacrity, the state of a protocol universally
agreed upon and the chain is universal common knowledge. However, the
`init` and `observe` functions are not actually used at runtime. This
is because they can do uncomputable things, like see through all
encryption. The type specification shows this by `observe` receiving
a `Msg` argument and not a `Bytes` argument. This means that the
protocol represents an external, omniscient perspective on the
application state.

A **participant** of a protocol is a particular agent that is taking
part in the protocol conversation. It has its own interpretation of
the state of the protocol that is a reflection of its knowledge, based
on its private, but limited, information. In addition, a participant
has an initial message that it would like to post to the protocol, as
well as a function analogous to `observe` that updates its internal
view and potentially posts messages. Finally, a participant has a
valuation of protocol states that determines their desirability to the
participant.

We represent this as the following type:

```
Participant State (p:Protocol State) Internal View := {
 abstract : View -> Set State
 concrete : State -> View
 value    : State -> Real
 init     : Internal x Maybe Msg
 react    : Internal x View x Raw ->
            Internal x View x Maybe Msg
}
```

XXX I believe the value must come from the View, because the Liveness
    property will suppose that everyone "acts according to their
    interest", and this has to be defined in terms of a value function
    that each participant can reason about and ascertain has increased
    between safe observable points.
    
YYY First, this is equivalent, because we can just compose `value` and
    `concrete` in that case. Second, whenever we reason about the
    global behavior of the protocol, we use `State` and not
    `View`. The game theory verification is about that global
    perspective. Individual participants will essentially act as
    though the actual state is the one with the minimum value from
    those abstracted by the concrete view.

XXX Also, I'm not convinced that View shouldn't be "just" `Internal`
    or `Internal × Public`; I can see it be some erasure of the
    content that you can't decrypt, but somehow equality still
    matters, especially as to what you include in a message you send,
    so it's not exactly an erasure, though it is a limitation on what
    functions the participant can use in their continuations,
    i.e. can't decrypt with other keys.  There ought to be a way to
    express that in types — maybe an effect system for key management?
    
YYY I think that eventually we will want some library that knows the
    available keys and automatically updates the view with the
    now-publicly available information. The problem is that doing this
    efficiently is difficult because we don't want to assume that we
    store the complete message history in case maybe in the future we
    learn a key. The current specification is a pragmatic
    factorization.

In this type, `Internal` represents private information that the
participant holds, such as their secret keys or goals. `View`
represents their perspective on the protocol state.

A participant must prove that their view and the protocol state form a
Galois connection. They do this by providing the `abstract` and
`concrete` functions. The first translates a private view into the set
of possible real states that it corresponds to. The second translates
a real state into the unique view that it would have. These two
functions must be related:

XXX I'm not sure what we gain by this `abstract` function, especially
    if we make the value depend on the view. Then we only need the
    `view` function (better name for `concrete`?)
    
YYY It is necessary for maintaining consistency during reaction.

```
forall (v:View) (s:State),
 In s (abstract v) <-> (concrete s) = v
```

Alacrity includes a specification language for writing views
that automatically derives appropriate abstraction and concretization
functions.

The `value` function represents the valuation of the actual protocol
state. Alacrity guarantees that this function is computable and highly
regular, as it is used in our game-theoretic analysis of the
efficiency of the protocol.

These functions (`abstract`, `concrete`, and `value`) are not actually
executed at runtime, but exist to ensure the correctness of the
participant with respect to the protocol.
Indeed, no one can execute them at runtime,
because that would require having access to
all the private information of all the other users.

At runtime, the participant is initialized with `init` and consumes
messages, then updates their view, with `react`. There is no `View`
component of `init`, because it can be automatically derived by
`concrete p.init`.

The `react` provides an updated view, but it is not free to choose any
view. The new view must be consistent with the `observe` function of
the protocol. The following theorem must be proved:

```
forall (i:Internal) (v:View) (m:Msg) (s:State),
  In s (abstract v) /\ p.valid m ->
  (concrete (p.observe s m)) = (second (react i v (write m)))
```

In other words, for every actual state that the view represents, we
have to ensure that if that protocol state observed this message, then
its concretization is the view returned by the participant.

This is a difficult theorem to prove, because it requires us to
consider all possible messages that might have been sent. The key to
dispatching this theorem easily is ensuring that `react` ignores
messages that it cannot parse (i.e., returns the same view) and that
its abstraction of the state contains all updates that may occur that
it cannot observe. This theorem therefore provides the roadmap for how
to select an abstract view.

It may seem like `Internal` is not necessary, because we could include
it inside of `View` and make an `abstract` that just ignores that
piece and so on. The problem is that `concrete` could not synthesize
information that is truly never in the protocol state, such as the
hidden goals of a participant.

As a final note, participants react to their own messages, so the
`init` value doesn't need to return an updated view and the new view
returned by `react` is the view based on the received message, not the
sent message. This is because message posting may not succeed. A
typical programming pattern will be to store a desired post inside of
`Internal` and continue trying to post until it is successful,
and afterwards removing that internal state.

**Whole application programs** are programs that combine all aspects
of Alacrity programs by writing a sequenced version of a protocol
specification annotated with a finite number of participants roles,
each with initial messages and view specifications. In these programs,
the `observe` and `react` functions are combined together and for all
participants, but automatically extracted through end-point
projection. Although this is a crucial part of practically using
Alacrity, it is merely a convenience library and not core to the
semantic model.

### Verification

Alacrity uses a multi-layered, cascading style of verification. We
discuss each aspect in turn. In general, verification exists in one of
two categories: either it is property about the Alacrity tool suite or
it is a property about the particular Alacrity program. We'll refer to
the first as "DSL verification" and the second as "protocol
verification."

**Execution** verification is a kind of DSL verification whereby
the blockchain operations (such as the construction of the chain and
enforcement of the `valid` invariants) obey the semantics of
Alacrity. Each Alacrity implementation must prove that it provides
this as a matter of correct compilation.

**Full abstraction** is another DSL verification property whereby we
guarantee that the DSL semantics cannot be violated by lower-level
blockchain operations. For example, Alacrity guarantees that messages
that do not pass `valid` are not sent to the participants. This
guarantee could be enforced by ensuring that the underlying blockchain
observer faithful implements `valid` when it consumes messages from
the chain or by guaranteeing that the underlying blockchain itself has
been programmed to enforce the rules of `valid` (which may not be
possible, but is desirable when possible.)

These two properties are not interesting to Alacrity protocols
themselves. Instead, they are a necessary precondition for the proofs
that we do *about* Alacrity protocols to be meaningful when they are
deployed on actual blockchains.

**Correctness** is a protocol verification property that refers to the
"functional correctness" of the protocol. This means that the protocol
fulfills its overall mission; for example, that it represents a
balanced ledger. We express this mathematically via temporal logic
formula over the sequence of states, called traces. In Alacrity, a
trace always starts with `init` and is followed (in a branching
fashion) by all states such that there exists a message that when
`observe`d could lead from another state in the trace to it. We can
expressive this inductively:

```
Inductive ValidTrace : List State -> Prop :=
| VT_Init : ValidTrace [init]
| VT_Observe : forall s ss m,
                 ValidTrace ss ++ [s] ->
                 ValidTrace ss ++ [s; observe s m].
```

XXX The trace is probably more primitive than that, is not specific to
    the functional correctness, and should be introduced earlier.
    
YYY I agree that it is a general property, but I do not have an
    application other than functional correctness yet.

Correctness propositions are statements in a temporal logic (like LTL
or CTL), such as "For all states in the trace, the sum of the values
of accounts is zero."

This notion of verification matches precisely the existing notions
used in model checkers, like Alloy and SPIN, as well as fit nicely
into models used in verification environments like Coq.

**Security** verification is a form of protocol verification that
refers to the inability of irregular participants to falsify messages
or otherwise mislead regular participants. This means that the
participants in the protocol will not react to messages that are not
sent by another faithful participant. We express this mathematically
as a proposition on the strand space induced by the participant
programs. Strand spaces are an existing cryptographic protocol
specification and verification technique due to Guttman and Thayer. A
full explanation of their definition is beyond the scope of this
document. However, the model assumes a powerful attacker, called the
Dolev-Yao attacker, that the blockchain represents quite well. (The
main caveat is that some blockchains can restrict message
transmissions to satisfying the `valid` test.)

**Efficiency** verification is a protocol verification that refers to
the economic efficiency of protocol runs. In Alacrity, each
participant provides a function that evaluates the value of states as
a real number. Using the same trace space as in correctness
verification, we build a dynamical system that aggregates the value
across all participants. We can then investigate the long-run
equilibria of this system and asks questions about its efficiency and
optimality, such as whether all interactions preserve or increase
value.

### Examples

#### Rock-Paper-Scissors

Two participants want to play Rock-Paper-Scissors, but are distrustful
of the other player peeking or delaying their choice until after the
other exposes themselves. They agree to play on the blockchain.

The protocol proceeds by the players posting their hands,
encrypted. The other player can check if a posting is valid, because
they know the public part of the key. Once a player observes the other
one posting their hand, they reveal their own key. Once both do this,
they can both see the hands and know who one.

The state of the protocol is the actual hands of the players and
whether they've revealed yet. Each player's view is simply whether
they've posted yet, whether the other side posted, and whether they've
revealed yet. When player X has posted, the view is constrained to be
their actual hand. When the other player has posted, X just knows
that the internal state is a `Just`, but doesn't know what the
contents are.

This protocol could be elaborated with "stakes" about what the winner
gets. In this situation, the person that reveals first is at a
disadvantage because the second person can know if they are going to
lose and then not reveal. The court-system-idea comes into play here,
because they can take the chain to a third party and hold the other
side accountable for not revealing; if they are honest, they will do
it, but if they are not audience, the court will give them the
opportunity to reveal that they didn't lose, which, of course, they
will take.

This protocol does not have enough interesting invariants to have an
interesting correctness property. One plausible property is that any
message indicating a choice of move has no effect on the state after
the first choice.

However, there are meaningful security properties, such as the
inability of a man-in-middle-attack wherein player A tricks player B
into playing a game with player C, revealing their hand, and then
re-using that hand in the game with A, thus allowing A to observe B's
hand and control the win. A strand space analysis would, for example,
push us to ensure that the messages from B are marked with their
intended recipient A.

Given the simplicity of this application, its efficiency is
uncontroversial. Each player would rank all states as zero, except for
ones in which they win (one) or tie (half). The value is guaranteed to
increase or stay the same regardless of the state transitions.

#### Blackjack

The rock-paper-scissors example can be generalized to an interaction
where the submission is not three values (rock, paper, scissors), but
is an arbitrary N-bit number. The result could then be the XOR of the
two numbers. Once the result is available, the rest of the program now
has an N-bit number that neither side controlled the creation
of. Furthermore, if one side waits to reveal their key, then they can
have sole access to the number for a limited period of time.

We can apply this idea to a situation like a version of Blackjack
where every draw uses a fresh deck (i.e. cards can appear multiple
times.) Each time it is X's turn to draw a card, they pick a number
between 1 and 52, encrypt it, and posts it; then, the opponent Y picks
a number between 1 and 52, encrypts it, posts, and reveals their key;
X now computes `X + Y % 52` and uses the value as the card they
drew. Later in the game when the card would be revealed, X does so by
revealing their key, so the public can compute the number as well.

Another approach to a card game like Blackjack is to split the deck
beforehand and then randomize the individual sides. This would
disallow cards from repeating (because a player could compare with
their current drawn pile) but it would also expose a priori the
information about which side a given player has.

This is an example of the sort of abstraction that we will be able to
build with Alacrity by laying abstractions and protocols.

### Tools

The Alacrity tool suite includes:

- TODO A simulated blockchain for testing purposes.

- TODO A compiler from Alacrity programs to participants programs targeting
  the testing chain.

- Extractors that consume Alacrity programs and produce

--- TODO state space models for correctness proofs;

--- TODO strand space models for security proofs;

--- TODO dynamical systems for efficiency experiments;

--- TODO theorems to be verified for the soundness of the
participants' views.
