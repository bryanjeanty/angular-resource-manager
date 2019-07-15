import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthenticationService } from '../_services';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) {}
    
    // override intercept method from HttpInterceptor interface
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        // add authorization header with jwt token if available
        let authenticatedAccount = this.authenticationService.authenticatedAccountValue;
        let jsonWebToken = localStorage.getItem('JWT');
        
        if (authenticatedAccount && jsonWebToken) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${jsonWebToken}`
                }
            });
        }
        
        return next.handle(request);
    }
}