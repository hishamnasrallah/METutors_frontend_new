import {
  Action,
  createSelector,
  combineReducers,
  createFeatureSelector,
} from '@ngrx/store';
import * as fromRoot from '@metutor/state';

import * as featureKeys from './feature-keys';
import * as fromTutorModal from './reducers/tutor-modal.reducers';

export interface TutorState {
  [featureKeys.tutorModalFeatureKey]: fromTutorModal.State;
}

// Extends the app state to include the tutor feature.
// This is required because tutor feature is lazy loaded.
// So the reference to State cannot be added to root state directly.
export interface State extends fromRoot.State {
  [featureKeys.tutorFeatureKey]: TutorState;
}

/** Provide reducer in AoT-compilation happy way */
// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function reducers(state: TutorState, action: Action): any {
  return combineReducers({
    [featureKeys.tutorModalFeatureKey]: fromTutorModal.reducer,
  })(state, action);
}

// Tutor Selectors
export const selectTutorState = createFeatureSelector<State, TutorState>(
  featureKeys.tutorFeatureKey
);

export const selectTutorModalState = createSelector(
  selectTutorState,
  (state) => state[featureKeys.tutorModalFeatureKey]
);

// Tutor modal selectors
export const selectAddTopicModal = createSelector(
  selectTutorModalState,
  fromTutorModal.selectAddTopicModal
);

export const selectRejectCourseModal = createSelector(
  selectTutorModalState,
  fromTutorModal.selectRejectCourseModal
);

export const selectCancelCourseModal = createSelector(
  selectTutorModalState,
  fromTutorModal.selectCancelCourseModal
);

export const selectSendFeedbackModal = createSelector(
  selectTutorModalState,
  fromTutorModal.selectSendFeedbackModal
);

export const selectCourseAttendanceModal = createSelector(
  selectTutorModalState,
  fromTutorModal.selectCourseAttendanceModal
);

export const selectAddClassResourceModal = createSelector(
  selectTutorModalState,
  fromTutorModal.selectAddClassResourceModal
);

export const selectAddAssignmentModal = createSelector(
  selectTutorModalState,
  fromTutorModal.selectAddAssignmentModal
);

export const selectAssignmentDetailsModal = createSelector(
  selectTutorModalState,
  fromTutorModal.selectAssignmentDetailsModal
);

export const selectViewStudentAssignmentModal = createSelector(
  selectTutorModalState,
  fromTutorModal.selectViewAssignmentModal
);

export const selectAcceptRejectAssignmentModal = createSelector(
  selectTutorModalState,
  fromTutorModal.selectAcceptRejectAssignmentModal
);

export const selectTutorStateParams = createSelector(
  selectTutorModalState,
  fromTutorModal.selectTutorStateParams
);
