import {
  Action,
  createSelector,
  combineReducers,
  createFeatureSelector,
} from '@ngrx/store';
import * as fromRoot from '@metutor/state';

import * as featureKeys from './feature-keys';
import * as fromAccountModal from './reducers/account-modal.reducers';

export interface AccountState {
  [featureKeys.accountModalFeatureKey]: fromAccountModal.State;
}

// Extends the app state to include the account feature.
// This is required because account feature is lazy loaded.
// So the reference to State cannot be added to root state directly.
export interface State extends fromRoot.State {
  [featureKeys.accountFeatureKey]: AccountState;
}

/** Provide reducer in AoT-compilation happy way */
// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function reducers(state: AccountState, action: Action): any {
  return combineReducers({
    [featureKeys.accountModalFeatureKey]: fromAccountModal.reducer,
  })(state, action);
}

// Account Selectors
export const selectAccountState = createFeatureSelector<State, AccountState>(
  featureKeys.accountFeatureKey
);

export const selectAccountModalState = createSelector(
  selectAccountState,
  (state) => state[featureKeys.accountModalFeatureKey]
);

// Account modal selectors
export const selectShowEmailVerificationModal = createSelector(
  selectAccountModalState,
  fromAccountModal.selectShowEmailVerificationModal
);

export const selectLoginUserRole = createSelector(
  selectAccountModalState,
  fromAccountModal.selectLoginUserRole
);
