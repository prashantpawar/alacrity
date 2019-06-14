import * as stdlib from 'stdlib.mjs';

export function initialize(net, interact) {
  return {
    A:
    (pA, pB, v0, v1, v2, kTop) => {
      return net.make(pA, pB, () => {
        var v4 = v0 == 0;
        var v5 = v0 == 1;
        var v6 = v0 == 2;
        var v7 = v5 ? true : v6;
        var v8 = v4 ? true : v7;
        var v9 = stdlib.assert(v8);
        var v10 = stdlib.random();
        var v11 = stdlib.bytes_cat(v10, v0);
        var v12 = stdlib.keccak256(v11);
        var v13 = v2;
        var v14 = v1;
        var v15 = v12;
        var v16 = v13 + v14;
        net.send(0, ["uint256", "uint256", "uint256"], [v13, v14, v15], v16);
        net.recv(0, ["uint256", "uint256", "uint256"], (v13, v14, v15) => {
          net.recv(1, ["uint256"], (v23) => {
            var v24 = true;
            var v25 = v24 ? false : true;
            var v26 = v23 == 0;
            var v27 = v23 == 1;
            var v28 = v23 == 2;
            var v29 = v27 ? true : v28;
            var v30 = v26 ? true : v29;
            var v31 = v25 ? false : true;
            var v32 = v31 ? true : v30;
            stdlib.assert(v32);
            var v34 = v10;
            var v35 = v0;
            net.send(2, ["uint256", "uint256", "uint256", "uint256", "uint256", "uint256"], [v13, v14, v15, v23, v34, v35], 0);
            net.recv(2, ["uint256", "uint256"], (v34, v35) => {
              var v36 = stdlib.bytes_cat(v34, v35);
              var v37 = stdlib.keccak256(v36);
              var v38 = v15 == v37;
              stdlib.assert(v38);
              var v40 = true;
              var v41 = v40 ? false : true;
              var v42 = v35 == 0;
              var v43 = v35 == 1;
              var v44 = v35 == 2;
              var v45 = v43 ? true : v44;
              var v46 = v42 ? true : v45;
              var v47 = v41 ? false : true;
              var v48 = v47 ? true : v46;
              stdlib.assert(v48);
              var v50 = v35 == 0;
              var v51 = v35 == 1;
              var v52 = v35 == 2;
              var v53 = v51 ? true : v52;
              var v54 = v50 ? true : v53;
              var v55 = v23 == 0;
              var v56 = v23 == 1;
              var v57 = v23 == 2;
              var v58 = v56 ? true : v57;
              var v59 = v55 ? true : v58;
              var v60 = v54 ? v59 : false;
              var v61 = 4 - v23;
              var v62 = v35 + v61;
              var v63 = v62 % 3;
              var v64 = v59 ? 0 : 1;
              var v65 = v54 ? 2 : v64;
              var v66 = v60 ? v63 : v65;
              var v67 = v66 == 0;
              var v68 = v66 == 1;
              var v69 = v66 == 2;
              var v70 = v68 ? true : v69;
              var v71 = v67 ? true : v70;
              stdlib.assert(v71);
              var v73 = v66 == 2;
              var v74 = v35 == 0;
              var v75 = v35 == 1;
              var v76 = v35 == 2;
              var v77 = v75 ? true : v76;
              var v78 = v74 ? true : v77;
              var v79 = v73 ? false : true;
              var v80 = v79 ? true : v78;
              stdlib.assert(v80);
              var v82 = v66 == 0;
              var v83 = v23 == 0;
              var v84 = v23 == 1;
              var v85 = v23 == 2;
              var v86 = v84 ? true : v85;
              var v87 = v83 ? true : v86;
              var v88 = v82 ? false : true;
              var v89 = v88 ? true : v87;
              stdlib.assert(v89);
              var v91 = v66 == 2;
              var v92 = 2 * v13;
              var v93 = v92 + v14;
              var v94 = v66 == 0;
              var v95 = 2 * v13;
              var v96 = v13 + v14;
              var v97 = v94 ? v14 : v96;
              var v98 = v94 ? v95 : v13;
              var v99 = v91 ? v93 : v97;
              var v100 = v91 ? 0 : v98;
              true;
              true;
              kTop(v66); }) }) }) }); }
    ,
    B:
    (ctc, pA, pB, v3, kTop) => {
      return net.attach(ctc, pA, pB, () => {
        net.recv(0, ["uint256", "uint256", "uint256"], (v13, v14, v15) => {
          var v17 = v3 == 0;
          var v18 = v3 == 1;
          var v19 = v3 == 2;
          var v20 = v18 ? true : v19;
          var v21 = v17 ? true : v20;
          var v22 = stdlib.assert(v21);
          var v23 = v3;
          net.send(1, ["uint256", "uint256", "uint256", "uint256"], [v13, v14, v15, v23], v13);
          net.recv(1, ["uint256"], (v23) => {
            var v24 = true;
            var v25 = v24 ? false : true;
            var v26 = v23 == 0;
            var v27 = v23 == 1;
            var v28 = v23 == 2;
            var v29 = v27 ? true : v28;
            var v30 = v26 ? true : v29;
            var v31 = v25 ? false : true;
            var v32 = v31 ? true : v30;
            stdlib.assert(v32);
            net.recv(2, ["uint256", "uint256"], (v34, v35) => {
              var v36 = stdlib.bytes_cat(v34, v35);
              var v37 = stdlib.keccak256(v36);
              var v38 = v15 == v37;
              stdlib.assert(v38);
              var v40 = true;
              var v41 = v40 ? false : true;
              var v42 = v35 == 0;
              var v43 = v35 == 1;
              var v44 = v35 == 2;
              var v45 = v43 ? true : v44;
              var v46 = v42 ? true : v45;
              var v47 = v41 ? false : true;
              var v48 = v47 ? true : v46;
              stdlib.assert(v48);
              var v50 = v35 == 0;
              var v51 = v35 == 1;
              var v52 = v35 == 2;
              var v53 = v51 ? true : v52;
              var v54 = v50 ? true : v53;
              var v55 = v23 == 0;
              var v56 = v23 == 1;
              var v57 = v23 == 2;
              var v58 = v56 ? true : v57;
              var v59 = v55 ? true : v58;
              var v60 = v54 ? v59 : false;
              var v61 = 4 - v23;
              var v62 = v35 + v61;
              var v63 = v62 % 3;
              var v64 = v59 ? 0 : 1;
              var v65 = v54 ? 2 : v64;
              var v66 = v60 ? v63 : v65;
              var v67 = v66 == 0;
              var v68 = v66 == 1;
              var v69 = v66 == 2;
              var v70 = v68 ? true : v69;
              var v71 = v67 ? true : v70;
              stdlib.assert(v71);
              var v73 = v66 == 2;
              var v74 = v35 == 0;
              var v75 = v35 == 1;
              var v76 = v35 == 2;
              var v77 = v75 ? true : v76;
              var v78 = v74 ? true : v77;
              var v79 = v73 ? false : true;
              var v80 = v79 ? true : v78;
              stdlib.assert(v80);
              var v82 = v66 == 0;
              var v83 = v23 == 0;
              var v84 = v23 == 1;
              var v85 = v23 == 2;
              var v86 = v84 ? true : v85;
              var v87 = v83 ? true : v86;
              var v88 = v82 ? false : true;
              var v89 = v88 ? true : v87;
              stdlib.assert(v89);
              var v91 = v66 == 2;
              var v92 = 2 * v13;
              var v93 = v92 + v14;
              var v94 = v66 == 0;
              var v95 = 2 * v13;
              var v96 = v13 + v14;
              var v97 = v94 ? v14 : v96;
              var v98 = v94 ? v95 : v13;
              var v99 = v91 ? v93 : v97;
              var v100 = v91 ? 0 : v98;
              true;
              true;
              kTop(v66); }) }) }) }); } }; }