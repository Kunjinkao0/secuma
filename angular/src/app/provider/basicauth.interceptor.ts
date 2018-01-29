import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {
    private token: string;

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.headers.get('__dumb__') === 'raw') {
            let headers = req.headers.delete('__dumb__');
            let rawReq = req.clone({ headers: headers });
            return next.handle(rawReq);
        } else {
            this.token = localStorage.getItem('token');
            if(this.token) {
                let changedReq = req.clone({ headers: req.headers.set('Authorization', 'Basic ' + this.token) });
                return next.handle(changedReq);
            } else {
                throw 'Need Login';
            }
        }
    }
}