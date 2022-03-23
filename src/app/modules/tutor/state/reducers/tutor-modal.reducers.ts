import { createReducer, on } from '@ngrx/store';

import * as fromCore from '@metutor/core/state';
import * as tutorModalActions from '../actions/tutor-modal.actions';

export interface State {
  showAddTopicModal: boolean;
  showRejectCourseModal: boolean;
  showCancelCourseModal: boolean;
  showSendFeedbackModal: boolean;
  showCourseAttendanceModal: boolean;
  showAddClassResourceModal: boolean;
}

export const initialState: State = {
  showAddTopicModal: false,
  showRejectCourseModal: false,
  showCancelCourseModal: false,
  showSendFeedbackModal: false,
  showCourseAttendanceModal: false,
  showAddClassResourceModal: false,
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

  on(tutorModalActions.openTutorAddClassResourceModal, (state) => ({
    ...state,
    showAddClassResourceModal: true,
  })),

  on(tutorModalActions.closeTutorAddClassResourceModal, (state) => ({
    ...state,
    showAddClassResourceModal: false,
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
