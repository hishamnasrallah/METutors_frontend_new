import {
  Action,
  createSelector,
  combineReducers,
  createFeatureSelector,
} from '@ngrx/store';
import * as fromRoot from '@metutor/state';

import * as featureKeys from './feature-keys';
import * as fromStudentModal from './reducers/student-modal.reducers';

export interface StudentState {
  [featureKeys.studentModalFeatureKey]: fromStudentModal.State;
}

// Extends the app state to include the student feature.
// This is required because student feature is lazy loaded.
// So the reference to State cannot be added to root state directly.
export interface State extends fromRoot.State {
  [featureKeys.studentFeatureKey]: StudentState;
}

/** Provide reducer in AoT-compilation happy way */
// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function reducers(state: StudentState, action: Action): any {
  return combineReducers({
    [featureKeys.studentModalFeatureKey]: fromStudentModal.reducer,
  })(state, action);
}

// Student Selectors
export const selectStudentState = createFeatureSelector<State, StudentState>(
  featureKeys.studentFeatureKey
);

export const selectStudentModalState = createSelector(
  selectStudentState,
  (state) => state[featureKeys.studentModalFeatureKey]
);

export const selectAttendanceModal = createSelector(
  selectStudentModalState,
  fromStudentModal.selectAttendanceModal
);

export const selectSendFeedbackModal = createSelector(
  selectStudentModalState,
  fromStudentModal.selectSendFeedbackModal
);

export const selectViewResourceModal = createSelector(
  selectStudentModalState,
  fromStudentModal.selectViewResourceModal
);

export const selectViewAssignmentModal = createSelector(
  selectStudentModalState,
  fromStudentModal.selectViewAssignmentModal
);

export const selectSubmitAssignmentModal = createSelector(
  selectStudentModalState,
  fromStudentModal.selectSubmitAssignmentModal
);

export const selectViewSubmittedAssignmentModal = createSelector(
  selectStudentModalState,
  fromStudentModal.selectViewSubmittedAssignmentModal
);

export const selectCancelCourseModal = createSelector(
  selectStudentModalState,
  fromStudentModal.selectCancelCourseModal
);
