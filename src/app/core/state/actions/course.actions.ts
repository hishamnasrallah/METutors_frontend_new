import { createAction, props } from '@ngrx/store';

import { ICourse } from '@models';

export const loadCourses = createAction('[Tutor] Load Courses');

export const loadCoursesSuccess = createAction(
  '[Tutor] Load Courses Success',
  props<{ courses: ICourse[] }>()
);

export const loadCoursesFailure = createAction(
  '[Tutor] Load Courses Failure',
  props<{ error: any }>()
);

export const loadCoursesEnded = createAction('[Tutor] Load Courses Ended');
