'use strict';

const express = require('express');
const router = express.Router();

const futils = require('./fileutils');

router.get('/dir', function(req, res, next) {
    let fpath = req.query.fpath || '/';

    let detail = futils.getDetail(fpath);
    res.send(JSON.stringify(detail));
});

router.get('/open', function(req, res, next) {
    let fpath = req.query.fpath;
    if(!fpath) {
        res.send('fpath cannot be null');
    }
    let encoding = req.query.encoding || '';

    let data = futils.openFile(fpath, encoding);
    console.log(data);
    res.send(JSON.stringify(data));
});

module.exports = router;