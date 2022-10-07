import { IStudent } from '@models';
import { Injectable } from '@angular/core';
import { map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  studentSyllabusAddEditTopic,
  studentViewClass,
} from '@metutor/core/state';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  baseUrl = environment.API_URL;

  constructor(private http: HttpClient) {}

  getStudent(): Observable<any> {
    return this.http
      .get<any>(`${this.baseUrl}student/profile`)
      .pipe(map((response) => new IStudent(false, response.profile)));
  }

  getStudents(params: any): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}admin/students`, { params }).pipe(
      map((response) => ({
        students: response?.students,
        stats: {
          active: response?.active,
          enrolled: response?.enrolled,
          suspended: response?.suspended,
          totalStudents: response?.Total,
          total: response?.students?.total,
          unenrolled: response?.unenrolled,
        },
      }))
    );
  }

  getStudentsPreference(): Observable<any> {
    return this.http
      .get<{ students: IStudent[] }>(`${this.baseUrl}student/preference`)
      .pipe(map((response: any) => response.preference));
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

  studentSyllabusAddEditTopic(payload: any): Observable<any> {
    const { id, ...data } = payload;
    const topicId = id ? `/${id}` : '';

    return this.http.post<any>(
      `${this.baseUrl}highlighted-topic${topicId}`,
      data
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

  studentAddNewClass(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}add-classes`, data);
  }

  studentViewClass(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}view-class/${id}`);
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

  getStudentSubmittedAssignment(id: any): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}student/assignment/user/${id}`);
  }

  getStudentAttendance(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}student/course/${id}/attendance`);
  }

  getStudentFeedbackOptions(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}student/feedback/params`);
  }

  getStudentPlatformFeedbackOptions(): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}student/feedback/platform/params`
    );
  }

  studentSubmitFeedback(payload: any, course_id: number): Observable<any> {
    const body = {
      ...payload,
      course_id,
    };

    return this.http.post<any>(`${this.baseUrl}student/feedback`, body);
  }

  studentSubmitPlatformFeedback(
    payload: any,
    course_id: number
  ): Observable<any> {
    const body = {
      ...payload,
      course_id,
    };

    return this.http.post<any>(
      `${this.baseUrl}student/feedback/platform`,
      body
    );
  }

  studentSubmitAssignment(body: any): Observable<any> {
    const { id, ..._body } = body;
    return this.http.post<any>(
      `${this.baseUrl}student/assignment/${id}`,
      _body
    );
  }

  updateStudentProfile(body: any): Observable<any> {
    return this.http.patch<any>(`${this.baseUrl}student/account/setting`, body);
  }

  updateStudentPreferences(body: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}student/preference`, body);
  }

  loadMakeupClassSlots(body: { date: string; id: number }): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}student/class/${body.id}/makeup-slots?start_date=${body.date}`
    );
  }

  loadTutorAvailability(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}teacher/${id}/availability`);
  }

  studentMakeupClass(body: any): Observable<any> {
    const { id, ..._body } = body;
    return this.http.post<any>(
      `${this.baseUrl}student/class/${id}/makeup`,
      _body
    );
  }
}
