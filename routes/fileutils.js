'use strict';
const fs = require('fs');

// ROOT path is a 'safe' path to let font end access
const ROOT = '/Users/willi';

function exists(path) {
    try {
        fs.statSync(path);
        return true;
    } catch (error) {
        return false;
    }
}

function isDirectory(path) {
    let stat = fs.statSync(path);
    return stat.isDirectory();
}

exports.getDetail = path => {
    path = ROOT + path;

    if (path.endsWith('/')) {
        path = path.substring(0, path.length - 1);
    }

    if (!exists(path)) {
        return path + ' not exists.';
    }

    let stat = fs.statSync(path);
    let file = getFileStat(stat);
    file.path = path.substring(ROOT.length) || '/';
    if (stat.isDirectory()) {
        file.children = getChildren(path);
    }

    return file;
}

function getChildren(dirpath) {
    dirpath += '/';

    let paths = fs.readdirSync(dirpath);
    let files = [];
    paths.forEach(f => {
        let fpath = dirpath + f;
        let stat = fs.statSync(fpath);
        let file = getFileStat(stat);
        file.path = fpath.substring(ROOT.length) || '/';
        files.push(file);
    });

    return files;
}

// path not exists in stats, so need to pass it manually
function getFileStat(stat) {
    return {
        ctime: stat.ctime.getTime() / 1000,
        mtime: stat.mtime.getTime() / 1000,
        size: stat.size,
        isdir: stat.isDirectory()
    };
}