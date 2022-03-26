import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';

import { ITutor } from '@models';

@Injectable({
  providedIn: 'root',
})
export class TutorsService {
  baseUrl = environment.API_URL;

  constructor(private http: HttpClient) {}

  sendTeacherAccount(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}teacher/complete-account`, data);
  }

  fetchFeaturedTutors(): Observable<any> {
    return this.http
      .get<{ results: ITutor[] }>(`${this.baseUrl}/featured_tutors`)
      .pipe(
        map((response) => {
          return response.results.map((item) => new ITutor(false, item));
        })
      );
  }

  getTutorById(id: number | string): Observable<any> {
    return this.http
      .get<{ user: ITutor }>(`${this.baseUrl}teacher-profile?id=${id}`)
      .pipe(
        map((response) => {
          return new ITutor(false, response.user);
        })
      );
  }

  getTutorDashboard(params: any): Observable<any> {
    let query = '';
    if (params) {
      query = '?search_query=' + params;
    }
    return this.http.get<{ dashboard: any }>(
      `${this.baseUrl}teacher-dashboard${query}`
    );
  }

  generateTutors(filters: any): Observable<any> {
    const object = { ...filters };
    const params = new HttpParams({ fromObject: object });

    return this.http
      .get<{ filtered_teacher: ITutor[] }>(`${this.baseUrl}filtered-teacher`, {
        params,
      })
      .pipe(
        map((response) => {
          return response.filtered_teacher.map(
            (item) => new ITutor(false, item)
          );
        })
      );
  }

  sendTutorFeedback(value: any): Observable<any> {
    return this.http.post(
      `${this.baseUrl}rate/?batch_id=${value?.classroomId}&tutor_id=${value?.tutorId}`,
      {
        expert_in_the_subject: value?.expertSubject,
        present_complex_topics_clearly_and_easily: value?.presentTopics,
        skillful_in_engaging_students: value?.skillfulStudents,
        always_on_time: value?.alwaysTime,
        feedback: value?.feedback,
      }
    );
  }

  // Tutor Syllabus
  getTutorSyllabus(id: number | string): Observable<any> {
    return this.http.get<{ user: ITutor }>(
      `${this.baseUrl}course/${id}/syllabus`
    );
  }

  addSyllabusTopic(data: any, course_id: number | string): Observable<any> {
    const body = {
      ...data,
      course_id,
    };

    return this.http.post<any>(`${this.baseUrl}course/add-topic`, body);
  }

  editSyllabusTopic(body: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}topic/update`, body);
  }

  deleteSyllabusTopic(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}topic/${id}`);
  }

  editSubjectTitle(title: string, id: number): Observable<any> {
    return this.http.patch<any>(`${this.baseUrl}class/edit/${id}`, { title });
  }

  launchClass(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}class/launch/${id}`, {});
  }

  // Tutor resources
  getTutorResources(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}teacher/resources/${id}`);
  }

  getTutorResource(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}teacher/resource/${id}`);
  }

  addTutorResource(formData: any): Observable<any> {
    const classId = 2;
    const body = '';
    console.log(formData.classId);
    return this.http.post<any>(
      `${this.baseUrl}teacher/class/${classId}/resource`,
      formData
    );
  }

  editTutorResource(formData: any): Observable<any> {
    const classId = 1;
    return this.http.post<any>(
      `${this.baseUrl}teacher/class/${classId}/resource`,
      formData
    );
  }
}
