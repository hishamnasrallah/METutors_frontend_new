import { createReducer, on } from '@ngrx/store';

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
import * as lookupsActions from '../actions/lookups.actions';

export interface State {
  // Languages
  languages: ILanguage[] | null;
  isLoadingLanguages?: boolean;
  loadingLanguagesFailure?: string;

  // Levels
  levels: ILevel[] | null;
  isLoadingLevels?: boolean;
  loadingLevelsFailure?: string;

  // Countries
  countries: ICountry[] | null;
  isLoadingCountries: boolean;
  loadingCountriesFailure?: string;

  // Cities
  cities: ICity[] | null;
  isLoadingCities?: boolean;
  loadingCitiesFailure?: string;

  // Programs
  programs: IProgram[] | null;
  isLoadingPrograms: boolean;
  loadingProgramsFailure?: string;

  // Subjects
  subjects: ISubject[] | null;
  isLoadingSubjects: boolean;
  loadingSubjectsFailure?: string;

  // Fields
  fields: IField[] | null;
  isLoadingFields: boolean;
  loadingFieldsFailure?: string;

  // Topics
  topics: IFAQTopics[] | null;
  isLoadingTopics: boolean;
  loadingTopicsFailure?: string;

  // FAQs
  FAQs: IFAQ[] | null;
  isLoadingFAQs: boolean;
  loadingFAQsFailure?: string;
}

export const initialState: State = {
  FAQs: null,
  fields: null,
  levels: null,
  cities: null,
  topics: null,
  subjects: null,
  programs: null,
  languages: null,
  countries: null,
  isLoadingFAQs: false,
  isLoadingTopics: false,
  isLoadingFields: false,
  isLoadingPrograms: false,
  isLoadingSubjects: false,
  isLoadingCountries: false,
};

export const reducer = createReducer(
  initialState,
  on(lookupsActions.loadLanguages, (state) => ({
    ...state,
    isLoadingLanguages: true,
  })),

  on(lookupsActions.loadLanguagesSuccess, (state, { languages }) => ({
    ...state,
    languages,
    isLoadingLanguages: false,
  })),

  on(lookupsActions.loadLanguagesFailure, (state, { error }) => ({
    ...state,
    isLoadingLanguages: false,
    loadingLanguagesFailure: error.message,
  })),

  on(lookupsActions.loadLevels, (state) => ({
    ...state,
    isLoadingLevels: true,
  })),

  on(lookupsActions.loadLevelsSuccess, (state, { levels }) => ({
    ...state,
    levels,
    isLoadingLevels: false,
  })),

  on(lookupsActions.loadLevelsFailure, (state, { error }) => ({
    ...state,
    isLoadingLevels: false,
    loadingLevelsFailure: error.message,
  })),

  on(lookupsActions.loadCountries, (state) => ({
    ...state,
    isLoadingCountries: true,
  })),

  on(lookupsActions.loadCountriesSuccess, (state, { countries }) => ({
    ...state,
    countries,
    isLoadingCountries: false,
  })),

  on(lookupsActions.loadCountriesFailure, (state, { error }) => ({
    ...state,
    isLoadingCountries: false,
    loadingCountriesFailure: error.message,
  })),

  on(lookupsActions.loadCities, (state) => ({
    ...state,
    isLoadingCities: true,
  })),

  on(lookupsActions.loadCitiesSuccess, (state, { cities }) => ({
    ...state,
    cities,
    isLoadingCities: false,
  })),

  on(lookupsActions.loadCitiesFailure, (state, { error }) => ({
    ...state,
    isLoadingCities: false,
    loadingCitiesFailure: error.message,
  })),

  on(lookupsActions.loadPrograms, (state) => ({
    ...state,
    isLoadingPrograms: true,
  })),

  on(lookupsActions.loadProgramsSuccess, (state, { programs }) => ({
    ...state,
    programs,
    isLoadingPrograms: false,
  })),

  on(lookupsActions.loadProgramsFailure, (state, { error }) => ({
    ...state,
    isLoadingPrograms: false,
    loadingProgramsFailure: error.message,
  })),

  on(lookupsActions.loadProgramsEnded, (state) => ({
    ...state,
    isLoadingPrograms: false,
  })),

  on(
    lookupsActions.loadSubjectsByFieldId,
    lookupsActions.loadSubjects,
    (state) => ({
      ...state,
      isLoadingSubjects: true,
    })
  ),

  on(
    lookupsActions.loadSubjectsByFieldIdSuccess,
    lookupsActions.loadSubjectsSuccess,
    (state, { subjects }) => ({
      ...state,
      subjects,
      isLoadingSubjects: false,
    })
  ),

  on(
    lookupsActions.loadSubjectsByFieldIdFailure,
    lookupsActions.loadSubjectsFailure,
    (state, { error }) => ({
      ...state,
      isLoadingSubjects: false,
      loadingSubjectsFailure: error.message,
    })
  ),

  on(lookupsActions.loadSubjectsEnded, (state) => ({
    ...state,
    isLoadingSubjects: false,
  })),

  on(
    lookupsActions.loadFieldsByProgramId,
    lookupsActions.loadFields,
    (state) => ({
      ...state,
      isLoadingFields: true,
    })
  ),

  on(
    lookupsActions.loadFieldsByProgramIdSuccess,
    lookupsActions.loadFieldsSuccess,
    (state, { fields }) => ({
      ...state,
      fields,
      isLoadingFields: false,
    })
  ),

  on(
    lookupsActions.loadFieldsByProgramIdFailure,
    lookupsActions.loadFieldsFailure,
    (state, { error }) => ({
      ...state,
      isLoadingFields: false,
      loadingFieldsFailure: error,
    })
  ),

  on(lookupsActions.loadTopics, (state) => ({
    ...state,
    isLoadingTopics: true,
  })),

  on(lookupsActions.loadTopicsSuccess, (state, { topics }) => ({
    ...state,
    topics,
    isLoadingTopics: false,
  })),

  on(lookupsActions.loadTopicsFailure, (state, { error }) => ({
    ...state,
    isLoadingTopics: false,
    loadingTopicsFailure: error.message,
  })),

  on(lookupsActions.loadTopicsEnded, (state) => ({
    ...state,
    isLoadingTopics: false,
  })),

  on(lookupsActions.loadFAQs, (state) => ({
    ...state,
    isLoadingFAQs: true,
  })),

  on(lookupsActions.loadFAQsSuccess, (state, { FAQs }) => ({
    ...state,
    FAQs,
    isLoadingFAQs: false,
  })),

  on(lookupsActions.loadFAQsFailure, (state, { error }) => ({
    ...state,
    isLoadingFAQs: false,
    loadingFAQsFailure: error.message,
  })),

  on(lookupsActions.loadFAQsEnded, (state) => ({
    ...state,
    isLoadingFAQs: false,
  }))
);

