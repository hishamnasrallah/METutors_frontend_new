import {
  Action,
  createSelector,
  combineReducers,
  createFeatureSelector,
} from '@ngrx/store';
import * as fromRoot from '@metutor/state';

import * as featureKeys from './feature-keys';
import * as fromProfileModal from './reducers/profile-modal.reducers';

export interface ProfileState {
  [featureKeys.profileModalFeatureKey]: fromProfileModal.State;
}

// Extends the app state to include the profile feature.
// This is required because profile feature is lazy loaded.
// So the reference to State cannot be added to root state directly.
export interface State extends fromRoot.State {
  [featureKeys.profileFeatureKey]: ProfileState;
}

/** Provide reducer in AoT-compilation happy way */
// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function reducers(state: ProfileState, action: Action): any {
  return combineReducers({
    [featureKeys.profileModalFeatureKey]: fromProfileModal.reducer,
  })(state, action);
}

// Profile Selectors
export const selectProfileState = createFeatureSelector<State, ProfileState>(
  featureKeys.profileFeatureKey
);

export const selectProfileModalState = createSelector(
  selectProfileState,
  (state) => state[featureKeys.profileModalFeatureKey]
);

// Profile modal selectors

export const selectIsShowTeacherAvailabilityModal = createSelector(
  selectProfileModalState,
  fromProfileModal.selectIsShowTeacherAvailabilityModal
);

export const selectShowViewDocumentModal = createSelector(
  selectProfileModalState,
  fromProfileModal.selectShowViewDocumentModal
);
