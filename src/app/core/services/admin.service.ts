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
    return this.http.get<any>(`${this.baseUrl}admin/course/${id}/feedbacks`);
  }

  loadAdminStudentProfile(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}admin/student/${id}/profile`);
  }

  loadAdminStudentDetail(courseId: number, studentId: number): Observable<any> {
    return this.http
      .get<any>(
        `${this.baseUrl}admin/student/${studentId}/course/${courseId}/booking-details`
      )
      .pipe(map((response) => response.course));
  }

  loadAdminStudentTotalBooking(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}admin/student/${id}/bookings`);
  }

  loadAllBookings(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}admin/bookings`).pipe(
      map((response) => ({
        courses: response?.courses.map(
          (course: any) => new ICourse(false, course)
        ),
        bookingsCounts: {
          allCourses: response?.all_courses,
          runningCourses: response?.running_courses,
          cancelledCourses: response?.cancelled_courses,
          completedCourses: response?.completed_courses,
        },
      }))
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
    return this.http.get<any>(`${this.baseUrl}admin/cancelled-courses`).pipe(
      map((response) => ({
        courses: response?.cancelled_courses.map(
          (course: any) => new ICourse(false, course)
        ),
        bookingsCounts: {
          cancelledCourses: response?.total,
          cancelledByTeacher: response?.by_teachers,
          cancelledByStudent: response?.by_students,
          cancelledByAdmin: response?.by_admins,
        },
      }))
    );
  }
}
