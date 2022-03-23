import { createReducer, on } from '@ngrx/store';

import * as fromCore from '@metutor/core/state';
import * as studentModalActions from '../actions/student-modal.actions';

export interface State {
  showAttendanceModal: boolean;
  showSendFeedbackModal: boolean;
}

export const initialState: State = {
  showAttendanceModal: false,
  showSendFeedbackModal: false,
};

export const reducer = createReducer(
  initialState,

  on(studentModalActions.openStudentAttendanceModal, (state) => ({
    ...state,
    showAttendanceModal: true,
  })),

  on(studentModalActions.closeStudentAttendanceModal, (state) => ({
    ...state,
    showAttendanceModal: false,
  })),

  on(studentModalActions.openStudentSendFeedbackModal, (state) => ({
    ...state,
    showSendFeedbackModal: true,
  })),

  on(studentModalActions.closeStudentSendFeedbackModal, (state) => ({
    ...state,
    showSendFeedbackModal: false,
  }))
);

// student modal selectors
export const selectAttendanceModal = (state: State): boolean =>
  state.showAttendanceModal;

export const selectSendFeedbackModal = (state: State): boolean =>
  state.showSendFeedbackModal;
