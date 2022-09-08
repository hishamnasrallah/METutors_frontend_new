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

  updateTeacherPreferences(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}teacher/preferences`, data);
  }

  changeTutorStatus(
    tutorId: number,
    status: string,
    reason: string
  ): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}admin/teacher-status`, {
      status: status,
      reason: reason,
      teacher_id: tutorId,
    });
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

  getAdminTutorById(id: number | string): Observable<any> {
    return this.http
      .get<{ teacher_profile: ITutor }>(`${this.baseUrl}admin/teacher/${id}`)
      .pipe(map((response) => new ITutor(false, response.teacher_profile)));
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

  getTutors(page: number, search: string): Observable<any> {
    return this.http
      .get<{
        to: number;
        total: number;
        all_teachers: number;
        active_teachers: number;
        pending_teachers: number;
        inactive_teachers: number;
        suspended_teachers: number;
        teachers: { to: number; total: number; data: ITutor[] };
      }>(`${this.baseUrl}admin/teachers`, { params: { page, search } })
      .pipe(
        map((response) => {
          return {
            tutors: response.teachers.data.map(
              (tutor) => new ITutor(false, tutor)
            ),
            tutorsCounts: {
              all: response?.all_teachers,
              to: response?.teachers?.to || 0,
              total: response?.teachers?.total,
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

  getCurrentTutors(params: any): Observable<any> {
    return this.http
      .get<{
        teachers: { total: number; data: ITutor[] };
        total: number;
        available: number;
        engaged: number;
        inactive: number;
      }>(`${this.baseUrl}admin/current-teachers`, {
        params,
      })
      .pipe(
        map((response) => ({
          tutors: response.teachers.data.map(
            (tutor) => new ITutor(false, tutor)
          ),
          tutorsCounts: {
            totalCurrent: response?.total,
            total: response?.teachers?.total,
            engagedCurrent: response?.engaged,
            inactiveCurrent: response?.inactive,
            availableCurrent: response?.available,
          },
        }))
      );
  }

  getPendingTutors(params: any): Observable<any> {
    return this.http
      .get<{
        rejected_teachers: { total: number; data: ITutor[] };
        pending_teachers: { total: number; data: ITutor[] };
        pending_teachers_count: number;
        rejected_teachers_count: number;
      }>(`${this.baseUrl}admin/pending-teachers`, {
        params,
      })
      .pipe(
        map((response) => ({
          pendingTutors: response.pending_teachers.data.map(
            (tutor) => new ITutor(false, tutor)
          ),
          rejectedTutors: response.rejected_teachers.data.map(
            (tutor) => new ITutor(false, tutor)
          ),
          tutorsCounts: {
            pendingCount: response?.pending_teachers_count,
            totalPending: response?.pending_teachers?.total,
            totalRejected: response?.pending_teachers?.total,
            rejectedCount: response?.rejected_teachers_count,
          },
        }))
      );
  }

  getSuspendedTutors(params: any): Observable<any> {
    return this.http
      .get<{
        teachers: { total: 10; data: ITutor[] };
      }>(`${this.baseUrl}admin/suspended-teachers`, { params })
      .pipe(
        map((response) => ({
          tutorsCounts: {
            total: response.teachers.total,
          },
          suspendedTutors: response.teachers.data.map(
            (tutor) => new ITutor(false, tutor)
          ),
        }))
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
      .get<{ available_teachers: ITutor[]; suggested_teachers: ITutor[] }>(
        `${this.baseUrl}filtered-teacher`,
        {
          params,
        }
      )
      .pipe(
        map((response) => {
          return {
            suggestedTutors: response.suggested_teachers.map(
              (item) => new ITutor(false, item)
            ),
            availableTutors: response.available_teachers.map(
              (item) => new ITutor(false, item)
            ),
          };
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

  loadFeaturedTutors(): Observable<any> {
    return this.http
      .get<{ featured_teachers: ITutor[] }>(
        `${this.baseUrl}admin/featured-teachers`
      )
      .pipe(
        map((response) =>
          response.featured_teachers.map((tutor) => new ITutor(false, tutor))
        )
      );
  }

  loadSubjectFeaturedTutors(id: number): Observable<any> {
    return this.http
      .get<{ featured_teachers: any[] }>(
        `${this.baseUrl}admin/subject/${id}/featured-teacher`
      )
      .pipe(
        map((response) =>
          response.featured_teachers.map((tutor) => ({
            ...omitBy(new ITutor(false, tutor), isNil),
            ...omitBy(new ITutor(false, tutor?.teacher), isNil),
          }))
        )
      );
  }

  loadKudosPoints(): Observable<any> {
    return this.http
      .get<any>(`${this.baseUrl}teacher/kudos-points`)
      .pipe(map((result) => result.points_detail));
  }
}
