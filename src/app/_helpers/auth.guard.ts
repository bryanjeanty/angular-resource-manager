import { Injectable } from '@angular/core';
import { 
    Router,
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';

import { AuthenticationService } from '../_services';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {}
    
    // override can activate method
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const authAccount = this.authenticationService.authenticatedAccountValue;
        
        if (authAccount) {
            return true;
        }
        
        this.router.navigate(['/signin'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}