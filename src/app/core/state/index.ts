import {
  Action,
  createSelector,
  combineReducers,
  createFeatureSelector,
} from '@ngrx/store';

export * from './actions';
import * as fromRoot from '@metutor/state';
import * as featureKeys from './feature-keys';

import * as fromTutorReducer from './reducers/tutor.reducer';

export interface CoreState {
  [featureKeys.tutorFeatureKey]: fromTutorReducer.State;
}

export function reducers(state: CoreState, action: Action) {
  return combineReducers({
    [featureKeys.tutorFeatureKey]: fromTutorReducer.reducer,
  })(state, action);
}

// Core selectors
export const selectCoreState = createFeatureSelector<fromRoot.State, CoreState>(
  featureKeys.coreFeatureKey
);

export const selectTutorState = createSelector(
  selectCoreState,
  state => state[featureKeys.tutorFeatureKey]
);

// Tutor
export const selectTutors = createSelector(
  selectTutorState,
  fromTutorReducer.selectTutors
);

export const selectIsLoadingTutors = createSelector(
  selectTutorState,
  fromTutorReducer.selectIsLoadingTutors
);
