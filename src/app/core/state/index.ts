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
import * as fromLookupsReducer from './reducers/lookups.reducer';

export interface CoreState {
  [featureKeys.tutorFeatureKey]: fromTutorReducer.State;
  [featureKeys.lookupsFeatureKey]: fromLookupsReducer.State;
}

export function reducers(state: CoreState, action: Action) {
  return combineReducers({
    [featureKeys.tutorFeatureKey]: fromTutorReducer.reducer,
    [featureKeys.lookupsFeatureKey]: fromLookupsReducer.reducer,
  })(state, action);
}

// Core selectors
export const selectCoreState = createFeatureSelector<fromRoot.State, CoreState>(
  featureKeys.coreFeatureKey
);

export const selectTutorState = createSelector(
  selectCoreState,
  (state) => state[featureKeys.tutorFeatureKey]
);

export const selectLookupsState = createSelector(
  selectCoreState,
  (state) => state[featureKeys.lookupsFeatureKey]
);

// Tutor
export const selectTutor = createSelector(
  selectTutorState,
  fromTutorReducer.selectTutor
);

export const selectIsLoadingTutor = createSelector(
  selectTutorState,
  fromTutorReducer.selectIsLoadingTutor
);

// Lookups
export const selectIsLoadingLanguage = createSelector(
  selectLookupsState,
  fromLookupsReducer.selectIsLoadingLanguages
);

export const selectLanguages = createSelector(
  selectLookupsState,
  fromLookupsReducer.selectLanguages
);

export const selectLevels = createSelector(
  selectLookupsState,
  fromLookupsReducer.selectLevels
);

export const selectCountries = createSelector(
  selectLookupsState,
  fromLookupsReducer.selectCountries
);

export const selectPrograms = createSelector(
  selectLookupsState,
  fromLookupsReducer.selectPrograms
);

export const selectSubjects = createSelector(
  selectLookupsState,
  fromLookupsReducer.selectSubjects
);

export const selectFields = createSelector(
  selectLookupsState,
  fromLookupsReducer.selectFields
);