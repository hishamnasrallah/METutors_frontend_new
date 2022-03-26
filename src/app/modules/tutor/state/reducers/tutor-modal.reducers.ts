import { createReducer, on } from '@ngrx/store';

import * as fromCore from '@metutor/core/state';
import * as tutorModalActions from '../actions/tutor-modal.actions';

export interface State {
  showAddTopicModal: boolean;
  showRejectCourseModal: boolean;
  showCancelCourseModal: boolean;
  showSendFeedbackModal: boolean;
  showAddAssignmentModal: boolean;
  showCourseAttendanceModal: boolean;
  showAddClassResourceModal: boolean;
  showAssignmentDetailsModal: boolean;
}

export const initialState: State = {
  showAddTopicModal: false,
  showRejectCourseModal: false,
  showCancelCourseModal: false,
  showSendFeedbackModal: false,
  showAddAssignmentModal: false,
  showCourseAttendanceModal: false,
  showAddClassResourceModal: false,
  showAssignmentDetailsModal: false,
};

export const reducer = createReducer(
  initialState,

  on(tutorModalActions.openTutorRejectCourseModal, (state) => ({
    ...state,
    showRejectCourseModal: true,
  })),

  on(
    fromCore.tutorRejectCourseSuccess,
    tutorModalActions.closeTutorRejectCourseModal,
    (state) => ({
      ...state,
      showRejectCourseModal: false,
    })
  ),

  on(tutorModalActions.openTutorCancelCourseModal, (state) => ({
    ...state,
    showCancelCourseModal: true,
  })),

  on(tutorModalActions.closeTutorCancelCourseModal, (state) => ({
    ...state,
    showCancelCourseModal: false,
  })),

  on(tutorModalActions.openTutorSendFeedbackModal, (state) => ({
    ...state,
    showSendFeedbackModal: true,
  })),

  on(tutorModalActions.closeTutorSendFeedbackModal, (state) => ({
    ...state,
    showSendFeedbackModal: false,
  })),

  on(tutorModalActions.openTutorCourseAttendanceModal, (state) => ({
    ...state,
    showCourseAttendanceModal: true,
  })),

  on(tutorModalActions.closeTutorCourseAttendanceModal, (state) => ({
    ...state,
    showCourseAttendanceModal: false,
  })),

  on(
    tutorModalActions.openTutorAddClassResourceModal,
    tutorModalActions.openTutorEditClassResourceModal,
    (state) => ({
      ...state,
      showAddClassResourceModal: true,
    })
  ),

  on(tutorModalActions.closeTutorAddClassResourceModal, (state) => ({
    ...state,
    showAddClassResourceModal: false,
  })),

  on(tutorModalActions.openTutorAddAssignmentModal, (state) => ({
    ...state,
    showAddAssignmentModal: true,
  })),

  on(tutorModalActions.closeTutorAddAssignmentModal, (state) => ({
    ...state,
    showAddAssignmentModal: false,
  })),

  on(tutorModalActions.openTutorAssignmentDetailsModal, (state) => ({
    ...state,
    showAssignmentDetailsModal: true,
  })),

  on(tutorModalActions.closeTutorAssignmentDetailsModal, (state) => ({
    ...state,
    showAssignmentDetailsModal: false,
  })),

  on(tutorModalActions.openTutorAddTopicModal, (state) => ({
    ...state,
    showAddTopicModal: true,
  })),

  on(
    fromCore.tutorAddSyllabusTopicSuccess,
    fromCore.tutorEditSyllabusTopicSuccess,
    fromCore.tutorDeleteSyllabusTopicSuccess,
    tutorModalActions.closeTutorAddTopicModal,
    (state) => ({
      ...state,
      showAddTopicModal: false,
    })
  )
);

// tutor modal selectors
export const selectAddTopicModal = (state: State): boolean =>
  state.showAddTopicModal;

export const selectRejectCourseModal = (state: State): boolean =>
  state.showRejectCourseModal;

export const selectCancelCourseModal = (state: State): boolean =>
  state.showCancelCourseModal;

export const selectSendFeedbackModal = (state: State): boolean =>
  state.showSendFeedbackModal;

export const selectCourseAttendanceModal = (state: State): boolean =>
  state.showCourseAttendanceModal;

export const selectAddClassResourceModal = (state: State): boolean =>
  state.showAddClassResourceModal;

export const selectAddAssignmentModal = (state: State): boolean =>
  state.showAddAssignmentModal;

export const selectAssignmentDetailsModal = (state: State): boolean =>
  state.showAssignmentDetailsModal;
