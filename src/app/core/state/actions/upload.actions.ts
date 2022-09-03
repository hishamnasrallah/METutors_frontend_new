import { createAction, props } from '@ngrx/store';
import { IUser } from '@models';

export const setFiles = createAction(
  '[Upload Service] Set Files',
  props<{ files: any }>()
);

export const uploadFile = createAction(
  '[Upload Service] Upload File',
  props<{ file: any; uploadType?: string }>()
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

export const resetUploadFileProgress = createAction(
  '[Upload Service] Reset Upload File Progress'
);

export const resetUploadedFiles = createAction(
  '[Upload Service] Reset Uploaded Files'
);

export const deleteUploadedFile = createAction(
  '[Upload Service] Delete Uploaded File',
  props<{ id: number }>()
);

export const deleteUploadedFileSuccess = createAction(
  '[Upload Service] Delete Uploaded File Success',
  props<{ id: number; message?: any }>()
);

export const deleteUploadedFileFailure = createAction(
  '[Upload Service] Delete Uploaded File Failure',
  props<{ error?: string }>()
);

export const changeAvatar = createAction(
  '[User] Change Avatar',
  props<{ file: File }>()
);

export const changeAvatarSuccess = createAction(
  '[User] Change Avatar Success',
  props<{ message: string; token: string; avatar: string; user: IUser }>()
);

export const changeAvatarFailure = createAction(
  '[User] Change Avatar Failure',
  props<{ error: any }>()
);

export const changeCover = createAction(
  '[User] Change Cover',
  props<{ file: File }>()
);

export const changeCoverSuccess = createAction(
  '[User] Change Cover Success',
  props<{ message: string; cover: string }>()
);

export const changeCoverFailure = createAction(
  '[User] Change Cover Failure',
  props<{ error: any }>()
);
