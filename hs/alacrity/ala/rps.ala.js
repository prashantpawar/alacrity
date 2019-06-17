import * as stdlib from './alacrity-runtime.mjs';

/* XXX Copy the ABI from the solc output */

/* XXX Copy the bytecode from the solc output */

export function A(ctc, interact, v0, v1, v2, kTop) {
  const v4 = v2 == 0;
  const v5 = v2 == 1;
  const v6 = v2 == 2;
  const v7 = v5 ? true : v6;
  const v8 = v4 ? true : v7;
  stdlib.assert(v8);
  const v9 = stdlib.randomUInt256();
  const v10 = stdlib.hexOf(v9);
  const v11 = stdlib.hexOf(v2);
  const v12 = stdlib.msg_cat(v10, v11);
  const v13 = stdlib.keccak256(v12);
  const v14 = v0;
  const v15 = v1;
  const v16 = v13;
  const v17 = v14 + v15;
  ctc.send("m0", [v14, v15, v16], v17);
  ctc.recv("e0", (v14, v15, v16) => {
    ctc.recv("e1", (v23) => {
      const v24 = true;
      const v25 = v24 ? false : true;
      const v26 = v23 == 0;
      const v27 = v23 == 1;
      const v28 = v23 == 2;
      const v29 = v27 ? true : v28;
      const v30 = v26 ? true : v29;
      const v31 = v25 ? false : true;
      const v32 = v31 ? true : v30;
      stdlib.assert(v32);
      const v33 = v9;
      const v34 = v2;
      ctc.send("m2", [v14, v15, v16, v23, v33, v34], 0);
      ctc.recv("e2", (v33, v34) => {
        const v35 = stdlib.hexOf(v33);
        const v36 = stdlib.hexOf(v34);
        const v37 = stdlib.msg_cat(v35, v36);
        const v38 = stdlib.keccak256(v37);
        const v39 = v16 == v38;
        stdlib.assert(v39);
        const v40 = true;
        const v41 = v40 ? false : true;
        const v42 = v34 == 0;
        const v43 = v34 == 1;
        const v44 = v34 == 2;
        const v45 = v43 ? true : v44;
        const v46 = v42 ? true : v45;
        const v47 = v41 ? false : true;
        const v48 = v47 ? true : v46;
        stdlib.assert(v48);
        const v49 = v34 == 0;
        const v50 = v34 == 1;
        const v51 = v34 == 2;
        const v52 = v50 ? true : v51;
        const v53 = v49 ? true : v52;
        const v54 = v23 == 0;
        const v55 = v23 == 1;
        const v56 = v23 == 2;
        const v57 = v55 ? true : v56;
        const v58 = v54 ? true : v57;
        const v59 = v53 ? v58 : false;
        const v60 = 4 - v23;
        const v61 = v34 + v60;
        const v62 = v61 % 3;
        const v63 = v58 ? 0 : 1;
        const v64 = v53 ? 2 : v63;
        const v65 = v59 ? v62 : v64;
        const v66 = v65 == 0;
        const v67 = v65 == 1;
        const v68 = v65 == 2;
        const v69 = v67 ? true : v68;
        const v70 = v66 ? true : v69;
        stdlib.assert(v70);
        const v71 = v65 == 2;
        const v72 = v34 == 0;
        const v73 = v34 == 1;
        const v74 = v34 == 2;
        const v75 = v73 ? true : v74;
        const v76 = v72 ? true : v75;
        const v77 = v71 ? false : true;
        const v78 = v77 ? true : v76;
        stdlib.assert(v78);
        const v79 = v65 == 0;
        const v80 = v23 == 0;
        const v81 = v23 == 1;
        const v82 = v23 == 2;
        const v83 = v81 ? true : v82;
        const v84 = v80 ? true : v83;
        const v85 = v79 ? false : true;
        const v86 = v85 ? true : v84;
        stdlib.assert(v86);
        const v87 = v65 == 2;
        const v88 = 2 * v14;
        const v89 = v88 + v15;
        const v90 = v65 == 0;
        const v91 = 2 * v14;
        const v92 = v14 + v15;
        const v93 = v90 ? v15 : v92;
        const v94 = v90 ? v91 : v14;
        const v95 = v87 ? v89 : v93;
        const v96 = v87 ? 0 : v94;
        kTop(v65); }) }) }) }

