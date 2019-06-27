import { stdlib } from './alacrity-runtime.mjs';

export function A(ctc, interact, v0, v1, v2, kTop) {
  const v4 = stdlib.eq(v2, 0);
  const v5 = stdlib.eq(v2, 1);
  const v6 = stdlib.eq(v2, 2);
  const v7 = v5 ? true : v6;
  const v8 = v4 ? true : v7;
  stdlib.assert(v8);
  const v14 = stdlib.random_uint256();
  const v15 = stdlib.uint256_to_bytes(v14);
  const v16 = stdlib.uint256_to_bytes(v2);
  const v17 = stdlib.bytes_cat(v15, v16);
  const v18 = stdlib.keccak256(v17);
  const v19 = v0;
  const v20 = v1;
  const v21 = v18;
  const v22 = stdlib.add(v19, v20);
  ctc.send("m0", [v19, v20, v21], v22, () => {
    ctc.recv("e0", (p19, p20, p21, v23) => {
      stdlib.assert(stdlib.equal(v19, p19));
      stdlib.assert(stdlib.equal(v20, p20));
      stdlib.assert(stdlib.equal(v21, p21));
      const v24 = stdlib.add(v19, v20);
      const v25 = stdlib.eq(v23, v24);
      stdlib.assert(v25);
      ctc.recv("e1", (v26, v27) => {
        const v28 = stdlib.eq(v27, v19);
        stdlib.assert(v28);
        const v29 = stdlib.eq(v26, 0);
        const v30 = stdlib.eq(v26, 1);
        const v31 = stdlib.eq(v26, 2);
        const v32 = v30 ? true : v31;
        const v33 = v29 ? true : v32;
        stdlib.assert(v33);
        const v34 = v14;
        const v35 = v2;
        ctc.send("m2", [v19, v20, v21, v26, v34, v35], 0, () => {
          ctc.recv("e2", (p34, p35, v36) => {
            stdlib.assert(stdlib.equal(v34, p34));
            stdlib.assert(stdlib.equal(v35, p35));
            const v37 = stdlib.eq(v36, 0);
            stdlib.assert(v37);
            const v38 = stdlib.uint256_to_bytes(v34);
            const v39 = stdlib.uint256_to_bytes(v35);
            const v40 = stdlib.bytes_cat(v38, v39);
            const v41 = stdlib.keccak256(v40);
            const v42 = stdlib.eq(v21, v41);
            stdlib.assert(v42);
            const v43 = stdlib.eq(v35, 0);
            const v44 = stdlib.eq(v35, 1);
            const v45 = stdlib.eq(v35, 2);
            const v46 = v44 ? true : v45;
            const v47 = v43 ? true : v46;
            stdlib.assert(v47);
            const v48 = stdlib.eq(v35, 0);
            const v49 = stdlib.eq(v35, 1);
            const v50 = stdlib.eq(v35, 2);
            const v51 = v49 ? true : v50;
            const v52 = v48 ? true : v51;
            const v53 = stdlib.eq(v26, 0);
            const v54 = stdlib.eq(v26, 1);
            const v55 = stdlib.eq(v26, 2);
            const v56 = v54 ? true : v55;
            const v57 = v53 ? true : v56;
            const v58 = v52 ? v57 : false;
            const v59 = stdlib.sub(4, v26);
            const v60 = stdlib.add(v35, v59);
            const v61 = stdlib.mod(v60, 3);
            const v62 = v57 ? 0 : 1;
            const v63 = v52 ? 2 : v62;
            const v64 = v58 ? v61 : v63;
            const v65 = stdlib.eq(v64, 0);
            const v66 = stdlib.eq(v64, 1);
            const v67 = stdlib.eq(v64, 2);
            const v68 = v66 ? true : v67;
            const v69 = v65 ? true : v68;
            stdlib.assert(v69);
            const v70 = stdlib.eq(v64, 2);
            const v71 = stdlib.eq(v35, 0);
            const v72 = stdlib.eq(v35, 1);
            const v73 = stdlib.eq(v35, 2);
            const v74 = v72 ? true : v73;
            const v75 = v71 ? true : v74;
            const v76 = v70 ? false : true;
            const v77 = v76 ? true : v75;
            stdlib.assert(v77);
            const v78 = stdlib.eq(v64, 0);
            const v79 = stdlib.eq(v26, 0);
            const v80 = stdlib.eq(v26, 1);
            const v81 = stdlib.eq(v26, 2);
            const v82 = v80 ? true : v81;
            const v83 = v79 ? true : v82;
            const v84 = v78 ? false : true;
            const v85 = v84 ? true : v83;
            stdlib.assert(v85);
            const v86 = stdlib.eq(v64, 2);
            const v87 = stdlib.mul(2, v19);
            const v88 = stdlib.add(v87, v20);
            const v89 = stdlib.eq(v64, 0);
            const v90 = stdlib.mul(2, v19);
            const v91 = stdlib.add(v19, v20);
            const v92 = v89 ? v20 : v91;
            const v93 = v89 ? v90 : v19;
            const v94 = v86 ? v88 : v92;
            const v95 = v86 ? 0 : v93;
            const v96 = stdlib.eq(v64, 2);
            const v97 = stdlib.eq(v64, 0);
            kTop(v64); }); }); }); }); }); }

