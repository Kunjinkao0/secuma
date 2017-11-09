'use strict';

let futils = require('./routes/fileutils');
let file = '/workspace/nodejs/secuma/package.json';

let res = futils.openFile(file, 'utf-8');

console.log(res);