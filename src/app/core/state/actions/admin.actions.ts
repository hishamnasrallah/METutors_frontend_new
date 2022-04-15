import { createAction, props } from '@ngrx/store';

export const loadAdminDocuments = createAction('[Admin] Load Admin Documents');

export const loadAdminDocumentsSuccess = createAction(
  '[Admin] Load Admin Documents Success',
  props<{ documents: any }>()
);

export const loadAdminDocumentsFailure = createAction(
  '[Admin] Load Admin Documents Failure',
  props<{ error: any }>()
);

export const loadAdminDocumentsEnded = createAction(
  '[Admin] Load Admin Documents Ended'
);
