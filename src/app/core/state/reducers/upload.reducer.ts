import { createReducer, on } from '@ngrx/store';

import * as tutorActions from '../actions/tutor.actions';
import * as uploadActions from '../actions/upload.actions';
import * as tutorModalActions from '@metutor/modules/tutor/state/actions';

export interface State {
  files: any[];
  uploadProgress: any;
  isDeletingFile: boolean;
  isUploadingFile: boolean;
}

export const initialState: State = {
  files: [],
  uploadProgress: null,
  isDeletingFile: false,
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
  on(uploadActions.loadUploadedFiles, (state, { files }) => {
    let finalState = {
      ...state,
    };

    const fileClone = [...finalState.files];

    fileClone.push(files[0]);

    finalState = {
      ...finalState,
      files: fileClone,
    };

    return finalState;
  }),

  // Load upload file progress
  on(uploadActions.loadUploadFileProgress, (state, { uploadProgress }) => ({
    ...state,
    uploadProgress,
  })),

  // Delete file
  on(uploadActions.deleteUploadedFile, (state) => ({
    ...state,
    isDeletingFile: true,
  })),

  on(uploadActions.deleteUploadedFileSuccess, (state, { id }) => {
    const finalState = {
      ...state,
    };

    if (finalState.files && finalState.files.length) {
      finalState.files = finalState.files.filter((file) => file.id !== id);
    }

    return finalState;
  }),

  on(uploadActions.deleteUploadedFileFailure, (state) => ({
    ...state,
    isDeletingFile: false,
  })),

  // Reset Uploaded Files resetUploadedFiles
  on(
    uploadActions.resetUploadedFiles,
    tutorActions.deleteTutorResourceSuccess,
    tutorModalActions.openTutorAddClassResourceModal,
    tutorModalActions.openTutorEditClassResourceModal,
    (state) => ({
      ...state,
      files: [],
    })
  ),

  // Set files
  on(uploadActions.setFiles, (state, { files }) => ({
    ...state,
    files,
  }))
);

export const selectUploadedFiles = (state: State): any => state.files;

export const selectIsUploadingFile = (state: State): boolean =>
  state.isUploadingFile;

export const selectFileUploadingProgress = (state: State): any =>
  state.uploadProgress;

export const selectIsDeletingFile = (state: State): any => state.isDeletingFile;
