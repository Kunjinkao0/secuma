'use strict';

let futils = require('./routes/fileutils');
let file = '/workspace/nodejs/secuma';

let res = futils.getDetail(file);

console.log(res);