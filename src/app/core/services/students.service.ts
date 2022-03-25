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

  getStudentDashboard(search_query: any): Observable<any> {
    let params = {};
    if (search_query) {
      params = { search_query };
    }

    return this.http.get<{ dashboard: any }>(
      `${this.baseUrl}student/dashboard`,
      { params }
    );
  }

  getStudentClassDashboard(id: any): Observable<any> {
    return this.http.get<{ dashboard: any }>(
      `${this.baseUrl}student/classes/${id}`
    );
  }

  getStudentClassroom(params: any): Observable<any> {
    return this.http.get<{ dashboard: any }>(
      `${this.baseUrl}student/classroom`,
      { params }
    );
  }

  getStudentSyllabus(id: any): Observable<any> {
    return this.http.get<{ dashboard: any }>(
      `${this.baseUrl}student/syllabus/${id}`
    );
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }
}
