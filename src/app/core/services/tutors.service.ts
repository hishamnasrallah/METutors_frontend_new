import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ITutor } from '../models';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TutorsService {
  mainLink = environment.API_URL + 'teacher/';

  constructor(private http: HttpClient) {}

  sendTeacherAccount(data: any): Observable<any> {
    return this.http.post<any>(`${this.mainLink}complete-account`, data);
  }

  fetchFeaturedTutors(): Observable<any> {
    return this.http
      .get<{ results: ITutor[] }>(`${this.mainLink}featured_tutors/`)
      .pipe(
        map((response) => {
          return response.results.map((item) => new ITutor(false, item));
        })
      );
  }

  getTutorById(id: string): Observable<any> {
    return this.http.get<ITutor>(`${this.mainLink}profile/${id}/`).pipe(
      map((response) => {
        return new ITutor(false, response);
      })
    );
  }

  generateTutors(value: any): Observable<any> {
    return this.http
      .post<{ result: ITutor[] }>(`${this.mainLink}check_availability/`, value)
      .pipe(
        map((response) => {
          return response.result.map((item) => new ITutor(false, item));
        })
      );
  }

  sendTutorFeedback(value: any): Observable<any> {
    return this.http.post(
      `${this.mainLink}rate/?batch_id=${value?.classroomId}&tutor_id=${value?.tutorId}`,
      {
        expert_in_the_subject: value?.expertSubject,
        present_complex_topics_clearly_and_easily: value?.presentTopics,
        skillful_in_engaging_students: value?.skillfulStudents,
        always_on_time: value?.alwaysTime,
        feedback: value?.feedback,
      }
    );
  }
}
