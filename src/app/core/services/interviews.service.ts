import { IInterview } from '../models';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError, map, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class InterviewsService {
  baseUrl = environment.API_URL;

  constructor(private http: HttpClient) {}

  loadInterviews(params: any): Observable<any> {
    return this.http
      .get<{ interview_requests: { total: number; data: IInterview[] } }>(
        `${this.baseUrl}admin/interview-request`,
        { params }
      )
      .pipe(
        map((response) => ({
          total: response.interview_requests.total,
          interviews: response.interview_requests.data.map(
            (interview) => new IInterview(false, interview)
          ),
        }))
      )
      .pipe(catchError(this.errorHandler));
  }

  loadInterview(id: string): Observable<any> {
    return this.http
      .get<{ interview_request: IInterview }>(
        `${this.baseUrl}admin/interview-request/${id}`
      )
      .pipe(
        map((response) => new IInterview(false, response.interview_request))
      )
      .pipe(catchError(this.errorHandler));
  }

  acceptInterviewRequest(id: number, value: any): Observable<any> {
    const body = {
      admin_comments: value?.message,
      subjects:
        value.subjects && value.subjects.length
          ? value.subjects.map((subject: any) => ({
              id: subject.id,
              hourly_price: subject.pricePerHour,
            }))
          : [],
    };

    return this.http
      .post<{ message: string }>(`${this.baseUrl}teacher/approve/${id}`, body)
      .pipe(catchError(this.errorHandler));
  }

  declineInterviewRequest(id: number, value: any): Observable<any> {
    const body = {
      admin_comments: value?.message,
    };

    return this.http
      .post<{ message: string }>(`${this.baseUrl}teacher/reject/${id}`, body)
      .pipe(catchError(this.errorHandler));
  }

  scheduleInterviewRequest(
    interview_request_id: number,
    data: any
  ): Observable<any> {
    const body = {
      interview_request_id,
      ...data,
    };

    return this.http
      .post<any>(`${this.baseUrl}admin/schedule-meeting`, body)
      .pipe(catchError(this.errorHandler));
  }

  joinInterview(id: number): Observable<any> {
    return this.http
      .get<any>(`${this.baseUrl}join-meeting/${id}`)
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }
}