export const selectLanguages = (state: State): ILanguage[] | null =>
  state.languages;

export const selectIsLoadingLanguages = (state: State): boolean | undefined =>
  state.isLoadingLanguages;

export const selectLevels = (state: State): ILevel[] | null => state.levels;

export const selectIsLoadingLevels = (state: State): boolean | undefined =>
  state.isLoadingLevels;

export const selectCountries = (state: State): ICountry[] | null =>
  state.countries;

export const selectIsLoadingCountries = (state: State): boolean =>
  state.isLoadingCountries;

export const selectCities = (state: State): ICity[] | null => state.cities;

export const selectIsLoadingCities = (state: State): boolean | undefined =>
  state.isLoadingCities;

export const selectPrograms = (state: State): IProgram[] | null =>
  state.programs;

export const selectIsLoadingPrograms = (state: State): boolean =>
  state.isLoadingPrograms;

export const selectSubjects = (state: State): ISubject[] | null =>
  state.subjects;

export const selectIsLoadingSubjects = (state: State): boolean =>
  state.isLoadingSubjects;

export const selectFields = (state: State): IField[] | null => state.fields;

export const selectIsLoadingFields = (state: State): boolean =>
  state.isLoadingFields;

export const selectTopics = (state: State): IFAQTopics[] | null => state.topics;

export const selectIsLoadingTopics = (state: State): boolean =>
  state.isLoadingTopics;

export const selectFAQs = (state: State): IFAQ[] | null => state.FAQs;

export const selectIsLoadingFAQs = (state: State): boolean =>
  state.isLoadingFAQs;

export const selectFilteredFAQs = (
  state: State,
  props?: any
): IFAQ[] | null => {
  let FAQs: IFAQ[] = [];

  if (state.FAQs && state.FAQs.length && props) {
    FAQs = getFilteredFAQs(state.FAQs, props);
  }

  return FAQs;
};

const getFilteredFAQs = (faqs: IFAQ[], props: any) => {
  if (props?.title) {
    faqs = faqs?.filter((faq) =>
      faq?.title.toLowerCase().includes(props.title.toLowerCase())
    );
  }

  if (props?.topic) {
    faqs = faqs.filter((faq) => faq.topicId === +props.topic);
  }

  return faqs;
};
