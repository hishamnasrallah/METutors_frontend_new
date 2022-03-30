import { IStudent } from '../models';
import { Injectable } from '@angular/core';
import { map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { loadStudentAssignments } from '@metutor/core/state';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  baseUrl = environment.API_URL;

  constructor(private http: HttpClient) {}

  getStudents(): Observable<any> {
    return this.http
      .get<{ students: IStudent[] }>(`${this.baseUrl}registered-students`)
      .pipe(
        map((response) => {
          return response.students.map(
            (student) => new IStudent(false, student)
          );
        })
      );
  }

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

  getStudentResources(id: any): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}student/resources/${id}`);
  }

  getStudentResource(id: any): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}student/resource/${id}`);
  }

  studentJoinClass(id: any): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}class/launch/${id}`, {});
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }

  // Assignments
  getStudentAssignments(id: any): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}student/assignments/${id}`);
  }

  getStudentAssignment(id: any): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}student/assignment/${id}`);
  }

  studentSubmitAssignment(body: any): Observable<any> {
    const { id, ..._body } = body;
    return this.http.post<any>(
      `${this.baseUrl}student/assignment/${id}`,
      _body
    );
  }
}
