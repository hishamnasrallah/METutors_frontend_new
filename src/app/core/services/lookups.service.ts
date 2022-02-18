import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LookupsService {
  mainLink = environment.API_URL + 'lookup/';

  constructor(private http: HttpClient) {}

  fetchTicketTypes(): Observable<any> {
    return this.http
      .get<any>(`${this.mainLink}ticket_types/`)
      .pipe(catchError(this.errorHandler));
  }

  fetchCourseFieldSubject(): Observable<any> {
    return this.http
      .get<any>(`${this.mainLink}course_field_with_subject/`)
      .pipe(catchError(this.errorHandler));
  }

  fetchCourseLevel(): Observable<any> {
    return this.http
      .get<any>(`${this.mainLink}course_level/`)
      .pipe(catchError(this.errorHandler));
  }

  fetchCourseField(): Observable<any> {
    return this.http
      .get<any>(`${this.mainLink}course_field/`)
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }
}
