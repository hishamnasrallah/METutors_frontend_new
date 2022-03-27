import { createAction, props } from '@ngrx/store';

export const uploadFile = createAction(
  '[Upload Service] Upload File',
  props<{ file: any }>()
);

export const uploadFileSuccess = createAction(
  '[Upload Service] Upload File Success',
  props<{ files: any; message?: any }>()
);

export const uploadFileFailure = createAction(
  '[Upload Service] Upload File Failure',
  props<{ error?: string }>()
);

export const loadUploadedFiles = createAction(
  '[Upload Service] Load Files',
  props<{ files: any }>()
);

export const loadUploadFileProgress = createAction(
  '[Upload Service] Load Upload File Progress',
  props<{ uploadProgress: any }>()
);

export const resetUploadedFiles = createAction(
  '[Upload Service] Reset Uploaded Files'
);
