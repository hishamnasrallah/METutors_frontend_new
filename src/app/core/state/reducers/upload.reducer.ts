import { createReducer, on } from '@ngrx/store';

import * as uploadActions from '../actions/upload.actions';
import * as tutorResourceActions from '../actions/tutor-resource.actions';
import * as tutorModalActions from '@metutor/modules/tutor/state/actions';

export interface State {
  files: any[];
  uploadProgress: any;
  isDeletingFile: boolean;
  isUploadingFile: boolean;
  isUploadingCover: boolean;
  isUploadingAvatar: boolean;
}

export const initialState: State = {
  files: [],
  uploadProgress: null,
  isDeletingFile: false,
  isUploadingFile: false,
  isUploadingCover: false,
  isUploadingAvatar: false,
};

export const reducer = createReducer(
  initialState,
  on(uploadActions.uploadFile, (state, { uploadType }) => {
    const finalState = {
      ...state,
      isUploadingFile: true,
    };

    switch (uploadType) {
      case 'avatar':
        finalState.isUploadingAvatar = true;
        break;
      case 'cover':
        finalState.isUploadingCover = true;
        break;
    }

    return finalState;
  }),

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

  on(uploadActions.resetUploadFileProgress, (state) => ({
    ...state,
    uploadProgress: null,
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
    tutorResourceActions.deleteTutorResourceSuccess,
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
  })),

  // upload avatar
  on(uploadActions.changeAvatar, (state) => ({
    ...state,
    isUploadingAvatar: true,
  })),

  on(uploadActions.changeAvatarSuccess, (state) => ({
    ...state,
    isUploadingAvatar: false,
  })),

  on(uploadActions.changeAvatarFailure, (state) => ({
    ...state,
    isUploadingAvatar: false,
  })),

  // upload cover
  on(uploadActions.changeCover, (state) => ({
    ...state,
    isUploadingCover: true,
  })),

  on(uploadActions.changeCoverSuccess, (state) => ({
    ...state,
    isUploadingCover: false,
  })),

  on(uploadActions.changeCoverFailure, (state) => ({
    ...state,
    isUploadingCover: false,
  }))
);

export const selectUploadedFiles = (state: State): any => state.files;

export const selectIsUploadingFile = (state: State): boolean =>
  state.isUploadingFile;

export const selectFileUploadingProgress = (state: State): any =>
  state.uploadProgress;

export const selectIsDeletingFile = (state: State): any => state.isDeletingFile;
export const selectIsUploadingAvatar = (state: State): any =>
  state.isUploadingAvatar;

export const selectIsUploadingCover = (state: State): boolean =>
  state.isUploadingCover;
