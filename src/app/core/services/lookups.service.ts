import {
  HttpParams,
  HttpClient,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { ProgramStatus } from '@metutor/config';
import { Observable, throwError, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  ICity,
  IField,
  ILevel,
  ICountry,
  ISubject,
  ILanguage,
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
            flag: `https://countryflagsapi.com/png/${item?.iso2}`
          }));
        })
      )
      .pipe(catchError(this.errorHandler));
  }

  getProgramCountries(): Observable<any> {
    return this.http
      .get<{ program_countries: any[] }>(`${this.BACKEND_URL}program-country`)
      .pipe(
        map((response) => {
          return response.program_countries.map((item) => ({
            id: item.id,
            name: item.name,
            updatedAt: item.updated_at,
            flag: item?.flag,
            status: item.status,
          }));
        })
      )
      .pipe(catchError(this.errorHandler));
  }

  getFlagCountries(): Observable<any> {
    return this.http
      .get<{ countries: ICountry[] }>(`${this.BACKEND_URL}all-countries`)
      .pipe(
        map((response) => {
          return response.countries.map((item) => ({
            name: item.name,
            flag: item.flag,
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
            title: item.title,
            status: item.status,
            updatedAt: item.updated_at,
            image: environment.programImage + item.image,
            description: item.description,
          }));
        })
      )
      .pipe(catchError(this.errorHandler));
  }

  getAdminPrograms(params: any): Observable<any> {
    return this.http
      .get<any>(`${this.BACKEND_URL}program`, { params })
      .pipe(
        map((response) => {
          return {
            total: response.programs?.total,
            programs: response.programs?.data.map((item: any) => ({
              id: item.id,
              name: item.name,
              image: item.image,
              title: item.title,
              status: item.status,
              updatedAt: item.updated_at,
              description: item.description,
            })),
          };
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
              title: response.program.title,
              image: response.program.image,
              updatedAt: response.program.updated_at,
              description: response.program.description,
            },
          };
        })
      )
      .pipe(catchError(this.errorHandler));
  }

  editProgram(value: any, id: number): Observable<any> {
    return this.http
      .post<{ program: any; message: string }>(
        `${this.BACKEND_URL}program/${id}`,
        value
      )
      .pipe(
        map((response) => {
          return {
            message: response.message,
            program: {
              id: response.program.id,
              name: response.program.name,
              title: response.program.title,
              image: response.program.image,
              status: response.program.status,
              updatedAt: response.program.updated_at,
              description: response.program.description,
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

  getAdminSubjects(params: any): Observable<any> {
    return this.http
      .get<{ total: number; subject: ISubject[] }>(
        `${this.BACKEND_URL}subject`,
        { params }
      )
      .pipe(
        map((response: any) => ({
          total: response.subject.total,
          subjects: response.subject.data.map(
            (item: any) => new ISubject(false, item)
          ),
        }))
      )
      .pipe(catchError(this.errorHandler));
  }

  addNewSubject(value: any): Observable<any> {
    return this.http
      .post<{ subject: any; message: string }>(`${this.BACKEND_URL}subject`, {
        name: value.name,
        grade: value.grade,
        program_id: value.program,
        country_id: value.country,
        field_id: value.field,
        price_per_hour: value.price,
        description: value.description,
      })
      .pipe(
        map((response) => {
          return {
            message: response.message,
            subject: new ISubject(false, response.subject),
          };
        })
      )
      .pipe(catchError(this.errorHandler));
  }

  editSubject(value: any): Observable<any> {
    return this.http
      .patch<{ subject: any; message: string }>(
        `${this.BACKEND_URL}subject/${value.id}`,
        {
          name: value.name,
          grade: value.grade,
          program_id: value.program,
          country_id: value.country,
          field_id: value.field,
          price_per_hour: value.price,
          status: value.status,
          description: value.description,
        }
      )
      .pipe(
        map((response) => {
          return {
            message: response.message,
            subject: new ISubject(false, response.subject),
          };
        })
      )
      .pipe(catchError(this.errorHandler));
  }

  deleteSubject(id: number): Observable<any> {
    return this.http
      .delete<{ message: string }>(`${this.BACKEND_URL}subject/${id}`)
      .pipe(catchError(this.errorHandler));
  }

  getFieldsByProgramId(
    fieldId: string,
    countryId?: string,
    grade?: number
  ): Observable<any> {
    let params = new HttpParams();

    if (fieldId) {
      params = params.append('program_id', fieldId);
    }

    if (countryId) {
      params = params.append('country_id', countryId);
    }

    if (grade) {
      params = params.append('grade', grade);
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
            image: item.image,
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
            image: item?.image,
            status: item?.status,
            updatedAt: item?.updated_at,
            program: item?.program,
            country: item?.country,
          }));
        })
      )
      .pipe(catchError(this.errorHandler));
  }

  getAdminFields(params: any): Observable<any> {
    return this.http
      .get<{ FieldOfStudy: any }>(`${this.BACKEND_URL}fieldofstudy`, { params })
      .pipe(
        map((response) => ({
          total: response.FieldOfStudy.total,
          fields: response.FieldOfStudy?.data,
        }))
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

  addNewField(body: any): Observable<any> {
    return this.http
      .post<{ FieldOfStudy: any; message: string }>(
        `${this.BACKEND_URL}fieldofstudy`,
        body
      )
      .pipe(
        map((response) => {
          return {
            message: response.message,
            field: {
              id: response.FieldOfStudy.id,
              name: response.FieldOfStudy.name,
              programId: response.FieldOfStudy?.program_id,
              countryId: response.FieldOfStudy?.country_id,
              grade: response.FieldOfStudy?.grade,
              status: response.FieldOfStudy?.status,
              updatedAt: response.FieldOfStudy?.updated_at,
              program: response.FieldOfStudy?.program,
              country: response.FieldOfStudy?.country,
            },
          };
        })
      )
      .pipe(catchError(this.errorHandler));
  }

  editField(body: any, id: number): Observable<any> {
    return this.http
      .post<{ FieldOfStudy: any; message: string }>(
        `${this.BACKEND_URL}fieldofstudy/${id}`,
        body
      )
      .pipe(
        map((response) => {
          return {
            message: response.message,
            field: {
              id: response.FieldOfStudy.id,
              name: response.FieldOfStudy.name,
              image: response.FieldOfStudy.image,
              programId: response.FieldOfStudy?.program_id,
              countryId: response.FieldOfStudy?.country_id,
              grade: response.FieldOfStudy?.grade,
              status: response.FieldOfStudy?.status,
              updatedAt: response.FieldOfStudy?.updated_at,
              program: response.FieldOfStudy?.program,
              country: response.FieldOfStudy?.country,
            },
          };
        })
      )
      .pipe(catchError(this.errorHandler));
  }

  deleteField(id: number): Observable<any> {
    return this.http
      .delete<{ message: string }>(`${this.BACKEND_URL}fieldofstudy/${id}`)
      .pipe(catchError(this.errorHandler));
  }

  addNewProgramCountries(value: any): Observable<any> {
    return this.http
      .post<{ program_country: any; message: string }>(
        `${this.BACKEND_URL}program-country`,
        value
      )
      .pipe(
        map((response) => {
          return {
            message: response.message,
            country: {
              id: response.program_country.id,
              name: response.program_country.name,
              status: ProgramStatus.active,
              updatedAt: response.program_country.updated_at,
            },
          };
        })
      )
      .pipe(catchError(this.errorHandler));
  }

  editProgramCountries(value: any): Observable<any> {
    return this.http
      .patch<{ program_country: any; message: string }>(
        `${this.BACKEND_URL}program-country/${value.id}`,
        value
      )
      .pipe(
        map((response) => {
          return {
            message: response.message,
            country: {
              id: response.program_country.id,
              name: response.program_country.name,
              status: response.program_country.status,
              updatedAt: response.program_country.updated_at,
            },
          };
        })
      )
      .pipe(catchError(this.errorHandler));
  }

  deleteProgramCountries(id: number): Observable<any> {
    return this.http
      .delete<{ message: string }>(`${this.BACKEND_URL}program-country/${id}`)
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
