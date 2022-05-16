import { map, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { ICapacity, ICourse, ISubject, ITutor } from '../models';

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

  loadAdminTutors(tutorType: string, id: number): Observable<any> {
    return this.http
      .get<any>(`${this.baseUrl}admin/subject/${id}/${tutorType}`)
      .pipe(
        map((response) =>
          response.teachers.map((teacher: any) => new ITutor(false, teacher))
        )
      );
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

  loadBookingDetails(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}admin/course/${id}/detail`);
  }

  loadAdminCoursePreviousTutors(id: number): Observable<any> {
    return this.http
      .get<any>(`${this.baseUrl}admin/course/${id}/previous-teachers`)
      .pipe(map((response) => response.previous_teachers));
  }

  loadAdminStudentsFeedback(id: number): Observable<any> {
    return this.http
      .get<any>(`${this.baseUrl}admin/course/${id}/previous-teachers`)
      .pipe(map((response) => response.previous_teachers));
  }

  loadAllBookings(): Observable<any> {
    return this.http
      .get<any>(`${this.baseUrl}admin/bookings`)
      .pipe(
        map((response) =>
          response?.courses.map((course: any) => new ICourse(false, course))
        )
      );
  }

  loadCompletedBookings(): Observable<any> {
    return this.http
      .get<any>(`${this.baseUrl}admin/bookings?completed=true`)
      .pipe(
        map((response) =>
          response?.courses.map((course: any) => new ICourse(false, course))
        )
      );
  }

  loadRunningBookings(): Observable<any> {
    return this.http
      .get<any>(`${this.baseUrl}admin/bookings?running=true`)
      .pipe(
        map((response) =>
          response?.courses.map((course: any) => new ICourse(false, course))
        )
      );
  }

  loadCancelledBookings(): Observable<any> {
    return this.http
      .get<any>(`${this.baseUrl}admin/bookings?cancelled=true`)
      .pipe(
        map((response) =>
          response?.courses.map((course: any) => new ICourse(false, course))
        )
      );
  }
}
