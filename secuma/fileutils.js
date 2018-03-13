'use strict';
const fs = require('fs');

// ROOT path is a 'safe' path to let font end access
const ROOT = require('./config.json').root;

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

function getRealPath(path) {
    return ROOT + path;
}

exports.getDetail = path => {
    path = getRealPath(path);

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

exports.openFile = (path, encoding) => {
    path = getRealPath(path);

    if (!exists(path)) {
        return path + ' not exists.';
    }

    let stat = fs.statSync(path);
    if (stat.size > 1 * 1024 * 1024) {
        return 'file lager than 1mb';
    }

    let data = fs.readFileSync(path, encoding);

    return {data};
}

exports.mkdir = path => {
    path = getRealPath(path);

    try {
        fs.mkdirSync(path);
        return {result: 'ok'};
    } catch(e) {
        return e;
    }
}

exports.mkfile = path => {
    path = getRealPath(path);

    try {
        fs.openSync(path, 'a');
        return {result: 'ok'};
    } catch(e) {
        return e;
    }
}

exports.deleteFile = path => {
    path = getRealPath(path);

    try {
        _deleteFile(path);
        return {result: 'ok'};
    } catch(e) {
        return e;
    }
}

function _deleteFile(path) {
    if(isDirectory(path)) {
        let children = fs.readdirSync(path)
        if(children.length > 0) {
            children.forEach(f => {
                let cpath = path + "/" + f;
                if (isDirectory(cpath)) {
                    _deleteFile(cpath);
                } else {
                    fs.unlinkSync(cpath);
                }
            });
        }

        fs.rmdirSync(path);
    } else {
        fs.unlinkSync(path);
    }  
}

exports.writeFile = (path, data, encoding) => {
    path = getRealPath(path);

    try {
        fs.writeFileSync(path, data, { encoding });
        return {result: 'ok'};
    } catch(e) {
        return e;
    }
}