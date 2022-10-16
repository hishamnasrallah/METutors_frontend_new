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

export const cancelFileUpload = createAction(
  '[Upload Service] Cancel File Upload'
);

export const cancelUploadSuccess = createAction(
  '[Upload Service] Cancel Upload Success'
);

export const changeAvatar = createAction(
  '[Upload Service] Change Avatar',
  props<{ file: File }>()
);

export const changeAvatarSuccess = createAction(
  '[Upload Service] Change Avatar Success',
  props<{ message: string; token: string; avatar: string; user: IUser }>()
);

export const changeAvatarFailure = createAction(
  '[Upload Service] Change Avatar Failure',
  props<{ error: any }>()
);

export const changeCover = createAction(
  '[Upload Service] Change Cover',
  props<{ file: File }>()
);

export const changeCoverSuccess = createAction(
  '[Upload Service] Change Cover Success',
  props<{ message: string; cover: string }>()
);

export const changeCoverFailure = createAction(
  '[Upload Service] Change Cover Failure',
  props<{ error: any }>()
);

export const changeVideo = createAction(
  '[Upload Service] Change Video',
  props<{ file: File }>()
);

export const changeVideoSuccess = createAction(
  '[Upload Service] Change Video Success',
  props<{ message: string; video: string }>()
);

export const changeVideoFailure = createAction(
  '[Upload Service] Change Video Failure',
  props<{ error: any }>()
);
