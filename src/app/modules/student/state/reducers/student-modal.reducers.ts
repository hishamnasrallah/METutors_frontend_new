import { createReducer, on } from '@ngrx/store';

import * as fromCore from '@metutor/core/state';
import * as studentModalActions from '../actions/student-modal.actions';

export interface State {
  showAttendanceModal: boolean;
  showSendFeedbackModal: boolean;
  showViewResourceModal: boolean;
  showViewAssignmentModal: boolean;
  showSubmitAssignmentModal: boolean;
  showViewSubmittedAssignmentModal: boolean;
}

export const initialState: State = {
  showAttendanceModal: false,
  showSendFeedbackModal: false,
  showViewResourceModal: false,
  showViewAssignmentModal: false,
  showSubmitAssignmentModal: false,
  showViewSubmittedAssignmentModal: false,
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

  on(
    fromCore.studentSubmitFeedbackSuccess,
    studentModalActions.closeStudentSendFeedbackModal,
    (state) => ({
      ...state,
      showSendFeedbackModal: false,
    })
  ),

  on(studentModalActions.openStudentViewResourceModal, (state) => ({
    ...state,
    showViewResourceModal: true,
  })),

  on(studentModalActions.closeStudentViewResourceModal, (state) => ({
    ...state,
    showViewResourceModal: false,
  })),

  on(studentModalActions.openStudentViewAssignmentModal, (state) => ({
    ...state,
    showViewAssignmentModal: true,
  })),

  on(studentModalActions.closeStudentViewAssignmentModal, (state) => ({
    ...state,
    showViewAssignmentModal: false,
  })),

  on(studentModalActions.openSubmitAssignmentModal, (state) => ({
    ...state,
    showSubmitAssignmentModal: true,
  })),

  on(studentModalActions.closeSubmitAssignmentModal, (state) => ({
    ...state,
    showSubmitAssignmentModal: false,
  })),

  on(fromCore.studentSubmitAssignmentSuccess, (state) => ({
    ...state,
    showViewAssignmentModal: true,
    showSubmitAssignmentModal: false,
  })),

  on(studentModalActions.openViewSubmittedAssignmentModal, (state) => ({
    ...state,
    showViewAssignmentModal: false,
    showViewSubmittedAssignmentModal: true,
  })),

  on(studentModalActions.closeViewSubmittedAssignmentModal, (state) => ({
    ...state,
    showViewSubmittedAssignmentModal: false,
  }))
);

// student modal selectors
export const selectAttendanceModal = (state: State): boolean =>
  state.showAttendanceModal;

export const selectSendFeedbackModal = (state: State): boolean =>
  state.showSendFeedbackModal;

export const selectViewResourceModal = (state: State): boolean =>
  state.showViewResourceModal;

export const selectViewAssignmentModal = (state: State): boolean =>
  state.showViewAssignmentModal;

export const selectSubmitAssignmentModal = (state: State): boolean =>
  state.showSubmitAssignmentModal;

export const selectViewSubmittedAssignmentModal = (state: State): boolean =>
  state.showViewSubmittedAssignmentModal;
