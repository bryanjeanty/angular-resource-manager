import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, first } from 'rxjs/operators';

import { Account } from '../_models';
import { environment } from '../../environments/environment';

const { apiUrl } = environment;

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
    private authenticatedAccountSubject: BehaviorSubject<any>;
    private authenticatedAccount: Observable<Account>;
    
    constructor(private http: HttpClient) {        
        this.authenticatedAccountSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('authenticatedAccount')));
        
        this.authenticatedAccount = this.authenticatedAccountSubject.asObservable();
    }
    
    public get authenticatedAccountValue(): Account {
        return this.authenticatedAccountSubject.value;
    }
    
    signIn(username, password) {
        const account = { username, password };
        return this.http.post(`${apiUrl}/login`, account, { observe: 'response' })
                    .pipe(map(authAccount => {
                        localStorage.setItem('authenticatedAccount', JSON.stringify(authAccount));
                        this.authenticatedAccountSubject.next(authAccount);
                        return authAccount;
                    }));
    }
    
    signOut() {
        localStorage.removeItem('authenticatedAccount');
        localStorage.removeItem('JWT');
        this.authenticatedAccountSubject.next(null);
    }
}
