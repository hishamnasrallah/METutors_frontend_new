import { createReducer, on } from '@ngrx/store';

import * as fromCore from '@metutor/core/state';
import * as tutorModalActions from '../actions/tutor-modal.actions';

export interface State {
  showRejectCourseModal: boolean;
}

export const initialState: State = {
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
  )
);

// tutor modal selectors
export const selectRejectCourseModal = (state: State): boolean =>
  state.showRejectCourseModal;
