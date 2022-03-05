import { createAction, props } from '@ngrx/store';

import {
  ICity,
  ICountry,
  IFAQ,
  IFAQTopics,
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

export const loadCities = createAction(
  '[Lookups] Load Cities',
  props<{ countryId: string }>()
);

export const loadCitiesSuccess = createAction(
  '[Lookups] Load Cities Success',
  props<{ cities: ICity[] }>()
);

export const loadCitiesFailure = createAction(
  '[Lookups] Load Cities Failure',
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

export const loadProgramsEnded = createAction('[Lookups] Load Programs Ended');

export const loadSubjects = createAction('[Lookups] Load Subjects');

export const loadSubjectsSuccess = createAction(
  '[Lookups] Load Subjects Success',
  props<{ subjects: ISubject[] }>()
);

export const loadSubjectsFailure = createAction(
  '[Lookups] Load Subjects Failure',
  props<{ error: any }>()
);

export const loadSubjectsEnded = createAction('[Lookups] Load Subjects Ended');

export const loadSubjectsByFieldId = createAction(
  '[Lookups] Load Subjects By Field Id',
  props<{ fieldId: string; country?: string }>()
);

export const loadSubjectsByFieldIdSuccess = createAction(
  '[Lookups] Load Subjects By Field Id Success',
  props<{ subjects: ISubject[] }>()
);

export const loadSubjectsByFieldIdFailure = createAction(
  '[Lookups] Load Subjects By Field Id Failure',
  props<{ error: any }>()
);

export const loadFieldsByProgramId = createAction(
  '[Lookups] Load Fields By Program Id',
  props<{ programId: string; country?: string }>()
);

export const loadFieldsByProgramIdSuccess = createAction(
  '[Lookups] Load Fields By Program Id Success',
  props<{ fields: IField[] }>()
);

export const loadFieldsByProgramIdFailure = createAction(
  '[Lookups] Load Fields By Program Id Failure',
  props<{ error: any }>()
);

export const loadFields = createAction('[Lookups] Load Fields');

export const loadFieldsSuccess = createAction(
  '[Lookups] Load Fields Success',
  props<{ fields: IField[] }>()
);

export const loadFieldsFailure = createAction(
  '[Lookups] Load Fields Failure',
  props<{ error: any }>()
);

export const loadTopics = createAction('[Lookups] Load Topics');

export const loadTopicsSuccess = createAction(
  '[Lookups] Load Topics Success',
  props<{ topics: IFAQTopics[] }>()
);

export const loadTopicsFailure = createAction(
  '[Lookups] Load Topics Failure',
  props<{ error: any }>()
);

export const loadTopicsEnded = createAction('[Lookups] Load Topics Ended');

export const loadFAQs = createAction('[Lookups] Load FAQs');

export const loadFAQsSuccess = createAction(
  '[Lookups] Load FAQs Success',
  props<{ FAQs: IFAQ[] }>()
);

export const loadFAQsFailure = createAction(
  '[Lookups] Load FAQs Failure',
  props<{ error: any }>()
);

export const loadFAQsEnded = createAction('[Lookups] Load FAQs Ended');
