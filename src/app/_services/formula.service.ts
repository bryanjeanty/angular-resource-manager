import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Record } from '../_models';
import { environment } from '../../environments/environment';

const { apiUrl } = environment;

@Injectable({
  providedIn: 'root'
})
export class FormulaService {
  constructor(private http: HttpClient) {}
    
    createFormulaRecord(record: Record): Observable<any> {
        return this.http.post(`${apiUrl}/auth/formulas`, record, { observe: 'response' });
    }
    
    getAllFormulaRecords(): Observable<any> {
        return this.http.get(`${apiUrl}/auth/formulas`, { observe: 'response' });
    }
    
    deleteFormulaRecordById(id: Number): Observable<any> {
        return this.http.delete(`${apiUrl}/auth/formulas/${id}`);
    }
}
