import { Component } from '@angular/core';
import { Router } from '@angular/router'

import { AuthenticationService } from './_services';
import { Account } from './_models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'Project 1';
    authenticatedAccount: Account;
    username: string;
    
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    )   {
            this.authenticationService
                .authAccount
                .subscribe(account => {
                this.username = localStorage.getItem('username');
                return this.authenticatedAccount = account;
            });
        }
    
    logout() {
        this.authenticationService.signOut();
        this.router.navigate(['/signin']);
    }
}
