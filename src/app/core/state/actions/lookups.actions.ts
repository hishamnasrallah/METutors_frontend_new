import { createAction, props } from '@ngrx/store';

import {
  ICountry,
  IField,
  ILanguage,
  ILevel,
  IProgram,
  ISubject,
} from '@models';

export const loadLanguages = createAction('[Lookups] Load Languages');

export const loadLanguagesSuccess = createAction(
  '[Lookups] Load Languages Success',
  props<{ languages: ILanguage[] }>()
);

export const loadLanguagesFailure = createAction(
  '[Lookups] Load Languages Failure',
  props<{ error: any }>()
);

export const loadLevels = createAction('[Lookups] Load Levels');

export const loadLevelsSuccess = createAction(
  '[Lookups] Load Levels Success',
  props<{ levels: ILevel[] }>()
);

export const loadLevelsFailure = createAction(
  '[Lookups] Load Levels Failure',
  props<{ error: any }>()
);

export const loadCountries = createAction('[Lookups] Load Countries');

export const loadCountriesSuccess = createAction(
  '[Lookups] Load Countries Success',
  props<{ countries: ICountry[] }>()
);

export const loadCountriesFailure = createAction(
  '[Lookups] Load Countries Failure',
  props<{ error: any }>()
);

export const loadPrograms = createAction('[Lookups] Load Programs');

export const loadProgramsSuccess = createAction(
  '[Lookups] Load Programs Success',
  props<{ programs: IProgram[] }>()
);

export const loadProgramsFailure = createAction(
  '[Lookups] Load Programs Failure',
  props<{ error: any }>()
);

export const loadSubjectsByProgramId = createAction(
  '[Lookups] Load Subjects By Program Id',
  props<{ programId: string }>()
);

export const loadSubjectsByProgramIdSuccess = createAction(
  '[Lookups] Load Subjects By Program Id Success',
  props<{ subjects: ISubject[] }>()
);

export const loadSubjectsByProgramIdFailure = createAction(
  '[Lookups] Load Subjects By Program Id Failure',
  props<{ error: any }>()
);

export const loadFieldsByProgramId = createAction(
  '[Lookups] Load Fields By Program Id',
  props<{ programId: string }>()
);

export const loadFieldsByProgramIdSuccess = createAction(
  '[Lookups] Load Fields By Program Id Success',
  props<{ fields: IField[] }>()
);

export const loadFieldsByProgramIdFailure = createAction(
  '[Lookups] Load Fields By Program Id Failure',
  props<{ error: any }>()
);
