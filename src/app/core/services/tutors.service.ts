import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';

import { ITutor, SubmitInterviewInput } from '@models';
import { isNil, omitBy } from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class TutorsService {
  baseUrl = environment.API_URL;

  constructor(private http: HttpClient) {}

  sendTeacherAccount(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}teacher/complete-account`, data);
  }

  updateTeacherProfile(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}teacher/profile`, data);
  }

  changeCover(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('cover_img', file);

    return this.http.post<any>(`${this.baseUrl}change-cover`, formData);
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
      .get<{ user: ITutor }>(`${this.baseUrl}teacher/${id}/profile`)
      .pipe(map((response) => new ITutor(false, response.user)));
  }

  getProfileTutor(): Observable<any> {
    return this.http
      .get<{ user: ITutor }>(`${this.baseUrl}teacher/profile`)
      .pipe(
        map((response) => {
          return new ITutor(false, response.user);
        })
      );
  }

  getTutors(): Observable<any> {
    return this.http
      .get<{
        teachers: ITutor[];
        all_teachers: number;
        active_teachers: number;
        pending_teachers: number;
        inactive_teachers: number;
        suspended_teachers: number;
      }>(`${this.baseUrl}admin/teachers`)
      .pipe(
        map((response) => {
          return {
            tutors: response.teachers.map((tutor) => new ITutor(false, tutor)),
            tutorsCounts: {
              all: response?.all_teachers,
              active: response?.active_teachers,
              pending: response?.pending_teachers,
              inactive: response?.inactive_teachers,
              suspended: response?.suspended_teachers,
            },
          };
        })
      );
  }

  getAvailableTutors(id: number): Observable<any> {
    return this.http
      .get<{
        filtered_teacher: ITutor[];
      }>(`${this.baseUrl}available-teachers?course_id=${id}`)
      .pipe(
        map((response) =>
          response.filtered_teacher.map((tutor) => new ITutor(false, tutor))
        )
      );
  }

  getCurrentTutors(): Observable<any> {
    return this.http
      .get<{
        teachers: ITutor[];
        total: number;
        available: number;
        engaged: number;
        inactive: number;
      }>(`${this.baseUrl}admin/current-teachers`)
      .pipe(
        map((response) => ({
          tutors: response.teachers.map((tutor) => new ITutor(false, tutor)),
          tutorsCounts: {
            totalCurrent: response?.total,
            availableCurrent: response?.available,
            engagedCurrent: response?.engaged,
            inactiveCurrent: response?.inactive,
          },
        }))
      );
  }

  getPendingTutors(): Observable<any> {
    return this.http
      .get<{
        teachers: ITutor[];
      }>(`${this.baseUrl}admin/pending-teachers`)
      .pipe(
        map((response) =>
          response.teachers.map((tutor) => new ITutor(false, tutor))
        )
      );
  }

  getSuspendedTutors(): Observable<any> {
    return this.http
      .get<{
        teachers: ITutor[];
      }>(`${this.baseUrl}admin/rejected-teachers`)
      .pipe(
        map((response) =>
          response.teachers.map((tutor) => new ITutor(false, tutor))
        )
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

  addTutorResource(body: any): Observable<any> {
    const { classId, resourceId, ..._body } = body;

    return this.http.post<any>(
      `${this.baseUrl}teacher/class/${classId}/resource`,
      _body
    );
  }

  editTutorResource(body: any): Observable<any> {
    const { classId, resourceId, ..._body } = body;

    return this.http.post<any>(
      `${this.baseUrl}teacher/resource/update/${resourceId}`,
      _body
    );
  }

  deleteTutorResource(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}teacher/resource/${id}`);
  }

  // Tutor assignments
  getTutorAssignments(id: number | string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}teacher/assignments/${id}`);
  }

  getTutorAssignmentAssignees(id: number | string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}teacher/course/${id}/assignees`);
  }

  getTutorAssignment(id: number | string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}teacher/assignment/${id}`);
  }

  tutorAddAssignment(body: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}teacher/assignment`, body);
  }

  tutorEditAssignment(body: any): Observable<any> {
    const { id, ..._body } = body;
    return this.http.post<any>(
      `${this.baseUrl}teacher/assignment/update/${id}`,
      _body
    );
  }

  tutorDeleteAssignment(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}teacher/assignment/${id}`);
  }

  tutorRejectAssignment(body: any): Observable<any> {
    return this.http.post<any>(
      `${this.baseUrl}teacher/assignment/${body.assignment_id}/reject`,
      body
    );
  }

  tutorAcceptAssignment(body: any): Observable<any> {
    const { assignment_id, ..._body } = body;
    return this.http.post<any>(
      `${this.baseUrl}teacher/assignment/${assignment_id}/accept`,
      _body
    );
  }

  getStudentAssignmentDetail(id: number, userId: number): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}teacher/assignment/${id}/user/${userId}`
    );
  }

  // Attendance
  getTutorAttendance(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}teacher/course/${id}/attendance`);
  }

  // Feedback
  getTutorFeedbackOptions(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}teacher/feedback/params`);
  }

  getTutorFeedbackPlatformOptions(): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}teacher/feedback/platform/params`
    );
  }

  tutorSubmitFeedback(payload: any, course_id: number): Observable<any> {
    const body = {
      ...payload,
      course_id,
    };

    return this.http.post<any>(`${this.baseUrl}teacher/feedback`, body);
  }

  tutorSubmitInterview(payload: SubmitInterviewInput): Observable<any> {
    const body = {
      date_for_interview: payload.interviewDate,
      time_for_interview: payload.interviewTime,
      addtional_comments: payload?.notes,
    };

    return this.http.post<any>(`${this.baseUrl}interview-request`, body);
  }

  tutorSubmitPlatformFeedback(
    payload: any,
    course_id: number
  ): Observable<any> {
    const body = {
      ...payload,
      course_id,
    };

    return this.http.post<any>(
      `${this.baseUrl}teacher/feedback/platform`,
      body
    );
  }

  tutorRescheduleClass(body: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}teacher/class/reschedule`, body);
  }
}
