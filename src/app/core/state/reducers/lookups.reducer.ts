import { createReducer, on } from '@ngrx/store';

import {
  ICountry,
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
  isLoadingCountries?: boolean;
  loadingCountriesFailure?: string;

  // Programs
  programs: IProgram[] | null;
  isLoadingPrograms?: boolean;
  loadingProgramsFailure?: string;

  // Subjects
  subjects: ISubject[] | null;
  isLoadingSubjects?: boolean;
  loadingSubjectsFailure?: string;

  // Fields
  fields: IField[] | null;
  isLoadingFields?: boolean;
  loadingFieldsFailure?: string;
}

export const initialState: State = {
  fields: null,
  levels: null,
  subjects: null,
  programs: null,
  languages: null,
  countries: null,
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

  on(lookupsActions.loadSubjectsByProgramId, (state) => ({
    ...state,
    isLoadingSubjects: true,
  })),

  on(lookupsActions.loadSubjectsByProgramIdSuccess, (state, { subjects }) => ({
    ...state,
    subjects,
    isLoadingSubjects: false,
  })),

  on(lookupsActions.loadSubjectsByProgramIdFailure, (state, { error }) => ({
    ...state,
    isLoadingSubjects: false,
    loadingSubjectsFailure: error.message,
  })),

  on(lookupsActions.loadFieldsByProgramId, (state) => ({
    ...state,
    isLoadingFields: true,
  })),

  on(lookupsActions.loadFieldsByProgramIdSuccess, (state, { fields }) => ({
    ...state,
    fields,
    isLoadingFields: false,
  })),

  on(lookupsActions.loadFieldsByProgramIdFailure, (state, { error }) => ({
    ...state,
    isLoadingFields: false,
    loadingFieldsFailure: error.message,
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

export const selectIsLoadingCountries = (state: State): boolean | undefined =>
  state.isLoadingCountries;

export const selectPrograms = (state: State): IProgram[] | null =>
  state.programs;

export const selectIsLoadingPrograms = (state: State): boolean | undefined =>
  state.isLoadingPrograms;

export const selectSubjects = (state: State): ISubject[] | null =>
  state.subjects;

export const selectIsLoadingSubjects = (state: State): boolean | undefined =>
  state.isLoadingSubjects;

export const selectFields = (state: State): IField[] | null => state.fields;

export const selectIsLoadingFields = (state: State): boolean | undefined =>
  state.isLoadingFields;