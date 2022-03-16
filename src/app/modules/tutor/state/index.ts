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