export function B(ctc, interact, v3, kTop) {
  const v9 = stdlib.eq(v3, 0);
  const v10 = stdlib.eq(v3, 1);
  const v11 = stdlib.eq(v3, 2);
  const v12 = v10 ? true : v11;
  const v13 = v9 ? true : v12;
  stdlib.assert(v13);
  ctc.recv("e0", (v19, v20, v21, v23) => {
    const v24 = stdlib.add(v19, v20);
    const v25 = stdlib.eq(v23, v24);
    stdlib.assert(v25);
    const v26 = v3;
    ctc.send("m1", [v19, v20, v21, v26], v19, () => {
      ctc.recv("e1", (p26, v27) => {
        stdlib.assert(stdlib.equal(v26, p26));
        const v28 = stdlib.eq(v27, v19);
        stdlib.assert(v28);
        const v29 = stdlib.eq(v26, 0);
        const v30 = stdlib.eq(v26, 1);
        const v31 = stdlib.eq(v26, 2);
        const v32 = v30 ? true : v31;
        const v33 = v29 ? true : v32;
        stdlib.assert(v33);
        ctc.recv("e2", (v34, v35, v36) => {
          const v37 = stdlib.eq(v36, 0);
          stdlib.assert(v37);
          const v38 = stdlib.uint256_to_bytes(v34);
          const v39 = stdlib.uint256_to_bytes(v35);
          const v40 = stdlib.bytes_cat(v38, v39);
          const v41 = stdlib.keccak256(v40);
          const v42 = stdlib.eq(v21, v41);
          stdlib.assert(v42);
          const v43 = stdlib.eq(v35, 0);
          const v44 = stdlib.eq(v35, 1);
          const v45 = stdlib.eq(v35, 2);
          const v46 = v44 ? true : v45;
          const v47 = v43 ? true : v46;
          stdlib.assert(v47);
          const v48 = stdlib.eq(v35, 0);
          const v49 = stdlib.eq(v35, 1);
          const v50 = stdlib.eq(v35, 2);
          const v51 = v49 ? true : v50;
          const v52 = v48 ? true : v51;
          const v53 = stdlib.eq(v26, 0);
          const v54 = stdlib.eq(v26, 1);
          const v55 = stdlib.eq(v26, 2);
          const v56 = v54 ? true : v55;
          const v57 = v53 ? true : v56;
          const v58 = v52 ? v57 : false;
          const v59 = stdlib.sub(4, v26);
          const v60 = stdlib.add(v35, v59);
          const v61 = stdlib.mod(v60, 3);
          const v62 = v57 ? 0 : 1;
          const v63 = v52 ? 2 : v62;
          const v64 = v58 ? v61 : v63;
          const v65 = stdlib.eq(v64, 0);
          const v66 = stdlib.eq(v64, 1);
          const v67 = stdlib.eq(v64, 2);
          const v68 = v66 ? true : v67;
          const v69 = v65 ? true : v68;
          stdlib.assert(v69);
          const v70 = stdlib.eq(v64, 2);
          const v71 = stdlib.eq(v35, 0);
          const v72 = stdlib.eq(v35, 1);
          const v73 = stdlib.eq(v35, 2);
          const v74 = v72 ? true : v73;
          const v75 = v71 ? true : v74;
          const v76 = v70 ? false : true;
          const v77 = v76 ? true : v75;
          stdlib.assert(v77);
          const v78 = stdlib.eq(v64, 0);
          const v79 = stdlib.eq(v26, 0);
          const v80 = stdlib.eq(v26, 1);
          const v81 = stdlib.eq(v26, 2);
          const v82 = v80 ? true : v81;
          const v83 = v79 ? true : v82;
          const v84 = v78 ? false : true;
          const v85 = v84 ? true : v83;
          stdlib.assert(v85);
          const v86 = stdlib.eq(v64, 2);
          const v87 = stdlib.mul(2, v19);
          const v88 = stdlib.add(v87, v20);
          const v89 = stdlib.eq(v64, 0);
          const v90 = stdlib.mul(2, v19);
          const v91 = stdlib.add(v19, v20);
          const v92 = v89 ? v20 : v91;
          const v93 = v89 ? v90 : v19;
          const v94 = v86 ? v88 : v92;
          const v95 = v86 ? 0 : v93;
          const v96 = stdlib.eq(v64, 2);
          const v97 = stdlib.eq(v64, 0);
          kTop(v64); }); }); }); }); }

