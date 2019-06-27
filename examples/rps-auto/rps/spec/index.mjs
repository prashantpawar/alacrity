// vim: filetype=javascript

import glob    from 'glob';
import Jasmine from 'jasmine';

const jasmine = new Jasmine();

const panic = e =>
  console.error(e) || process.exit(1);

// TODO improve module path resolution
const importOrBail = p =>
  import(p.replace('rps/spec/', './'))
    .catch(panic);

glob('**/*-spec.mjs', (err, ss) =>
  !!err
    ? panic(err)
    : Promise
        .all(ss.map(importOrBail))
        .then(() => jasmine.execute())
        .catch(panic));
