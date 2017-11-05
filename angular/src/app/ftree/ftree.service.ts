import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { ZFile } from './zfile';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class FTreeService {

  constructor(private http: Http) { }

  getZFileDetail(path: string): Promise<ZFile> {
    // simply replace '/' to /%2f
    path = path.replace(/\//g, '%2f');
    let url = 'http://localhost:3000/getdir?dpath=' + path;
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

  mockData(): ZFile {
    let children: ZFile[] = [];
    let seed = Math.random();
    for (let i = 0; i < 10; i++) {
      children.push({
        name: 'File' + ((i + 1) * seed),
        size: 1000 + i,
        path: '/work',
        isDirectory: i % 3 == 0,
        ctime: 66666666,
        mtime: 66666666
      });
    }

    let file = {
      path: '/work/',
      name: 'FFFFIIIILLLEEEE',
      size: 123123,
      isDirectory: true,
      children: children
    };
    return file;
  }
}
