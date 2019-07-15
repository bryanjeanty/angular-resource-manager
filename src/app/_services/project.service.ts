import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Record } from '../_models';
import { environment } from '../../environments/environment';

const { apiUrl } = environment;

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  constructor(private http: HttpClient) {}
    
    createProjectRecord(record: Record): Observable<any> {
        return this.http.post(`${apiUrl}/auth/projects`, record, { observe: 'response' });
    }
    
    getAllProjectRecords(): Observable<any> {
        return this.http.get(`${apiUrl}/auth/projects`, { observe: 'response' });
    }
    
    deleteProjectRecordById(id: Number) {
        return this.http.delete(`${apiUrl}/auth/projects/${id}`, { observe: 'response' });
    }
}