export const ABI = [{"constant":false,"inputs":[{"name":"pA","type":"address"},{"name":"pB","type":"address"},{"name":"v19","type":"uint256"},{"name":"v20","type":"uint256"},{"name":"v21","type":"uint256"}],"name":"m0","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"pA","type":"address"},{"name":"pB","type":"address"},{"name":"v19","type":"uint256"},{"name":"v20","type":"uint256"},{"name":"v21","type":"uint256"},{"name":"v26","type":"uint256"},{"name":"v34","type":"uint256"},{"name":"v35","type":"uint256"}],"name":"m2","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"pA","type":"address"},{"name":"pB","type":"address"},{"name":"v19","type":"uint256"},{"name":"v20","type":"uint256"},{"name":"v21","type":"uint256"},{"name":"v26","type":"uint256"}],"name":"m1","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"inputs":[{"name":"pA","type":"address"},{"name":"pB","type":"address"}],"payable":true,"stateMutability":"payable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"v19","type":"uint256"},{"indexed":false,"name":"v20","type":"uint256"},{"indexed":false,"name":"v21","type":"uint256"}],"name":"e0","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"v26","type":"uint256"}],"name":"e1","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"v34","type":"uint256"},{"indexed":false,"name":"v35","type":"uint256"}],"name":"e2","type":"event"}];