export function B(ctc, interact, v3, kTop) {
  ctc.recv("e0", (v14, v15, v16) => {
    const v18 = v3 == 0;
    const v19 = v3 == 1;
    const v20 = v3 == 2;
    const v21 = v19 ? true : v20;
    const v22 = v18 ? true : v21;
    stdlib.assert(v22);
    const v23 = v3;
    ctc.send("m1", [v14, v15, v16, v23], v14);
    ctc.recv("e1", (v23) => {
      const v24 = true;
      const v25 = v24 ? false : true;
      const v26 = v23 == 0;
      const v27 = v23 == 1;
      const v28 = v23 == 2;
      const v29 = v27 ? true : v28;
      const v30 = v26 ? true : v29;
      const v31 = v25 ? false : true;
      const v32 = v31 ? true : v30;
      stdlib.assert(v32);
      ctc.recv("e2", (v33, v34) => {
        const v35 = stdlib.hexOf(v33);
        const v36 = stdlib.hexOf(v34);
        const v37 = stdlib.msg_cat(v35, v36);
        const v38 = stdlib.keccak256(v37);
        const v39 = v16 == v38;
        stdlib.assert(v39);
        const v40 = true;
        const v41 = v40 ? false : true;
        const v42 = v34 == 0;
        const v43 = v34 == 1;
        const v44 = v34 == 2;
        const v45 = v43 ? true : v44;
        const v46 = v42 ? true : v45;
        const v47 = v41 ? false : true;
        const v48 = v47 ? true : v46;
        stdlib.assert(v48);
        const v49 = v34 == 0;
        const v50 = v34 == 1;
        const v51 = v34 == 2;
        const v52 = v50 ? true : v51;
        const v53 = v49 ? true : v52;
        const v54 = v23 == 0;
        const v55 = v23 == 1;
        const v56 = v23 == 2;
        const v57 = v55 ? true : v56;
        const v58 = v54 ? true : v57;
        const v59 = v53 ? v58 : false;
        const v60 = 4 - v23;
        const v61 = v34 + v60;
        const v62 = v61 % 3;
        const v63 = v58 ? 0 : 1;
        const v64 = v53 ? 2 : v63;
        const v65 = v59 ? v62 : v64;
        const v66 = v65 == 0;
        const v67 = v65 == 1;
        const v68 = v65 == 2;
        const v69 = v67 ? true : v68;
        const v70 = v66 ? true : v69;
        stdlib.assert(v70);
        const v71 = v65 == 2;
        const v72 = v34 == 0;
        const v73 = v34 == 1;
        const v74 = v34 == 2;
        const v75 = v73 ? true : v74;
        const v76 = v72 ? true : v75;
        const v77 = v71 ? false : true;
        const v78 = v77 ? true : v76;
        stdlib.assert(v78);
        const v79 = v65 == 0;
        const v80 = v23 == 0;
        const v81 = v23 == 1;
        const v82 = v23 == 2;
        const v83 = v81 ? true : v82;
        const v84 = v80 ? true : v83;
        const v85 = v79 ? false : true;
        const v86 = v85 ? true : v84;
        stdlib.assert(v86);
        const v87 = v65 == 2;
        const v88 = 2 * v14;
        const v89 = v88 + v15;
        const v90 = v65 == 0;
        const v91 = 2 * v14;
        const v92 = v14 + v15;
        const v93 = v90 ? v15 : v92;
        const v94 = v90 ? v91 : v14;
        const v95 = v87 ? v89 : v93;
        const v96 = v87 ? 0 : v94;
        kTop(v65); }) }) }) }