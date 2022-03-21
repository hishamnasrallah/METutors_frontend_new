import { createReducer, on } from '@ngrx/store';

import * as fromCore from '@metutor/core/state';
import * as tutorModalActions from '../actions/tutor-modal.actions';

export interface State {
  showAddTopicModal: boolean;
  showRejectCourseModal: boolean;
}

export const initialState: State = {
  showAddTopicModal: false,
  showRejectCourseModal: false,
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