export const Bytecode = "0x6080604052604051610cab380380610cab8339818101604052604081101561002657600080fd5b81019080805190602001909291908051906020019092919050505060008282604051602001808481526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1660601b81526014018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1660601b815260140193505050506040516020818303038152906040528051906020012060001c6000819055505050610bba806100f16000396000f3fe6080604052600436106100345760003560e01c8063865ca4e7146100395780639f54e22e146100bb578063b00416101461015c575b600080fd5b6100b9600480360360a081101561004f57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff1690602001909291908035906020019092919080359060200190929190803590602001909291905050506101e8565b005b61015a60048036036101008110156100d257600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff1690602001909291908035906020019092919080359060200190929190803590602001909291908035906020019092919080359060200190929190803590602001909291905050506103d9565b005b6101e6600480360360c081101561017257600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff1690602001909291908035906020019092919080359060200190929190803590602001909291908035906020019092919050505061087c565b005b60008585604051602001808481526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1660601b81526014018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1660601b815260140193505050506040516020818303038152906040528051906020012060001c6000541461028e57600080fd5b8473ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146102c657600080fd5b81830134146102d457600080fd5b7fe97939a5c3b22414f653aea9f18c5859841d0af50ba6ede8dd8f1937b8da453883838360405180848152602001838152602001828152602001935050505060405180910390a160018585858585604051602001808781526020018673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1660601b81526014018573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1660601b815260140184815260200183815260200182815260200196505050505050506040516020818303038152906040528051906020012060001c6000819055505050505050565b6002888888888888604051602001808881526020018773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1660601b81526014018673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1660601b81526014018581526020018481526020018381526020018281526020019750505050505050506040516020818303038152906040528051906020012060001c6000541461049f57600080fd5b8773ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146104d757600080fd5b600034146104e457600080fd5b61052c82604051602001808281526020019150506040516020818303038152906040528260405160200180828152602001915050604051602081830303815290604052610aa9565b6040516020018082805190602001908083835b60208310610562578051825260208201915060208101905060208303925061053f565b6001836020036101000a0380198251168184511680821785525050505050509050019150506040516020818303038152906040528051906020012060001c84146105ab57600080fd5b600081146105cc57600181146105c457600281146105c7565b60015b6105cf565b60015b6105d857600080fd5b60008082146105fa57600182146105f257600282146105f5565b60015b6105fd565b60015b905060008085146106215760018514610619576002851461061c565b60015b610624565b60015b9050600082610634576000610636565b815b61065b5782610653578161064b57600161064e565b60005b610656565b60025b61066c565b60038660040385018161066a57fe5b065b90506000811461068f5760018114610687576002811461068a565b60015b610692565b60015b61069b57600080fd5b600281146106aa5760016106ad565b60005b6106da57600084146106d257600184146106ca57600284146106cd565b60015b6106d5565b60015b6106dd565b60015b6106e657600080fd5b600081146106f55760016106f8565b60005b610725576000861461071d57600186146107155760028614610718565b60015b610720565b60015b610728565b60015b61073157600080fd5b6000600282149050600080831490508c73ffffffffffffffffffffffffffffffffffffffff166108fc83610773578261076c578b8d0161076e565b8b5b61077a565b8b8d600202015b9081150290604051600060405180830381858888f193505050501580156107a5573d6000803e3d6000fd5b508b73ffffffffffffffffffffffffffffffffffffffff166108fc836107da57826107d0578c6107d5565b8c6002025b6107dd565b60005b9081150290604051600060405180830381858888f19350505050158015610808573d6000803e3d6000fd5b507f3a074aaea2d51955da8b38c6383720deafa2c498a47a8b8312010f91a80d49d38787604051808381526020018281526020019250505060405180910390a1600080819055507302b463784bc1a49f1647b47a19452ac420dfc65a73ffffffffffffffffffffffffffffffffffffffff16ff5b60018686868686604051602001808781526020018673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1660601b81526014018573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1660601b815260140184815260200183815260200182815260200196505050505050506040516020818303038152906040528051906020012060001c6000541461093a57600080fd5b8473ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461097257600080fd5b83341461097e57600080fd5b6000811461099f5760018114610997576002811461099a565b60015b6109a2565b60015b6109ab57600080fd5b7f3680e78b6fdf571695c81f108d81181ea63f50c100e6375e765b14bd7ac0adbb816040518082815260200191505060405180910390a16002868686868686604051602001808881526020018773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1660601b81526014018673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1660601b81526014018581526020018481526020018381526020018281526020019750505050505050506040516020818303038152906040528051906020012060001c600081905550505050505050565b606082518383604051602001808461ffff1661ffff1660f01b815260020183805190602001908083835b60208310610af65780518252602082019150602081019050602083039250610ad3565b6001836020036101000a03801982511681845116808217855250505050505090500182805190602001908083835b60208310610b475780518252602082019150602081019050602083039250610b24565b6001836020036101000a038019825116818451168082178552505050505050905001935050505060405160208183030381529060405290509291505056fea265627a7a72305820ec4c5334b21606033659255186a66dfd40ee71afd66705bf06fa466681d12bc264736f6c63430005090032";