import { catchError, map, Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IInterview } from '../models';

@Injectable({
  providedIn: 'root',
})
export class InterviewsService {
  baseUrl = environment.API_URL;

  constructor(private http: HttpClient) {}

  loadInterviews(): Observable<any> {
    return this.http
      .get<{ interview_requests: IInterview[] }>(
        `${this.baseUrl}admin/interview-request`
      )
      .pipe(
        map((response) =>
          response.interview_requests.map(
            (interview) => new IInterview(false, interview)
          )
        )
      )
      .pipe(catchError(this.errorHandler));
  }

  loadInterview(id: string): Observable<any> {
    return this.http
      .get<{ interview: IInterview }>(
        `${this.baseUrl}admin/interview-request/${id}`
      )
      .pipe(map((response) => new IInterview(false, response.interview)))
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }
}
