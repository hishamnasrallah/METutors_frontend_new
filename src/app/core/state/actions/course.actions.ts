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
