import { Injectable } from '@angular/core';
import { HttpRequest, HttpInterceptor, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthenticationService } from '../_services';

@Injectable({ providedIn: 'root' })
export class ErrorInterceptor implements HttpInterceptor {
    
    constructor(private authenticationService: AuthenticationService) {}
    
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next
                .handle(request)
                .pipe(catchError(err => {
                    if (err.status === 403) {
                        this.authenticationService.signOut();
                        location.reload(true);
                    }
            
                    const error = err.error.message || err.statusText;
                    return throwError(error);
                }))
    }
}