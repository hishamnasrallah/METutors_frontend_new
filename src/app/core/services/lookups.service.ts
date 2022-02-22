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
  BACKEND_URL = environment.API_URL;

  constructor(private http: HttpClient) {}

  getCountries(): Observable<any> {
    return this.http.get<any>(this.BACKEND_URL + `countries`);
  }

  getCities(id: string): Observable<any> {
    return this.http.get<any>(this.BACKEND_URL + `cities?country_id=${id}`);
  }

  addLanguage(data: any): Observable<any> {
    return this.http.post<any>(this.BACKEND_URL + 'add-language', data);
  }

  removeLanguage(data: any): Observable<any> {
    return this.http.post<any>(this.BACKEND_URL + 'remove-language', data);
  }

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
