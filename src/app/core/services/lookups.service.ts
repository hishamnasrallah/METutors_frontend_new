import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProgramStatus } from '@metutor/config';
import { Observable, throwError, map } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import {
  ICountry,
  ISubject,
  IField,
  ILevel,
  ILanguage,
  ICity,
  ITicketCategory,
  ITicketPriority,
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

  getProgramCountries(): Observable<any> {
    return this.http
      .get<{ program_countries: ICountry[] }>(
        `${this.BACKEND_URL}program-country`
      )
      .pipe(
        map((response) => {
          return response.program_countries.map((item) => ({
            id: item.id,
            name: item.name,
          }));
        })
      )
      .pipe(catchError(this.errorHandler));
  }

  getCities(id: string): Observable<any> {
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
      .get<{ programs: any[] }>(`${this.BACKEND_URL}programs`)
      .pipe(
        map((response) => {
          return response.programs.map((item) => ({
            id: item.id,
            name: item.name,
            status: item.status,
            createdAt: item.created_at,
          }));
        })
      )
      .pipe(catchError(this.errorHandler));
  }

  addNewProgram(value: any): Observable<any> {
    return this.http
      .post<{ program: any; message: string }>(
        `${this.BACKEND_URL}program`,
        value
      )
      .pipe(
        map((response) => {
          return {
            message: response.message,
            program: {
              id: response.program.id,
              name: response.program.name,
              status: ProgramStatus.active,
              createdAt: response.program.created_at,
            },
          };
        })
      )
      .pipe(catchError(this.errorHandler));
  }

  editProgram(value: any): Observable<any> {
    return this.http
      .patch<{ program: any; message: string }>(
        `${this.BACKEND_URL}program/${value.id}`,
        value
      )
      .pipe(
        map((response) => {
          return {
            message: response.message,
            program: {
              id: response.program.id,
              name: response.program.name,
              status: ProgramStatus.active,
              createdAt: response.program.created_at,
            },
          };
        })
      )
      .pipe(catchError(this.errorHandler));
  }

  deleteProgram(id: number): Observable<any> {
    return this.http
      .delete<{ message: string }>(`${this.BACKEND_URL}program/${id}`)
      .pipe(catchError(this.errorHandler));
  }

  getTicketCategories(): Observable<any> {
    return this.http
      .get<{ ticket_categories: ITicketCategory[] }>(
        `${this.BACKEND_URL}ticket-categories`
      )
      .pipe(
        map((response) => {
          return response.ticket_categories.map((item) => ({
            id: item.id,
            name: item.name,
          }));
        })
      )
      .pipe(catchError(this.errorHandler));
  }

  getTicketPriorities(): Observable<any> {
    return this.http
      .get<{ ticket_priorities: ITicketPriority[] }>(
        `${this.BACKEND_URL}ticket-priorities`
      )
      .pipe(
        map((response) => {
          return response.ticket_priorities.map((item) => ({
            id: item.id,
            name: item.name,
          }));
        })
      )
      .pipe(catchError(this.errorHandler));
  }

  getSubjectsByFieldId(fieldId: string, countryId?: string): Observable<any> {
    let params = new HttpParams();

    if (fieldId) {
      params = params.append('field_id', fieldId);
    }

    if (countryId) {
      params = params.append('country_id', countryId);
    }

    return this.http
      .get<{ subjects: any }>(`${this.BACKEND_URL}field-subjects`, {
        params,
      })
      .pipe(
        map((response) => {
          return response.subjects.map((item: any) => ({
            id: item.id,
            name: item.name,
            pricePerHour: item.price_per_hour,
            fieldId: item.field_id,
          }));
        })
      )
      .pipe(catchError(this.errorHandler));
  }

  getSubjects(): Observable<any> {
    return this.http
      .get<{ subjects: any }>(`${this.BACKEND_URL}subjects`)
      .pipe(
        map((response) => {
          return response.subjects.map(
            (item: any) => new ISubject(false, item)
          );
        })
      )
      .pipe(catchError(this.errorHandler));
  }

  getFieldsByProgramId(fieldId: string, countryId?: string): Observable<any> {
    let params = new HttpParams();

    if (fieldId) {
      params = params.append('program_id', fieldId);
    }

    if (countryId) {
      params = params.append('country_id', countryId);
    }

    return this.http
      .get<{ field_of_study: IField[] }>(`${this.BACKEND_URL}field-of-study`, {
        params,
      })
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
            countryId: item?.country_id,
            grade: item?.grade,
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

  getLevels(): Observable<any> {
    return this.http
      .get<{ course_levels: ILevel[] }>(`${this.BACKEND_URL}course-levels`)
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
