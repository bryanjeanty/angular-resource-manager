import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '../_services';

@Component({
    templateUrl: './signin.component.html'
})
export class SigninComponent implements OnInit {
    signinForm: FormGroup;
    loading: boolean = false;
    submitted: boolean = false;
    returnUrl: string;
    
    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService
    )   {
            if (this.authenticationService.authenticatedAccountValue) {
                this.router.navigate(['/resource']);
            }
        }
    
    ngOnInit() {
        this.signinForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
        
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/resource';
    }
    
    onSubmit() {
        this.submitted = true;
        
        if (this.signinForm.invalid) {
            return;
        }
        
        this.loading = true;
        
        this.authenticationService
            .signIn(
                this.signinForm.controls.username.value, this.signinForm.controls.password.value
            )
            .pipe(first())
            .subscribe(
                data => {
                    console.log(data);
                    localStorage.setItem('JWT', data.headers.get('Authorization'));
                    this.router.navigate([this.returnUrl]);  
                },
                error => {
                    this.loading = false;
                }
            )
    }
}