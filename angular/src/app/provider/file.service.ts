import { Injectable } from '@angular/core';

import { ZFile } from '../zfile';
import 'rxjs/add/operator/toPromise';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

const API = 'http://localhost:3000/secuma';

@Injectable()
export class FileService {

  constructor(private http: HttpClient) { }


  readFile(path: string): Observable<any> {
    return this.http.get(path);
  }

  login(username: string, password: string): Observable<any> {
    let url = API + '/login';
    let resOB = new Subject<any>();
    let rawHeader = this.makeRawHeaders()
      .append('Authorization', 'Basic ' + btoa(username + ':' + password));

    this.http.post(url, { username, password }, { headers: rawHeader })
      .subscribe(response => {
        localStorage.setItem('token', btoa(username + ':' + password));

        let data0 = response;
        resOB.next(data0);
      });
    return resOB.asObservable();
  }

  protected makeRawHeaders() {
    let headers = new HttpHeaders();
    return headers.append('__dumb__', 'raw');
  }

  openDir(path: string): Observable<ZFile> {
    // simply replace '/' to /%2f
    path = path.replace(/\//g, '%2f');
    let url = API + '/dir?fpath=' + path;
    let resOB = new Subject<ZFile>();
    this.http.get(url).subscribe(response => {
      let data0 = this.parseOpenDir(response);
      resOB.next(data0);
    });
    return resOB.asObservable();
  }

  parseOpenDir(json: any): ZFile {
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

  openFile(path: string, encoding: string): Observable<any> {
    // simply replace '/' to /%2f
    path = path.replace(/\//g, '%2f');
    let url = API + '/open?fpath=' + path + '&encoding=' + encoding;
    let resOB = new Subject<any>();
    this.http.get(url).subscribe(response => {
      let data0 = response;
      resOB.next(data0);
    });
    return resOB.asObservable();
  }

  createFile(path: string, encoding: string): Observable<any> {
    // simply replace '/' to /%2f
    path = path.replace(/\//g, '%2f');
    let url = API + '/mkfile?fpath=' + path;
    let resOB = new Subject<any>();
    this.http.get(url).subscribe(response => {
      let data0 = response;
      resOB.next(data0);
    });
    return resOB.asObservable();
  }

  mkDir(path: string, encoding: string): Observable<any> {
    // simply replace '/' to /%2f
    path = path.replace(/\//g, '%2f');
    let url = API + '/mkdir?fpath=' + path;
    let resOB = new Subject<any>();
    this.http.get(url).subscribe(response => {
      let data0 = response;
      resOB.next(data0);
    });
    return resOB.asObservable();
  }

  deleteFile(path: string, encoding: string): Observable<any> {
    // simply replace '/' to /%2f
    path = path.replace(/\//g, '%2f');
    let url = API + '/deletefile?fpath=' + path;
    let resOB = new Subject<any>();
    this.http.get(url).subscribe(response => {
      let data0 = response;
      resOB.next(data0);
    });
    return resOB.asObservable();
  }

  writeFile(path: string, content: string, encoding: string): Observable<any> {
    let url = API + '/writefile';
    let body = {
      fpath: path, content: content, encoding: encoding
    };

    let resOB = new Subject<any>();
    this.http.post(url, body).subscribe(response => {
      let data0 = response;
      resOB.next(data0);
    });
    return resOB.asObservable();
  }
}
