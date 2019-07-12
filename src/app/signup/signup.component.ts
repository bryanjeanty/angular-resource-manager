import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService } from '../_services';
import { PasswordValidation } from '../_helpers';

@Component({
    templateUrl: './signup.component.html'
})
export class SignupComponent implements OnInit {
    signupForm: FormGroup;
    loading: boolean = false;
    submitted: boolean = false;
    
    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private accountService: AccountService,
    )   {}
    
    ngOnInit() {
        this.signupForm = this.formBuilder.group({
            username: ['', Validators.required],
            email: ['', Validators.required],
            password: ['', Validators.compose([
                Validators.required, 
                Validators.minLength(6)
            ])],
            confirmPassword: ['', Validators.required]
        }, {
            validator: PasswordValidation.matchPassword
        });
    }
    
    onSubmit() {
        this.submitted = true;
        
        if (this.signupForm.invalid) {
            return;
        }
        
        this.loading = true;
        
        this.accountService
            .signUp(this.signupForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate(['signin']);
                    console.log(data);
                },
                error => {
                    this.loading = false;
                }
            );
    }
}






