import { map, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { ICapacity, ISubject } from '../models';

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
    return this.http.post<any>(
      `${this.baseUrl}admin/approve-document/${id}`,
      {}
    );
  }

  adminRejectDocument(id: number): Observable<any> {
    return this.http.post<any>(
      `${this.baseUrl}admin/reject-document/${id}`,
      {}
    );
  }

  loadWorkforceCapacity(): Observable<any> {
    return this.http
      .get<any>(`${this.baseUrl}admin/workforce-capacity`)
      .pipe(
        map((response) =>
          response?.subjects.map(
            (capacity: any) => new ICapacity(false, capacity)
          )
        )
      );
  }

  loadCourseBookingList(id: number): Observable<any> {
    return this.http
      .get<any>(`${this.baseUrl}admin/subject/${id}/bookings`)
      .pipe(map((response) => new ISubject(false, response?.subject)));
  }
}
