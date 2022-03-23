import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  baseUrl = environment.API_URL;

  constructor(private http: HttpClient) {}

  getStudentDashboard(params: any): Observable<any> {
    let query = '';
    if (params) {
      query = '?search_query=' + params;
    }

    return this.http.get<{ dashboard: any }>(
      `${this.baseUrl}teacher-dashboard${query}`
    );
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }
}
