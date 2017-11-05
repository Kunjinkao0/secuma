'use strict';

const express = require('express');
const router = express.Router();

const futils = require('./fileutils');

router.get('/', function(req, res, next) {
    let dpath = req.query.dpath || '/';

    let detail = futils.getDetail(dpath);
    res.send(JSON.stringify(detail));
});

module.exports = router;