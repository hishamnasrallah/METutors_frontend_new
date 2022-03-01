import { createAction, props } from '@ngrx/store';

export const loadTutors = createAction(
  '[Tutor] Load Tutors'
);

export const loadTutorsSuccess = createAction(
  '[Tutor] Load Tutors Success',
  props<{ tutors: any }>()
);

export const loadTutorsFailure = createAction(
  '[Tutor] Load Tutors Failure',
  props<{ error: any }>()
);
