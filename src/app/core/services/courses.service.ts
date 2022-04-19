import {
  HttpClient,
  HttpParams,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import camelcaseKeys from 'camelcase-keys';
import { environment } from 'src/environments/environment';
import { IClassroom, ICourse, ICategory, ISyllabus } from '@models';
import { AcademicTutoringTextbook, SORTED_DAYS_WEEK } from 'src/app/config';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  baseUrl = environment.API_URL;

  constructor(private http: HttpClient) {}

  loadCourses(params: any): Observable<any> {
    return this.http.get<{ courses: ICourse[] }>(`${this.baseUrl}courses`, {
      params,
    });
  }

  fetchMainServices(): Observable<any> {
    return this.http.get<{ results: ICategory[] }>(`${this.baseUrl}category`);
  }

  fetchService(id: number): Observable<any> {
    return this.http.get<ICategory>(`${this.baseUrl}category/${id}/`);
  }

  getCourseById(courseId: number): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}courses/course-detail/${courseId}`
    );
  }

  acceptCourse(payload: { courseId: number }): Observable<any> {
    return this.http.post<{ dashboard: any }>(
      `${this.baseUrl}course/accept/${payload.courseId}`,
      {}
    );
  }

  rejectCourse(payload: { reason: string; courseId: number }): Observable<any> {
    return this.http.post<{ dashboard: any }>(
      `${this.baseUrl}course/reject/${payload.courseId}`,
      { reason: payload.reason }
    );
  }

  tutorCancelCourse(body: string, courseId: number): Observable<any> {
    return this.http.post<{ dashboard: any }>(
      `${this.baseUrl}teacher/course/${courseId}/cancel`,
      body
    );
  }

  studentCancelCourse(body: string, courseId: number): Observable<any> {
    return this.http.post<{ dashboard: any }>(
      `${this.baseUrl}student/course/${courseId}/cancel`,
      body
    );
  }

  getClassroomById(id: string): Observable<any> {
    return this.http.get<ICourse>(`${this.baseUrl}batch/${id}/`).pipe(
      map((response) => {
        return new IClassroom(false, response);
      })
    );
  }

  getSyllabusByCourseId(courseId: string): Observable<any> {
    return this.http
      .get<ISyllabus[]>(`${this.baseUrl}syllabus/?batch_id=${courseId}`)
      .pipe(
        map((response) => {
          return response.map((item) => new ISyllabus(false, item));
        })
      );
  }

  fetchClassroomsQuery(query: any): Observable<any> {
    let params = new HttpParams();

    if (query.homePage) {
      params = params.append('home_page', query.homePage);
    }
    if (query.course) {
      params = params.append('course', query.course);
    }
    if (query.status) {
      params = params.append('status', query.status);
    }

    return this.http
      .get<{ count: number; results: IClassroom[] }>(`${this.baseUrl}batch/`, {
        params,
      })
      .pipe(
        map((response) => {
          return {
            count: response.count,
            classrooms: response.results.map(
              (item) => new IClassroom(false, item)
            ),
          };
        })
      );
  }

  fetchCategoryCourses(id: number): Observable<any> {
    return this.http
      .get<{ results: ICourse[] }>(`${this.baseUrl}?category=${id}`)
      .pipe(
        map((response) => {
          return response.results.map((item) => new ICourse(false, item));
        })
      );
  }

  fetchMyClassrooms(): Observable<any> {
    return this.http
      .get<{ results: IClassroom[] }>(`${this.baseUrl}my_classrooms/`)
      .pipe(
        map((response) => {
          return response.results.map((item) => new IClassroom(false, item));
        })
      );
  }

  filterServices(filters: any): Observable<any> {
    let params = new HttpParams();

    if (filters.categoryId) {
      params = params.append('category', filters.categoryId);
    }
    if (filters.key) {
      params = params.append('key', filters.key);
    }
    if (filters.rate) {
      params = params.append('rate', filters.rate);
    }
    if (filters.tags) {
      params = params.append('tags', filters.tags);
    }
    if (filters.startIn) {
      params = params.append('start_in', filters.startIn);
    }
    if (filters.tutoringType) {
      params = params.append('tutoring_type', filters.tutoringType);
    }
    if (filters.sort) {
      params = params.append('sort', filters.sort);
    }
    if (filters.page) {
      params = params.append('page', filters.page);
    }

    return this.http
      .get<{ results: ICourse[]; count: number }>(`${this.baseUrl}`, {
        params,
      })
      .pipe(
        map((response) => {
          return {
            courses: response.results.map((item) => new ICourse(false, item)),
            count: response.count,
          };
        })
      );
  }

  filterClassooms(filters: any): Observable<any> {
    let params = new HttpParams();

    if (filters.startTime) {
      params = params.append('batch_start_time', filters.startTime);
    }

    if (filters.endTime) {
      params = params.append('batch_expected_end_date', filters.endTime);
    }

    if (filters.maxStudents) {
      params = params.append('max_students_in_group', filters.maxStudents);
    }

    if (filters.days) {
      params = params.append('batch_days', (+filters.days - 1).toString());
    }

    if (filters.type) {
      params = params.append('batch_type', filters.type);
    }

    if (filters.startIn) {
      params = params.append('start_in', filters.startIn);
    }

    if (filters.page) {
      params = params.append('page', filters.page);
    }

    if (filters.sort) {
      params = params.append('sort', filters.sort);
    }

    return this.http
      .get<{ results: IClassroom[]; count: number }>(`${this.baseUrl}`, {
        params,
      })
      .pipe(
        map((response) => {
          return {
            classrooms: response.results.map(
              (item) => new IClassroom(false, item)
            ),
            count: response.count,
          };
        })
      );
  }

  calculateEstimatedPrice(subjectId: string): Observable<any> {
    return this.http
      .get<{ estimated_price_per_hour: number }>(
        `${this.baseUrl}estimated-price?subject_id=${subjectId}`
      )
      .pipe(map((response) => response.estimated_price_per_hour))
      .pipe(catchError(this.errorHandler));
  }

  calculateFinalInvoice(classroom: any): Observable<any> {
    const body = {
      subject_id: classroom?.subject,
      classes:
        classroom?.classrooms && classroom?.classrooms.length
          ? classroom?.classrooms.map((clss: any) => ({
              date: clss.date,
              day: clss.day,
              start_time: clss.start_time,
              end_time: clss.end_time,
              duration: clss.duration,
            }))
          : [],
    };

    return this.http
      .post(`${this.baseUrl}final-invoice`, body)
      .pipe(
        map((response) =>
          camelcaseKeys(response, {
            deep: true,
          })
        )
      )
      .pipe(catchError(this.errorHandler));
  }

  createCourse(value: any): Observable<any> {
    const formData = new FormData();

    const weekdays =
      value.days && value.days.length
        ? value.days.map((day: string) => SORTED_DAYS_WEEK.indexOf(day))
        : [];

    if (value.courseProgram) formData.append('program_id', value.courseProgram);
    if (value.courseLevel) formData.append('course_level', value.courseLevel);
    if (value.courseField) formData.append('field_of_study', value.courseField);
    if (value.language) formData.append('language_id', value.language);
    if (value.subject) formData.append('subject_id', value.subject);
    if (value.information) formData.append('book_info', value.information);
    if (value.information === AcademicTutoringTextbook.pdf && value.file)
      formData.append('files', value.file);
    if (value.information === AcademicTutoringTextbook.info) {
      if (value.name) formData.append('book_name', value.name);
      if (value.edition) formData.append('book_edition', value.edition);
      if (value.author) formData.append('book_author', value.author);
    }

    if (value.startDate) formData.append('start_date', value.startDate);
    if (value.endDate) formData.append('end_date', value.endDate);
    if (value.startTime) formData.append('start_time', value.startTime);
    if (value.endTime) formData.append('end_time', value.endTime);
    if (weekdays) formData.append('weekdays', weekdays);
    if (value.hours) formData.append('total_hours', value.hours);
    if (value.totalPrice) formData.append('total_price', value.totalPrice);
    if (value.classes) formData.append('total_classes', value.classes);
    if (value.courseCountry) formData.append('country_id', value.courseCountry);
    if (value.type) formData.append('class_type', value.type);

    if (value.classrooms && value.classrooms.length)
      formData.append('classes', JSON.stringify(value.classrooms));

    if (value.tutor) formData.append('teacher_id', value.tutor?.id);

    return this.http.post<{ class: { id: number } }>(
      `${this.baseUrl}create-class`,
      formData
    );
  }

  customizeClassroom(value: any): Observable<any> {
    const formData = new FormData();

    if (value.courseId) formData.append('course_id', value.courseId);
    if (value.courseName) formData.append('name', value.courseName);
    formData.append('tutoring_preferred_language', 'null');

    if (value.startDate) formData.append('batch_start_date', value.startDate);
    if (value.endDate)
      formData.append('batch_expected_end_date', value.endDate);
    if (value.days) formData.append('batch_days', value.days);
    if (value.startTime) formData.append('batch_start_time', value.startTime);
    if (value.endTime) formData.append('batch_end_time', value.endTime);
    if (value.hours) formData.append('total_hours', value.hours);
    if (value.classes) formData.append('total_classes', value.classes);
    if (value.type) formData.append('batch_type', value.type);

    if (value.classrooms && value.classrooms.length)
      formData.append('classes', JSON.stringify(value.classrooms));

    if (value.tutor) formData.append('tutor', value.tutor);

    return this.http.post<{ result: { id: number } }>(
      `${this.baseUrl}customize_exist_course/`,
      formData
    );
  }

  sendCourseFeedback(value: any): Observable<any> {
    return this.http.post(
      `${this.baseUrl}batch/course/rate/?batch_id=${value?.classroomId}`,
      {
        rate: value?.rate,
        feedback: value?.feedback,
      }
    );
  }

  _fetchCustomizeExistCoursePrice(courseId: number): Observable<any> {
    return this.http
      .get<any>(
        `${this.baseUrl}customize_exist_course/estimated_price/?course_id=${courseId}`
      )
      .pipe(
        map((response) => {
          return {
            oneOnOne: response?.one_on_one_price_per_hour,
            groupStudy: response?.group_price_per_hour,
          };
        })
      )
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }
}
