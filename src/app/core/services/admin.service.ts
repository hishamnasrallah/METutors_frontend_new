import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  baseUrl = environment.API_URL;

  constructor(private http: HttpClient) {}

  loadAdminDocuments(user_id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}teacher/documents`, {
      params: { user_id },
    });
  }

  adminApproveDocument(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}approve-document`, {
      params: { id },
    });
  }

  adminRejectDocument(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}reject-document`, {
      params: { id },
    });
  }
}
