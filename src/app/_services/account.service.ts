import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Account } from '../_models';
import { environment } from '../../environments/environment';

const { apiUrl } = environment;

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  constructor(private http: HttpClient) {}
    
  signUp(account: Account) {
      return this.http.post(`${apiUrl}/api/v1/register`, account);
  }
}
