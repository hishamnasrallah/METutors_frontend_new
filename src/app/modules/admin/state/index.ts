import {
  Action,
  createSelector,
  combineReducers,
  createFeatureSelector,
} from '@ngrx/store';
import * as fromRoot from '@metutor/state';

import * as featureKeys from './feature-keys';
import * as fromAdminModal from './reducers/admin-modal.reducers';

export interface AdminState {
  [featureKeys.adminModalFeatureKey]: fromAdminModal.State;
}

// Extends the app state to include the admin feature.
// This is required because admin feature is lazy loaded.
// So the reference to State cannot be added to root state directly.
export interface State extends fromRoot.State {
  [featureKeys.adminFeatureKey]: AdminState;
}

/** Provide reducer in AoT-compilation happy way */
// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function reducers(state: AdminState, action: Action): any {
  return combineReducers({
    [featureKeys.adminModalFeatureKey]: fromAdminModal.reducer,
  })(state, action);
}

// Admin Selectors
export const selectAdminState = createFeatureSelector<State, AdminState>(
  featureKeys.adminFeatureKey
);

export const selectAdminModalState = createSelector(
  selectAdminState,
  (state) => state[featureKeys.adminModalFeatureKey]
);

// Admin modal selectors
export const selectIsSendMeetingLinkModal = createSelector(
  selectAdminModalState,
  fromAdminModal.selectIsSendMeetingLinkModal
);

export const selectIsHourlyRatePerSubjectModal = createSelector(
  selectAdminModalState,
  fromAdminModal.selectIsHourlyRatePerSubjectModal
);

export const selectIsInterviewAttachmentModal = createSelector(
  selectAdminModalState,
  fromAdminModal.selectIsInterviewAttachmentModal
);