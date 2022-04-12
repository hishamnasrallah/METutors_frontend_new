import { createAction, props } from '@ngrx/store';

import { IInterview } from '@models';

export const loadInterviews = createAction('[Interview] Load Interviews');

export const loadInterviewsSuccess = createAction(
  '[Interview] Load Interviews Success',
  props<{ interviews: IInterview[] }>()
);

export const loadInterviewsFailure = createAction(
  '[Interview] Load Interviews Failure',
  props<{ error: any }>()
);

export const loadInterviewsEnded = createAction(
  '[Interview] Load Interviews Ended'
);

export const loadInterview = createAction(
  '[Interview] Load Interview',
  props<{ id?: string }>()
);

export const loadInterviewSuccess = createAction(
  '[Interview] Load Interview Success',
  props<{ interview: IInterview }>()
);

export const loadInterviewFailure = createAction(
  '[Interview] Load Interview Failure',
  props<{ error: any }>()
);

export const loadInterviewEnded = createAction(
  '[Interview] Load Interview Ended'
);

export const acceptInterviewRequest = createAction(
  '[Interview] Accept Interview Request',
  props<{ id: number; body: any }>()
);

export const acceptInterviewRequestSuccess = createAction(
  '[Interview] Accept Interview Request Success',
  props<{ message: string }>()
);

export const acceptInterviewRequestFailure = createAction(
  '[Interview] Accept Interview Request Failure',
  props<{ error: any }>()
);

export const declineInterviewRequest = createAction(
  '[Interview] Decline Interview Request',
  props<{ id: number; body: any }>()
);

export const declineInterviewRequestSuccess = createAction(
  '[Interview] Decline Interview Request Success',
  props<{ message: string }>()
);

export const declineInterviewRequestFailure = createAction(
  '[Interview] Decline Interview Request Failure',
  props<{ error: any }>()
);
