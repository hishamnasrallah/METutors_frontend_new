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
