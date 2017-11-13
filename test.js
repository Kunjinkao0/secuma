'use strict';

let futils = require('./secuma/fileutils');
// let file = '/workspace/nodejs/secuma/package.json';

// let res = futils.openFile(file, 'utf-8');
// console.log(res);


let file = '/workspace/nodejs/secuma/test';
// futils.mkdir(file);
// futils.mkFile(file);
// let data = 'abcdefghhijklmnopqrstuvwxyz';
// futils.writeFile(file, data, 'utf-8');
futils.deleteFile(file);