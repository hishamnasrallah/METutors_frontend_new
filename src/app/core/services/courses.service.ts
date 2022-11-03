import { Injectable } from '@angular/core';
import camelcaseKeys from 'camelcase-keys';
import { ICourse, IProgram } from '@models';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  baseUrl = environment.API_URL;

  constructor(private http: HttpClient) {}

  loadCourses(params: any): Observable<any> {
    return this.http.get<{ courses: ICourse[] }>(`${this.baseUrl}courses`, {
      params
    });
  }

  loadExploredCourses(programId: string, countryId?: string): Observable<any> {
    const query = countryId ? `?country_id=${countryId}` : '';

    return this.http.get<{
      field_of_studies: any[];
      subjects: any[];
      program: IProgram;
    }>(`${this.baseUrl}courses/${programId}${query}`);
  }

  getCourseById(courseId: number): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}courses/course-detail/${courseId}`
    );
  }

  acceptCourse(payload: { courseId: number }): Observable<any> {
    return this.http.post<{ dashboard: any }>(
      `${this.baseUrl}course/accept/${payload.courseId}`,
      {}
    );
  }

  rejectCourse(payload: { reason: string; courseId: number }): Observable<any> {
    return this.http.post<{ dashboard: any }>(
      `${this.baseUrl}course/reject/${payload.courseId}`,
      { reason: payload.reason }
    );
  }

  tutorCancelCourse(body: string, courseId: number): Observable<any> {
    return this.http.post<{ dashboard: any }>(
      `${this.baseUrl}teacher/course/${courseId}/cancel`,
      body
    );
  }

  getCourseRefund(courseId: number, refundType: string): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}student/refund/course/${courseId}?${refundType}`
    );
  }

  getCourseClassRefund(courseId: number, classIds: any): Observable<any> {
    //  const params = new HttpParams().set('academic_classes', classIds);
    const params = { 'academic_classes[]': classIds };
    return this.http.get<any>(
      `${this.baseUrl}student/refund/course/${courseId}/classes`,
      { params }
    );
  }

  studentCancelCourse(body: string, courseId: number): Observable<any> {
    return this.http.post<any>(
      `${this.baseUrl}student/course/${courseId}/cancel`,
      body
    );
  }

  studentRequestAdminAssignCourse(courseId: number): Observable<any> {
    return this.http.post<any>(
      `${this.baseUrl}student/course/${courseId}/request-admin`,
      {}
    );
  }

  studentReassignTutor(body: any, courseId: number): Observable<any> {
    let { id, ..._body } = body;
    id = id ? id : courseId;

    return this.http.post<any>(
      `${this.baseUrl}student/course/${id}/select-teacher`,
      _body
    );
  }

  calculateEstimatedPrice(subjectId: string): Observable<any> {
    return this.http
      .get<{ estimated_price_per_hour: number }>(
        `${this.baseUrl}estimated-price?subject_id=${subjectId}`
      )
      .pipe(map(response => response.estimated_price_per_hour))
      .pipe(catchError(this.errorHandler));
  }

  calculateFinalInvoice(classes: any, classroom: any): Observable<any> {
    let body: {};

    if (classes) {
      body = classes;
    } else {
      body = {
        subject_id: classroom?.subject,
        classes:
          classroom?.classrooms && classroom?.classrooms.length
            ? classroom?.classrooms.map((clss: any) => ({
                date: clss.date,
                day: clss.day + 1,
                start_time: clss.start_time,
                end_time: clss.end_time,
                duration: clss.duration
              }))
            : []
      };
    }

    return this.http
      .post(`${this.baseUrl}final-invoice`, body)
      .pipe(
        map(response =>
          camelcaseKeys(response, {
            deep: true
          })
        )
      )
      .pipe(catchError(this.errorHandler));
  }

  createCourse(body: any): Observable<any> {
    return this.http.post(`${this.baseUrl}create-class`, body);
  }

  createFreeCourse(body: any): Observable<any> {
    return this.http.post(`${this.baseUrl}demo-class`, body);
  }

  requestCourse(value: any): Observable<any> {
    return this.http.post(`${this.baseUrl}course/request`, {
      program_id: value?.program,
      country_id: value?.country,
      grade: value?.grade,
      subject: value?.subject,
      gender_preference: value?.gender,
      language_preference: value?.language,
      course_description: value?.description,
      student_name: value?.name,
      email: value?.email
    });
  }

  getInvoiceEmail(value: any): Observable<any> {
    return this.http.post(`${this.baseUrl}invoice-mail`, {
      email: value.email,
      invoiceData: {
        no_of_classes: +value.noOfClasses,
        price_per_hour: +value.pricePerHour,
        total_hours: +value.totalHours,
        total_amount: +value.totalAmount,
        date: value.date,
        invoice_number: value.invoiceNumber
      }
    });
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }
}
