import { createAction, props } from '@ngrx/store';

import { ICourse } from '@models';

export const loadCourses = createAction(
  '[Tutor] Load Courses',
  props<{ params?: any }>()
);

export const loadCoursesSuccess = createAction(
  '[Tutor] Load Courses Success',
  props<{ courses: any }>()
);

export const loadCoursesFailure = createAction(
  '[Tutor] Load Courses Failure',
  props<{ error: any }>()
);

export const loadCoursesEnded = createAction('[Tutor] Load Courses Ended');

export const loadCourseById = createAction('[Tutor] Load Course By Id');

export const loadCourseByIdSuccess = createAction(
  '[Tutor] Load Course By Id Success',
  props<{ course: ICourse }>()
);

export const loadCourseByIdFailure = createAction(
  '[Tutor] Load Course By Id Failure',
  props<{ error: any }>()
);

export const exploreCourses = createAction('[General] Explore Courses');

export const exploreCoursesSuccess = createAction(
  '[General] Explore Courses Success',
  props<{ exploredCourses: any }>()
);

export const exploreCoursesFailure = createAction(
  '[General] Explore Courses Failure',
  props<{ error: any }>()
);

export const tutorAcceptCourse = createAction(
  '[Tutor] Tutor Accept Course',
  props<{ courseId: number }>()
);

export const tutorAcceptCourseSuccess = createAction(
  '[Tutor] Tutor Accept Course Success',
  props<{ courseId: number; message: string }>()
);

export const tutorAcceptCourseFailure = createAction(
  '[Tutor] Tutor Accept Course Failure',
  props<{ error: any }>()
);

export const tutorRejectCourse = createAction(
  '[Tutor] Tutor Reject Course',
  props<{ reason: string; courseId: number }>()
);

export const tutorRejectCourseSuccess = createAction(
  '[Tutor] Tutor Reject Course Success',
  props<{ courseId: number; message: string }>()
);

export const tutorRejectCourseFailure = createAction(
  '[Tutor] Tutor Reject Course Failure',
  props<{ error: any }>()
);

export const tutorCancelCourse = createAction(
  '[Tutor] Tutor Cancel Course',
  props<{ reason: string }>()
);

export const tutorCancelCourseSuccess = createAction(
  '[Tutor] Tutor Cancel Course Success',
  props<{ message: string }>()
);

export const tutorCancelCourseFailure = createAction(
  '[Tutor] Tutor Cancel Course Failure',
  props<{ error: any }>()
);

//============STUDENT COURSE ACTIONS ===================
export const studentRefundCourse = createAction(
  '[Student] Student Refund Course',
  props<{ refundType: string }>()
);

export const studentRefundCourseSuccess = createAction(
  '[Student] Student Refund Course Success',
  props<{ courseRefund: any }>()
);

export const studentRefundCourseFailure = createAction(
  '[Student] Student Refund Course Failure',
  props<{ error: any }>()
);

export const studentRefundCourseClasses = createAction(
  '[Student] Student Refund Course Classes',
  props<{ params: any }>()
);

export const studentRefundCourseClassesSuccess = createAction(
  '[Student] Student Refund Course Classes Success',
  props<{ courseRefund: any }>()
);

export const studentRefundCourseClassesFailure = createAction(
  '[Student] Student Refund Course Classes Failure',
  props<{ error: any }>()
);

export const studentCancelCourse = createAction(
  '[Student] Student Cancel Course',
  props<{ body: any }>()
);

export const studentCancelCourseSuccess = createAction(
  '[Student] Student Cancel Course Success'
);

export const studentCancelCourseFailure = createAction(
  '[Student] Student Cancel Course Failure',
  props<{ error: any }>()
);

export const studentRequestAdminAssignTutor = createAction(
  '[Student] Request Admin Assign Tutor'
);

export const studentRequestAdminAssignTutorSuccess = createAction(
  '[Student] Request Admin Assign Tutor Success',
  props<{ message: string }>()
);

export const studentRequestAdminAssignTutorFailure = createAction(
  '[Student] Request Admin Assign Tutor Failure',
  props<{ error: any }>()
);
