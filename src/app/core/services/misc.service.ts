import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';
import { IStatistics } from '../models';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MiscService {
  mainLink = environment.API_URL + 'misc/';

  constructor(private http: HttpClient) {}

  fetchTestmonials(): Observable<any> {
    return this.http
      .get<{ results: any }>(`${this.mainLink}student_success_testimonials/`)
      .pipe(catchError(this.errorHandler));
  }

  fetchOpportunities(): Observable<any> {
    return this.http
      .get<{ results: any }>(
        `${this.mainLink}become_a_tutor_tutors_testimonials/`
      )
      .pipe(catchError(this.errorHandler));
  }

  fetchAboutStatistics(): Observable<any> {
    return this.http
      .get<{ results: any }>(`${this.mainLink}about_us_statistics/`)
      .pipe(
        map((response) => {
          return response.results.map(
            (item: any) => new IStatistics(false, item)
          );
        })
      )
      .pipe(catchError(this.errorHandler));
  }

  fetchTutorStatistics(): Observable<any> {
    return this.http
      .get<{ results: any }>(`${this.mainLink}become_a_tutor_statistics/`)
      .pipe(
        map((response) => {
          return response.results.map(
            (item: any) => new IStatistics(false, item)
          );
        })
      )
      .pipe(catchError(this.errorHandler));
  }

  fetchValuesStatistics(): Observable<any> {
    return this.http
      .get<{ results: any }>(`${this.mainLink}about_us_metutors_values/`)
      .pipe(catchError(this.errorHandler));
  }

  fetchWhyMeTutors(): Observable<any> {
    return this.http
      .get<{ results: any }>(`${this.mainLink}about_us_why_metutors/`)
      .pipe(catchError(this.errorHandler));
  }

  fetchWhyWeTeach(): Observable<any> {
    return this.http
      .get<{ results: any[] }>(`${this.mainLink}about_us_what_we_teach/`)
      .pipe(catchError(this.errorHandler));
  }

  fetchInnovateApproach(): Observable<any> {
    return this.http
      .get<{ results: any[] }>(
        `${this.mainLink}about_us_our_innovative_approach/`
      )
      .pipe(catchError(this.errorHandler));
  }

  fetchFounders(): Observable<any> {
    return this.http
      .get<{ results: any[] }>(`${this.mainLink}about_us_founders/`)
      .pipe(catchError(this.errorHandler));
  }

  fetchBecomeTutors(): Observable<any> {
    return this.http
      .get<{ results: any[] }>(
        `${this.mainLink}become_a_tutor_why_become_a_tutor/`
      )
      .pipe(catchError(this.errorHandler));
  }

  fetchWhyTeachingUs(): Observable<any> {
    return this.http
      .get<{ results: any[] }>(
        `${this.mainLink}become_a_tutor_why_teach_with_us/`
      )
      .pipe(catchError(this.errorHandler));
  }

  fetchRequestCoursesList(): Observable<any> {
    return this.http
      .get<{ results: any[] }>(
        `${this.mainLink}become_a_tutor_how_to_request_new_course/`
      )
      .pipe(catchError(this.errorHandler));
  }

  fetchSystemInfoDetails(): Observable<any> {
    return this.http
      .get<any>(`${this.mainLink}system_detail_info/`)
      .pipe(catchError(this.errorHandler));
  }

  fetchLangCourseIntroduction(): Observable<any> {
    return this.http
      .get<any>(`${this.mainLink}languages_courses_introducing/`)
      .pipe(catchError(this.errorHandler));
  }

  fetchPrepCollageIntroducing(): Observable<any> {
    return this.http
      .get<any>(`${this.mainLink}prep_collage_introducing/`)
      .pipe(catchError(this.errorHandler));
  }

  fetchAcademicTutoringBenefits(): Observable<any> {
    return this.http
      .get<any>(`${this.mainLink}academic_tutoring_benefits/`)
      .pipe(catchError(this.errorHandler));
  }

  fetchAcademicTutoringStatistics(): Observable<any> {
    return this.http
      .get<{ results: any }>(`${this.mainLink}academic_tutoring_statistics/`)
      .pipe(
        map((response) => {
          return response.results.map(
            (item: any) => new IStatistics(false, item)
          );
        })
      )
      .pipe(catchError(this.errorHandler));
  }

  fetchLanguages(): Observable<any> {
    return this.http
      .get(`${this.mainLink}languages/`)
      .pipe(
        map((response: any) => {
          return Object.keys(response).map((key) => {
            const item = { id: key, name: response[key] };
            return item;
          });
        })
      )
      .pipe(catchError(this.errorHandler));
  }

  _fetchAcademicTutoringPrice(): Observable<any> {
    return this.http
      .get<any>(`${this.mainLink}academic_tutoring_price_conf/`)
      .pipe(
        map((response) => {
          return {
            oneOnOne: response?.one_on_one_price_per_hour,
            groupStudy: response?.group_of_study_price_per_hour,
          };
        })
      )
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }
}
