import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let token = 'Basic ' + btoa('admin:supersecret');
        const changedReq = req.clone({ headers: req.headers.set('Authorization', token) });
        return next.handle(changedReq);
    }
}