import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { ZFile } from '../zfile';
import 'rxjs/add/operator/toPromise';

const API = 'http://localhost:3000/secuma';

@Injectable()
export class FTreeService {

  constructor(private http: Http) { }

  openDir(path: string): Promise<ZFile> {
    // simply replace '/' to /%2f
    path = path.replace(/\//g, '%2f');
    let url = API + '/dir?fpath=' + path;
    return new Promise<ZFile>((resolve, reject) => {
      this.http.get(url).toPromise().then(res => {
        let fs = this.mapping(res.json());
        resolve(fs);
      });
    });
  }

  mapping(json: any): ZFile {
    let children: ZFile[] = [];
    if (json.children) {
      json.children.forEach(f => {
        children.push({
          path: f.path,
          name: f.path,
          size: f.size,
          isDirectory: f.isdir,
          ctime: f.ctime,
          mtime: f.mtime
        });
      });
    }

    let file = {
      path: json.path,
      name: json.path,
      size: json.size,
      isDirectory: json.isdir,
      ctime: json.ctime,
      mtime: json.mtime,
      children: children
    };
    return file;
  }

  openFile(path: string, encoding: string): Promise<any> {
    // simply replace '/' to /%2f
    path = path.replace(/\//g, '%2f');
    let url = API + '/open?fpath=' + path + '&encoding=' + encoding;
    return new Promise<any>((resolve, reject) => {
      this.http.get(url).toPromise().then(res => {
        resolve(res.json());
      });
    });
  }
}
