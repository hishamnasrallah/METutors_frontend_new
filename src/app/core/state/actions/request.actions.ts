import { createAction, props } from '@ngrx/store';

import { IClassroom, ITutor } from '@models';

export const generateTutors = createAction(
  '[Request] Generate Tutors',
  props<{ data: any }>()
);

export const generateTutorsSuccess = createAction(
  '[Request] Generate Tutors Success',
  props<{ tutors: ITutor[] }>()
);

export const generateTutorsFailure = createAction(
  '[Request] Generate Tutors Failure',
  props<{ error: any }>()
);

export const createClass = createAction(
  '[Request] Create Class',
  props<{ data: any }>()
);

export const createClassSuccess = createAction(
  '[Request] Create Class Success',
  props<{ classroom?: IClassroom }>()
);

export const createClassFailure = createAction(
  '[Request] Create Class Failure',
  props<{ error: any }>()
);
