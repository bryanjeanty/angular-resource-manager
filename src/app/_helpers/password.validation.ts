import { AbstractControl } from '@angular/forms';

export class PasswordValidation {
    static matchPassword(AC: AbstractControl) {
        let password = AC.get('password').value;
        let confirmPassword = AC.get('confirmPassword').value;
        
        if (confirmPassword != password) {
            console.log('false');
            AC.get('confirmPassword').setErrors({
                matchPassword: true
            });
        } else {
            return null;
        }
    }
}