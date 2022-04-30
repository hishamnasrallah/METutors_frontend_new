import { createReducer, on } from '@ngrx/store';

import * as fromCore from '@metutor/core/state';
import * as studentModalActions from '../actions/student-modal.actions';

export interface State {
  params: any;
  showAddCourseModal: boolean;
  showAttendanceModal: boolean;
  showMakeupClassModal: boolean;
  showCancelCourseModal: boolean;
  showSendFeedbackModal: boolean;
  showViewResourceModal: boolean;
  showViewAssignmentModal: boolean;
  showSubmitAssignmentModal: boolean;
  showViewSubmittedAssignmentModal: boolean;
}

export const initialState: State = {
  params: null,
  showAddCourseModal: false,
  showAttendanceModal: false,
  showMakeupClassModal: false,
  showCancelCourseModal: false,
  showSendFeedbackModal: false,
  showViewResourceModal: false,
  showViewAssignmentModal: false,
  showSubmitAssignmentModal: false,
  showViewSubmittedAssignmentModal: false,
};

export const reducer = createReducer(
  initialState,

  on(studentModalActions.setStudentStateParams, (state, { params }) => ({
    ...state,
    params,
  })),

  on(studentModalActions.openStudentAttendanceModal, (state) => ({
    ...state,
    showAttendanceModal: true,
  })),

  on(studentModalActions.closeStudentAttendanceModal, (state) => ({
    ...state,
    showAttendanceModal: false,
  })),

  on(
    studentModalActions.openStudentSendFeedbackModal,
    studentModalActions.openStudentSendPlatformFeedbackModal,
    (state) => ({
      ...state,
      showSendFeedbackModal: true,
    })
  ),

  on(
    fromCore.studentSubmitFeedbackSuccess,
    fromCore.studentSubmitPlatformFeedbackSuccess,
    studentModalActions.closeStudentSendFeedbackModal,
    studentModalActions.closeStudentSendPlatformFeedbackModal,
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
  })),

  on(studentModalActions.openCancelCourseModal, (state) => ({
    ...state,
    showCancelCourseModal: true,
  })),

  on(
    fromCore.studentCancelCourseSuccess,
    studentModalActions.closeCancelCourseModal,
    (state) => ({
      ...state,
      showCancelCourseModal: false,
    })
  ),

  on(studentModalActions.openAddCourseModal, (state) => ({
    ...state,
    showAddCourseModal: true,
  })),

  on(
    fromCore.studentAddNewClassSuccess,
    studentModalActions.closeAddCourseModal,
    (state) => ({
      ...state,
      showAddCourseModal: false,
    })
  ),

  on(studentModalActions.openMakeupClassModal, (state) => ({
    ...state,
    showMakeupClassModal: true,
  })),

  on(
    fromCore.studentMakeupClassSuccess,
    studentModalActions.closeMakeupClassModal,
    (state) => ({
      ...state,
      showMakeupClassModal: false,
    })
  )
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

export const selectCancelCourseModal = (state: State): boolean =>
  state.showCancelCourseModal;

export const selectAddCourseModal = (state: State): boolean =>
  state.showAddCourseModal;

export const selectMakeupClassModal = (state: State): boolean =>
  state.showMakeupClassModal;

export const selectStudentStateParams = (state: State): any => state.params;
