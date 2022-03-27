import { createReducer, on } from '@ngrx/store';

import * as uploadActions from '../actions/upload.actions';

export interface State {
  files: any;
  uploadProgress: any;
  isUploadingFile: boolean;
}

export const initialState: State = {
  files: null,
  uploadProgress: null,
  isUploadingFile: false,
};

export const reducer = createReducer(
  initialState,
  on(uploadActions.uploadFile, (state) => ({
    ...state,
    isUploadingFile: true,
  })),

  on(uploadActions.uploadFileSuccess, (state, { files }) => ({
    ...state,
    files,
    isUploadingFile: false,
  })),

  on(uploadActions.uploadFileFailure, (state) => ({
    ...state,
    isUploadingFile: false,
  })),

  // Load uploaded files
  on(uploadActions.loadUploadedFiles, (state, { files }) => ({
    ...state,
    files,
  })),

  // Load upload file progress
  on(uploadActions.loadUploadFileProgress, (state, { uploadProgress }) => ({
    ...state,
    uploadProgress,
  })),

  // Reset Uploaded Files resetUploadedFiles
  on(uploadActions.resetUploadedFiles, (state) => ({
    ...state,
    files: undefined,
  }))
);

export const selectUploadedFiles = (state: State): any => state.files;

export const selectIsUploadingFile = (state: State): boolean =>
  state.isUploadingFile;

export const selectFileUploadingProgress = (state: State): any =>
  state.uploadProgress;
