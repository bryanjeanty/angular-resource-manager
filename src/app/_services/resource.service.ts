import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Record } from '../_models';
import { environment } from '../../environments/environment';

const { apiUrl } = environment;

@Injectable({
  providedIn: 'root'
})
export class ResourceService {
  constructor(private http: HttpClient) {}
    
    // adding a row to table
    createResourceRecord(record: Record): Observable<any> {
        return this.http.post(`${apiUrl}/auth/resources`, record, { observe: 'response' });
    }
    
    // adding a column to table
    updateResourceRecord(id: Number, record: Record): Observable<any> {
        return this.http.put(`${apiUrl}/auth/resources/${id}`, record);
    }
    
    getAllResourceRecords(): Observable<any> {
        return this.http.get(`${apiUrl}/auth/resources`, { observe: 'response' });
    }
    
    deleteResourceRecordById(id: Number): Observable<any> {
        return this.http.delete(`${apiUrl}/auth/resources/${id}`);
    }
}
