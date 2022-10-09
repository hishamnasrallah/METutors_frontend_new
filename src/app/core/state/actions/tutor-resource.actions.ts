import { createAction, props } from '@ngrx/store';

export const loadTutorResources = createAction('[Tutor] Load Tutor Resources');

export const loadTutorResourcesSuccess = createAction(
  '[Tutor Resource] Load Tutor Resources Success',
  props<{ resources: any }>()
);

export const loadTutorResourcesFailure = createAction(
  '[Tutor Resource] Load Tutor Resources Failure',
  props<{ error: any }>()
);

export const loadTutorResource = createAction(
  '[Tutor Resource] Load Tutor Resource',
  props<{ id: number }>()
);

export const loadTutorResourceSuccess = createAction(
  '[Tutor Resource] Load Tutor Resource Success',
  props<{ resource: any }>()
);

export const loadTutorResourceFailure = createAction(
  '[Tutor Resource] Load Tutor Resource Failure',
  props<{ error: any }>()
);

export const addTutorResource = createAction(
  '[Tutor Resource] Add Tutor Resource',
  props<{ body: any }>()
);

export const addTutorResourceSuccess = createAction(
  '[Tutor Resource] Add Tutor Resource Success',
  props<{ resource: any; message: string }>()
);

export const addTutorResourceFailure = createAction(
  '[Tutor Resource] Add Tutor Resource Failure',
  props<{ error: any }>()
);

export const editTutorResource = createAction(
  '[Tutor Resource] Edit Tutor Resource',
  props<{ body: any }>()
);

export const editTutorResourceSuccess = createAction(
  '[Tutor Resource] Edit Tutor Resource Success',
  props<{ resource: any; message: string }>()
);

export const editTutorResourceFailure = createAction(
  '[Tutor Resource] Edit Tutor Resource Failure',
  props<{ error: any }>()
);

export const deleteTutorResource = createAction(
  '[Tutor Resource] Delete Tutor Resource',
  props<{ id: number }>()
);

export const deleteTutorResourceSuccess = createAction(
  '[Tutor Resource] Delete Tutor Resource Success',
  props<{ id: number; message: string }>()
);

export const deleteTutorResourceFailure = createAction(
  '[Tutor Resource] Delete Tutor Resource Failure',
  props<{ error: any }>()
);

export const uploadTutorResourceDocument = createAction(
  '[Tutor Resource] Upload Tutor Resource Document',
  props<{ body: any }>()
);

export const uploadTutorResourceDocumentSuccess = createAction(
  '[Tutor Resource] Upload Tutor Resource Document Success',
  props<{ message: string }>()
);

export const uploadTutorResourceDocumentFailure = createAction(
  '[Tutor Resource] Upload Tutor Resource Document Failure',
  props<{ error: any }>()
);
