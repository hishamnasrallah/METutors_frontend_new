import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, map } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import {
  IProgram,
  ICountry,
  ISubject,
  ICourseField,
  ICourseLevel,
  ILanguage,
  ICity,
} from '../models';

@Injectable({
  providedIn: 'root',
})
export class LookupsService {
  BACKEND_URL = environment.API_URL;

  constructor(private http: HttpClient) {}

  getCountries(): Observable<any> {
    return this.http
      .get<{ countries: ICountry[] }>(`${this.BACKEND_URL}countries`)
      .pipe(
        map((response) => {
          return response.countries.map((item) => ({
            id: item.id,
            name: item.name,
          }));
        })
      )
      .pipe(catchError(this.errorHandler));
  }

  getCities(id: number): Observable<any> {
    return this.http
      .get<{ cities: ICity[] }>(`${this.BACKEND_URL}cities?country_id=${id}`)
      .pipe(
        map((response) => {
          return response.cities.map((item) => ({
            id: item.id,
            name: item.name,
          }));
        })
      )
      .pipe(catchError(this.errorHandler));
  }

  getPrograms(): Observable<any> {
    return this.http
      .get<{ programs: IProgram[] }>(`${this.BACKEND_URL}programs`)
      .pipe(
        map((response) => {
          return response.programs.map((item) => ({
            id: item.id,
            name: item.name,
          }));
        })
      )
      .pipe(catchError(this.errorHandler));
  }

  getCourseFieldSubject(fieldId: string): Observable<any> {
    return this.http
      .get<{ subjects: ISubject[] }>(
        `${this.BACKEND_URL}field-subjects?field_id=${fieldId}`
      )
      .pipe(
        map((response) => {
          return response.subjects.map((item) => ({
            id: item.id,
            name: item.name,
          }));
        })
      )
      .pipe(catchError(this.errorHandler));
  }

  getCourseField(fieldId: string): Observable<any> {
    return this.http
      .get<{ field_of_study: ICourseField[] }>(
        `${this.BACKEND_URL}field-of-study?program_id=${fieldId}`
      )
      .pipe(
        map((response) => {
          return response.field_of_study.map((item) => ({
            id: item.id,
            name: item.name,
          }));
        })
      )
      .pipe(catchError(this.errorHandler));
  }

  getFields(): Observable<any> {
    return this.http
      .get<{ field_of_study: any }>(`${this.BACKEND_URL}field-of-studies`)
      .pipe(
        map((response) => {
          return response.field_of_study.map((item: any) => ({
            id: item.id,
            name: item.name,
            programId: item?.program_id,
          }));
        })
      )
      .pipe(catchError(this.errorHandler));
  }

  getFieldSubjects(fieldsId: string[]): Observable<any> {
    return this.http
      .get<{ subjects: ISubject[] }>(
        `${this.BACKEND_URL}multi-field-subjects?field_id=${fieldsId}`
      )
      .pipe(
        map((response) => {
          return response.subjects.map((item) => ({
            id: item.id,
            name: item.name,
          }));
        })
      )
      .pipe(catchError(this.errorHandler));
  }

  getCourseLevel(): Observable<any> {
    return this.http
      .get<{ course_levels: ICourseLevel[] }>(
        `${this.BACKEND_URL}course-levels`
      )
      .pipe(
        map((response) => {
          return response.course_levels.map((item) => ({
            id: item.id,
            name: item.name,
          }));
        })
      )
      .pipe(catchError(this.errorHandler));
  }

  getLanguages(): Observable<any> {
    return this.http
      .get<{ languages: ILanguage[] }>(`${this.BACKEND_URL}languages`)
      .pipe(
        map((response) => {
          return response.languages.map((item) => ({
            id: item.id,
            name: item.name,
          }));
        })
      )
      .pipe(catchError(this.errorHandler));
  }

  getTicketTypes(): Observable<any> {
    return this.http
      .get<any>(`${this.BACKEND_URL}ticket_types`)
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }
}
