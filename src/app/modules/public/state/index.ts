import {
  Action,
  createSelector,
  combineReducers,
  createFeatureSelector,
} from '@ngrx/store';
import * as fromRoot from '@metutor/state';

import * as featureKeys from './feature-keys';
import * as fromPublicModal from './reducers/public-modal.reducers';

export interface PublicState {
  [featureKeys.publicModalFeatureKey]: fromPublicModal.State;
}

// Extends the app state to include the public feature.
// This is required because public feature is lazy loaded.
// So the reference to State cannot be added to root state directly.
export interface State extends fromRoot.State {
  [featureKeys.publicFeatureKey]: PublicState;
}

/** Provide reducer in AoT-compilation happy way */
// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function reducers(state: PublicState, action: Action): any {
  return combineReducers({
    [featureKeys.publicModalFeatureKey]: fromPublicModal.reducer,
  })(state, action);
}

// Public Selectors
export const selectPublicState = createFeatureSelector<State, PublicState>(
  featureKeys.publicFeatureKey
);

export const selectPublicModalState = createSelector(
  selectPublicState,
  (state) => state[featureKeys.publicModalFeatureKey]
);

export const selectShowRequestCourseModal = createSelector(
  selectPublicModalState,
  fromPublicModal.selectShowRequestCourseModal
);
