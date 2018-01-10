import { Injectable } from "@angular/core";
import { Http } from '@angular/http';

@Injectable()
export class FileUtils {

    constructor(private http: Http) {

    }

    readFile(path: string): Promise<any> {
        return this.http.get(path).toPromise();
    }
}