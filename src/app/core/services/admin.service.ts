import { map, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { ICapacity, ICourse, ISubject, ITutor, ICourseRequest } from '@models';

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

  loadWorkforceCapacity(params: any): Observable<any> {
    return this.http
      .get<any>(`${this.baseUrl}admin/workforce-capacity`, { params })
      .pipe(
        map((response) => ({
          total: response.subjects.total,
          workforceCapacity: response?.subjects.data.map(
            (capacity: any) => new ICapacity(false, capacity)
          ),
        }))
      );
  }

  loadCourseBookingList(id: number): Observable<any> {
    return this.http
      .get<any>(`${this.baseUrl}admin/subject/${id}/bookings`)
      .pipe(map((response) => new ISubject(false, response?.subject)));
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
    return this.http.get<any>(`${this.baseUrl}admin/student/${id}`);
  }

  loadBookingDetails(id: number): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}admin/teacher/${id}/course/${id}/booking-details`
    );
  }

  loadAdminStudentBookingDetail(
    courseId: number,
    studentId: number
  ): Observable<any> {
    return this.http
      .get<any>(
        `${this.baseUrl}admin/student/${studentId}/course/${courseId}/booking-details`
      )
      .pipe(map((response) => response.course));
  }

  loadAdminTutorBookingDetail(
    courseId: number,
    tutorId: number
  ): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}admin/teacher/${tutorId}/course/${courseId}/booking-details`
    );
  }

  loadAdminStudentAssignmentSummary(
    courseId: number,
    studentId: number
  ): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}admin/student/${studentId}/course/${courseId}/assignment-summary`
    );
  }

  viewFeedback(courseId: number, studentId: number): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}admin/student/${studentId}/course/${courseId}/feedback`
    );
  }

  loadAdminStudentTotalBooking(
    id: number,
    bookingType = 'student'
  ): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}admin/${bookingType}/${id}/bookings`
    );
  }

  loadAdminBookingPerCourse(status: string): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}admin/subject-courses?status=${status}`
    );
  }

  loadAdminTutorReAssignment(status: string): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}admin/assign-teacher?status=${status}`
    );
  }

  loadAdminTestimonials(feedbackBy: string): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}admin/testimonials?feedback_by=${feedbackBy}`
    );
  }

  loadAdminTestimonialFeedbackOptions(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}admin/testimonial/${id}`);
  }

  loadAdminTutorApprovalRequest(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}admin/approval-request`);
  }

  loadRequestedCourses(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}admin/requested-courses`).pipe(
      map((response) => ({
        requestedCourses: response?.requested_courses.map(
          (request: any) => new ICourseRequest(false, request)
        ),
        completedCourses: response?.completed_courses.map(
          (request: any) => new ICourseRequest(false, request)
        ),
        requestedCoursesCounts: {
          newCount: response?.new_request_count,
          completedCount: response?.completed_count,
        },
      }))
    );
  }

  adminEditTestimonialStatus(id: number, status: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}admin/user-testimonial/${id}`, {
      status,
    });
  }

  adminEditTestimonialFeedback(body: any): Observable<any> {
    const { receiver_id, ..._body } = body;

    return this.http.post<any>(
      `${this.baseUrl}admin/testimonial/${receiver_id}`,
      _body
    );
  }

  adminChangeTutorAvailabilityStatus(
    id: number,
    status: string
  ): Observable<any> {
    return this.http.post<any>(
      `${this.baseUrl}admin/course/${id}/teacher-status`,
      { status }
    );
  }

  loadBookings(_params: any): Observable<any> {
    let { status, ...params } = _params;
    if (status) {
      params = {
        ...params,
        [status]: true,
      };
    }

    return this.http.get<any>(`${this.baseUrl}admin/bookings`, { params }).pipe(
      map((response) => ({
        courses: response?.courses?.data.map(
          (course: any) => new ICourse(false, course)
        ),
        bookingsCounts: {
          total: response?.courses?.total,
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
        courses: response?.cancelled_courses,
        bookingsCounts: {
          cancelledCourses: response?.total,
          cancelledByTeacher: response?.by_teachers,
          cancelledByStudent: response?.by_students,
          cancelledByAdmin: response?.by_admins,
        },
      }))
    );
  }

  changeCourseStatus(id: number, status: string): Observable<any> {
    return this.http.post(
      `${this.baseUrl}admin/requested-course/${id}/status`,
      {
        status,
      }
    );
  }

  loadAdminTutorSchedule(_params: any, date?: string): Observable<any> {
    const params = {
      ..._params,
      start_date: date ? date : '',
    };

    return this.http
      .get<any>(`${this.baseUrl}admin/teachers/schedule`, { params })
      .pipe(
        map((response) => ({
          total: response?.teachers?.total,
          tutors: response?.teachers?.data.map(
            (tutor: any) => new ITutor(false, tutor)
          ),
          weekdays: response.weekdays.map((day: any) => ({
            day: Object.keys(day)[0],
            date: Object.values(day)[0],
          })),
        }))
      );
  }
}
