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
        res.send('[fpath] cannot be null');
    }
    let encoding = req.query.encoding || 'utf-8';

    let data = futils.openFile(fpath, encoding);
    res.send(JSON.stringify(data));
});

router.get('/mkdir', function(req, res, next) {
    let fpath = req.query.fpath;
    if(!fpath) {
        res.send('[fpath] cannot be null');
    }

    let data = futils.mkdir(fpath);
    res.send(JSON.stringify(data));
});

router.get('/mkfile', function(req, res, next) {
    let fpath = req.query.fpath;
    if(!fpath) {
        res.send('[fpath] cannot be null');
    }

    let data = futils.mkfile(fpath);
    res.send(JSON.stringify(data));
});

router.get('/deletefile', function(req, res, next) {
    let fpath = req.query.fpath;
    if(!fpath) {
        res.send('[fpath] cannot be null');
    }
    let encoding = req.query.encoding || '';

    let data = futils.deleteFile(fpath);
    res.send(JSON.stringify(data));
});

router.post('/writefile', function(req, res, next) {
    let fpath = req.body.fpath;
    let content = req.body.content;
    if(!fpath || !content) {
        res.send('[fpath] and [content] cannot be null');
    }
    let encoding = req.body.encoding || '';

    let data = futils.writeFile(fpath, content, encoding);
    console.log(data);
    res.send(JSON.stringify(data));
});

module.exports = router;