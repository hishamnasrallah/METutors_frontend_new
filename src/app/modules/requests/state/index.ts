import {
  Action,
  createSelector,
  combineReducers,
  createFeatureSelector,
} from '@ngrx/store';
import * as fromRoot from '@metutor/state';

import * as featureKeys from './feature-keys';
import * as fromRequestsModal from './reducers/requests-modal.reducers';

export interface RequestsState {
  [featureKeys.requestsModalFeatureKey]: fromRequestsModal.State;
}

// Extends the app state to include the requests feature.
// This is required because requests feature is lazy loaded.
// So the reference to State cannot be added to root state directly.
export interface State extends fromRoot.State {
  [featureKeys.requestsFeatureKey]: RequestsState;
}

/** Provide reducer in AoT-compilation happy way */
// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function reducers(state: RequestsState, action: Action): any {
  return combineReducers({
    [featureKeys.requestsModalFeatureKey]: fromRequestsModal.reducer,
  })(state, action);
}

// Requests Selectors
export const selectRequestsState = createFeatureSelector<State, RequestsState>(
  featureKeys.requestsFeatureKey
);

export const selectRequestsModalState = createSelector(
  selectRequestsState,
  (state) => state[featureKeys.requestsModalFeatureKey]
);

// Requests modal selectors
export const selectIsConfirmPaymentModal = createSelector(
  selectRequestsModalState,
  fromRequestsModal.selectIsConfirmPaymentModal
);