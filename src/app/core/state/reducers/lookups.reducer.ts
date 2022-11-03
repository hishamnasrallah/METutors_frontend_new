import { createReducer, on } from '@ngrx/store';
import * as lookupsActions from '../actions/lookups.actions';
import * as languageActions from '../actions/language-menu.actions';

import {
  ICity,
  IFAQ,
  IRole,
  IField,
  ILevel,
  ICountry,
  IProgram,
  ISubject,
  ILanguage,
  IFAQTopics,
  IPagination,
  ITicketCategory,
  ITicketPriority
} from '@models';

export interface State {
  // User types
  userTypes: IRole[];
  isLoadingUserTypes?: boolean;
  loadingUserTypesFailure?: string;

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

  // Program countries
  programCountries: ICountry[] | null;
  isLoadingProgramCountries: boolean;
  loadingProgramCountriesFailure?: string;

  // Flag contries
  flagCountries: ICountry[] | null;
  isLoadingFlagCountries: boolean;
  loadingFlagCountriesFailure?: string;

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

  // Ticket Categories
  ticketCategories: ITicketCategory[] | null;
  isLoadingTicketCategories: boolean;
  loadingTicketCategoriesFailure?: string;

  // Ticket Priorities
  ticketPriorities: ITicketPriority[] | null;
  isLoadingTicketPriorities: boolean;
  loadingTicketPrioritiesFailure?: string;

  // Add Edit Program
  isAddingEditingProgram: boolean;
  addingEditingProgramFailure?: string;

  // Delete Program
  isDeletingProgram: boolean;
  deletingProgramFailure?: string;

  // Add Edit Field
  isAddingEditingField: boolean;
  addingEditingFieldFailure?: string;

  // Delete Field
  isDeletingField: boolean;
  deletingFieldFailure?: string;

  // Add Edit Subject
  isAddingEditingSubject: boolean;
  addingEditingSubjectFailure?: string;

  // Delete Field
  isDeletingSubject: boolean;
  deletingSubjectFailure?: string;

  // Add Edit Program Countries
  isAddingEditingProgramCountries: boolean;
  addingEditingProgramCountriesFailure?: string;

  // Delete Program Countries
  isDeletingProgramCountries: boolean;
  deletingProgramCountriesFailure?: string;

  pagination: IPagination;
}

export const initialState: State = {
  FAQs: null,
  fields: null,
  levels: null,
  cities: null,
  topics: null,
  userTypes: [],
  subjects: null,
  programs: null,
  languages: null,
  countries: null,
  flagCountries: null,
  isLoadingFAQs: false,
  programCountries: null,
  ticketCategories: null,
  ticketPriorities: null,
  isLoadingTopics: false,
  isLoadingFields: false,
  isDeletingField: false,
  isDeletingSubject: false,
  isLoadingPrograms: false,
  isLoadingSubjects: false,
  isDeletingProgram: false,
  pagination: { total: 0 },
  isLoadingCountries: false,
  isAddingEditingField: false,
  isAddingEditingSubject: false,
  isLoadingFlagCountries: false,
  isAddingEditingProgram: false,
  isLoadingTicketCategories: false,
  isLoadingTicketPriorities: false,
  isLoadingProgramCountries: false,
  isDeletingProgramCountries: false,
  isAddingEditingProgramCountries: false
};

export const reducer = createReducer(
  initialState,

  on(lookupsActions.loadUserTypes, state => ({
    ...state,
    isLoadingUserTypes: true
  })),

  on(lookupsActions.loadUserTypesSuccess, (state, { userTypes }) => ({
    ...state,
    userTypes,
    isLoadingUserTypes: false
  })),

  on(lookupsActions.loadUserTypesFailure, (state, { error }) => ({
    ...state,
    isLoadingUserTypes: false,
    loadingUserTypesFailure: error
  })),

  on(lookupsActions.loadUserTypesEnded, state => ({
    ...state,
    isLoadingUserTypes: false
  })),

  on(lookupsActions.loadLanguages, state => ({
    ...state,
    isLoadingLanguages: true
  })),

  on(lookupsActions.loadLanguagesSuccess, (state, { languages }) => ({
    ...state,
    languages,
    isLoadingLanguages: false
  })),

  on(lookupsActions.loadLanguagesFailure, (state, { error }) => ({
    ...state,
    isLoadingLanguages: false,
    loadingLanguagesFailure: error
  })),

  on(lookupsActions.loadLanguagesEnded, state => ({
    ...state,
    isLoadingLanguages: false
  })),

  on(lookupsActions.loadLevels, state => ({
    ...state,
    isLoadingLevels: true
  })),

  on(lookupsActions.loadLevelsSuccess, (state, { levels }) => ({
    ...state,
    levels,
    isLoadingLevels: false
  })),

  on(lookupsActions.loadLevelsFailure, (state, { error }) => ({
    ...state,
    isLoadingLevels: false,
    loadingLevelsFailure: error
  })),

  on(lookupsActions.loadCountries, state => ({
    ...state,
    isLoadingCountries: true
  })),

  on(lookupsActions.loadCountriesSuccess, (state, { countries }) => ({
    ...state,
    countries,
    isLoadingCountries: false
  })),

  on(lookupsActions.loadCountriesFailure, (state, { error }) => ({
    ...state,
    isLoadingCountries: false,
    loadingCountriesFailure: error
  })),

  on(lookupsActions.loadCountriesEnded, state => ({
    ...state,
    isLoadingCountries: false
  })),

  on(lookupsActions.loadProgramCountries, state => ({
    ...state,
    isLoadingProgramCountries: true
  })),

  on(lookupsActions.loadProgramCountriesSuccess, (state, { countries }) => ({
    ...state,
    programCountries: countries,
    isLoadingProgramCountries: false
  })),

  on(lookupsActions.loadProgramCountriesFailure, (state, { error }) => ({
    ...state,
    isLoadingProgramCountries: false,
    loadingProgramCountriesFailure: error
  })),

  on(lookupsActions.loadProgramCountriesEnded, state => ({
    ...state,
    isLoadingProgramCountries: false
  })),

  on(lookupsActions.loadFlagCountries, state => ({
    ...state,
    isLoadingFlagCountries: true
  })),

  on(lookupsActions.loadFlagCountriesSuccess, (state, { countries }) => ({
    ...state,
    flagCountries: countries,
    isLoadingFlagCountries: false
  })),

  on(lookupsActions.loadFlagCountriesFailure, (state, { error }) => ({
    ...state,
    isLoadingFlagCountries: false,
    loadingFlagCountriesFailure: error
  })),

  on(lookupsActions.loadFlagCountriesEnded, state => ({
    ...state,
    isLoadingFlagCountries: false
  })),

  on(lookupsActions.loadCities, state => ({
    ...state,
    isLoadingCities: true
  })),

  on(lookupsActions.loadCitiesSuccess, (state, { cities }) => ({
    ...state,
    cities,
    isLoadingCities: false
  })),

  on(lookupsActions.loadCitiesFailure, (state, { error }) => ({
    ...state,
    isLoadingCities: false,
    loadingCitiesFailure: error
  })),

  on(lookupsActions.loadPrograms, lookupsActions.loadAdminPrograms, state => ({
    ...state,
    isLoadingPrograms: true
  })),

  on(lookupsActions.loadProgramsSuccess, (state, { programs }) => ({
    ...state,
    programs:
      programs && programs.length
        ? programs.map(program => ({
            ...program,
            name:
              localStorage.getItem('DEFAULT_LANGUAGE') === 'ar'
                ? program?.nameAr
                : program?.nameEn,
            title:
              localStorage.getItem('DEFAULT_LANGUAGE') === 'ar'
                ? program?.titleAr
                : program?.titleEn,
            description:
              localStorage.getItem('DEFAULT_LANGUAGE') === 'ar'
                ? program?.descriptionAr
                : program?.descriptionEn
          }))
        : [],
    isLoadingPrograms: false
  })),

  on(lookupsActions.loadAdminProgramsSuccess, (state, { total, programs }) => ({
    ...state,
    programs,
    pagination: { total },
    isLoadingPrograms: false
  })),

  on(lookupsActions.loadProgramsFailure, (state, { error }) => ({
    ...state,
    isLoadingPrograms: false,
    loadingProgramsFailure: error
  })),

  on(lookupsActions.loadProgramsEnded, state => ({
    ...state,
    isLoadingPrograms: false
  })),

  on(
    lookupsActions.loadSubjects,
    lookupsActions.loadAdminSubjects,
    lookupsActions.loadSubjectsByFieldId,
    state => ({
      ...state,
      isLoadingSubjects: true
    })
  ),

  on(
    lookupsActions.loadSubjectsSuccess,
    lookupsActions.loadSubjectsByFieldIdSuccess,
    (state, { subjects }) => ({
      ...state,
      subjects,
      isLoadingSubjects: false
    })
  ),

  on(
    lookupsActions.loadAdminSubjectsSuccess,

    (state, { total, subjects }) => ({
      ...state,
      subjects,
      pagination: { total },
      isLoadingSubjects: false
    })
  ),

  on(
    lookupsActions.loadSubjectsFailure,
    lookupsActions.loadAdminSubjectsFailure,
    lookupsActions.loadSubjectsByFieldIdFailure,
    (state, { error }) => ({
      ...state,
      isLoadingSubjects: false,
      loadingSubjectsFailure: error
    })
  ),

  on(
    lookupsActions.loadFields,
    lookupsActions.loadAdminFields,
    lookupsActions.loadFieldsByProgramId,
    state => ({
      ...state,
      isLoadingFields: true
    })
  ),

  on(
    lookupsActions.loadFieldsSuccess,
    lookupsActions.loadFieldsByProgramIdSuccess,
    (state, { fields }) => ({
      ...state,
      fields,
      isLoadingFields: false
    })
  ),

  on(
    lookupsActions.loadFieldsFailure,
    lookupsActions.loadAdminFieldsFailure,
    lookupsActions.loadFieldsByProgramIdFailure,
    (state, { error }) => ({
      ...state,
      isLoadingFields: false,
      loadingFieldsFailure: error
    })
  ),

  on(lookupsActions.loadAdminFieldsSuccess, (state, { total, fields }) => ({
    ...state,
    fields,
    pagination: { total },
    isLoadingFields: false
  })),

  on(lookupsActions.loadTopics, state => ({
    ...state,
    isLoadingTopics: true
  })),

  on(lookupsActions.loadTopicsSuccess, (state, { topics }) => ({
    ...state,
    topics,
    isLoadingTopics: false
  })),

  on(lookupsActions.loadTopicsFailure, (state, { error }) => ({
    ...state,
    isLoadingTopics: false,
    loadingTopicsFailure: error
  })),

  on(lookupsActions.loadTopicsEnded, state => ({
    ...state,
    isLoadingTopics: false
  })),

  on(lookupsActions.loadFAQs, state => ({
    ...state,
    isLoadingFAQs: true
  })),

  on(lookupsActions.loadFAQsSuccess, (state, { FAQs }) => ({
    ...state,
    FAQs,
    isLoadingFAQs: false
  })),

  on(lookupsActions.loadFAQsFailure, (state, { error }) => ({
    ...state,
    isLoadingFAQs: false,
    loadingFAQsFailure: error
  })),

  on(lookupsActions.loadFAQsEnded, state => ({
    ...state,
    isLoadingFAQs: false
  })),

  on(lookupsActions.loadTicketCategories, state => ({
    ...state,
    isLoadingTicketCategories: true
  })),

  on(
    lookupsActions.loadTicketCategoriesSuccess,
    (state, { ticketCategories }) => ({
      ...state,
      ticketCategories,
      isLoadingTicketCategories: false
    })
  ),

  on(lookupsActions.loadTicketCategoriesFailure, (state, { error }) => ({
    ...state,
    isLoadingTicketCategories: false,
    loadingTicketCategoriesFailure: error
  })),

  on(lookupsActions.loadTicketCategoriesEnded, state => ({
    ...state,
    isLoadingTicketCategories: false
  })),

  on(lookupsActions.loadTicketPriorities, state => ({
    ...state,
    isLoadingTicketPriorities: true
  })),

  on(
    lookupsActions.loadTicketPrioritiesSuccess,
    (state, { ticketPriorities }) => ({
      ...state,
      ticketPriorities,
      isLoadingTicketPriorities: false
    })
  ),

  on(lookupsActions.loadTicketPrioritiesFailure, (state, { error }) => ({
    ...state,
    isLoadingTicketPriorities: false,
    loadingTicketPrioritiesFailure: error
  })),

  on(lookupsActions.loadTicketPrioritiesEnded, state => ({
    ...state,
    isLoadingTicketPriorities: false
  })),

  on(lookupsActions.addEditProgram, state => ({
    ...state,
    isAddingEditingProgram: true
  })),

  on(lookupsActions.addEditProgramSuccess, (state, { program, isEdit }) => ({
    ...state,
    programs:
      state.programs && state.programs.length
        ? isEdit
          ? state.programs.map(prog =>
              prog.id === program.id ? { ...program } : { ...prog }
            )
          : [...state.programs, program]
        : [program],
    isAddingEditingProgram: false
  })),

  on(lookupsActions.addEditProgramFailure, (state, { error }) => ({
    ...state,
    isAddingEditingProgram: false,
    addingEditingProgramFailure: error
  })),

  on(lookupsActions.deleteProgram, state => ({
    ...state,
    isDeletingProgram: true
  })),

  on(lookupsActions.deleteProgramSuccess, (state, { id }) => ({
    ...state,
    programs:
      state.programs && state.programs.length
        ? state.programs.filter(prog => prog.id !== id)
        : [],
    isDeletingProgram: false
  })),

  on(lookupsActions.deleteProgramFailure, (state, { error }) => ({
    ...state,
    isDeletingProgram: false,
    deletingProgramFailure: error
  })),

  on(lookupsActions.addEditField, state => ({
    ...state,
    isAddingEditingField: true
  })),

  on(lookupsActions.addEditFieldSuccess, (state, { field, isEdit }) => ({
    ...state,
    fields:
      state.fields && state.fields.length
        ? isEdit
          ? state.fields.map(fld =>
              fld.id === field.id ? { ...field } : { ...fld }
            )
          : [...state.fields, field]
        : [field],
    isAddingEditingField: false
  })),

  on(lookupsActions.addEditFieldFailure, (state, { error }) => ({
    ...state,
    isAddingEditingField: false,
    addingEditingFieldFailure: error
  })),

  on(lookupsActions.deleteField, state => ({
    ...state,
    isDeletingField: true
  })),

  on(lookupsActions.deleteFieldSuccess, (state, { id }) => ({
    ...state,
    fields:
      state.fields && state.fields.length
        ? state.fields.filter(fld => fld.id !== id)
        : [],
    isDeletingField: false
  })),

  on(lookupsActions.deleteFieldFailure, (state, { error }) => ({
    ...state,
    isDeletingField: false,
    deletingFieldFailure: error
  })),

  on(lookupsActions.addEditSubject, state => ({
    ...state,
    isAddingEditingSubject: true
  })),

  on(lookupsActions.addEditSubjectSuccess, (state, { subject, isEdit }) => ({
    ...state,
    subjects:
      state.subjects && state.subjects.length
        ? isEdit
          ? state.subjects.map(fld =>
              fld.id === subject.id ? { ...subject } : { ...fld }
            )
          : [...state.subjects, subject]
        : [subject],
    isAddingEditingSubject: false
  })),

  on(lookupsActions.addEditSubjectFailure, (state, { error }) => ({
    ...state,
    isAddingEditingSubject: false,
    addingEditingSubjectFailure: error
  })),

  on(lookupsActions.deleteSubject, state => ({
    ...state,
    isDeletingSubject: true
  })),

  on(lookupsActions.deleteSubjectSuccess, (state, { id }) => ({
    ...state,
    subjects:
      state.subjects && state.subjects.length
        ? state.subjects.filter(fld => fld.id !== id)
        : [],
    isDeletingSubject: false
  })),

  on(lookupsActions.deleteSubjectFailure, (state, { error }) => ({
    ...state,
    isDeletingSubject: false,
    deletingSubjectFailure: error
  })),

  on(lookupsActions.addEditProgramCountries, state => ({
    ...state,
    isAddingEditingProgramCountries: true
  })),

  on(
    lookupsActions.addEditProgramCountriesSuccess,
    (state, { country, isEdit }) => ({
      ...state,
      programCountries:
        state.programCountries && state.programCountries.length
          ? isEdit
            ? state.programCountries.map(prog =>
                prog.id === country.id ? { ...country } : { ...prog }
              )
            : [...state.programCountries, country]
          : [country],
      isAddingEditingProgramCountries: false
    })
  ),

  on(lookupsActions.addEditProgramCountriesFailure, (state, { error }) => ({
    ...state,
    isAddingEditingProgramCountries: false,
    addingEditingProgramCountriesFailure: error
  })),

  on(lookupsActions.deleteProgramCountries, state => ({
    ...state,
    isDeletingProgramCountries: true
  })),

  on(lookupsActions.deleteProgramCountriesSuccess, (state, { id }) => ({
    ...state,
    programCountries:
      state.programCountries && state.programCountries.length
        ? state.programCountries.filter(prog => prog.id !== id)
        : [],
    isDeletingProgramCountries: false
  })),

  on(lookupsActions.deleteProgramCountriesFailure, (state, { error }) => ({
    ...state,
    isDeletingProgramCountries: false,
    deletingProgramCountriesFailure: error
  })),

  on(lookupsActions.resetLookUpsPagination, state => ({
    ...state,
    pagination: { total: 0 }
  })),

  on(languageActions.changeLanguage, state => ({
    ...state,
    programs:
      state.programs && state.programs.length
        ? state.programs.map(program => ({
            ...program,
            name:
              localStorage.getItem('DEFAULT_LANGUAGE') === 'ar'
                ? program?.nameAr
                : program?.nameEn,
            title:
              localStorage.getItem('DEFAULT_LANGUAGE') === 'ar'
                ? program?.titleAr
                : program?.titleEn,
            description:
              localStorage.getItem('DEFAULT_LANGUAGE') === 'ar'
                ? program?.descriptionAr
                : program?.descriptionEn
          }))
        : []
  }))
);

export const selectUserTypes = (state: State): IRole[] => state.userTypes;

export const selectIsLoadingUserTypes = (state: State): boolean | undefined =>
  state.isLoadingUserTypes;

export const selectLanguages = (state: State): ILanguage[] | null =>
  state.languages;

export const selectIsLoadingLanguages = (state: State): boolean | undefined =>
  state.isLoadingLanguages;

export const selectLevels = (state: State): ILevel[] | null => state.levels;

export const selectIsLoadingLevels = (state: State): boolean | undefined =>
  state.isLoadingLevels;

export const selectCountries = (state: State): ICountry[] | null =>
  state.countries;

export const selectProgramCountries = (state: State): ICountry[] | null =>
  state.programCountries;

export const selectFlagCountries = (state: State): ICountry[] | null =>
  state.flagCountries;

export const selectIsLoadingCountries = (state: State): boolean =>
  state.isLoadingCountries;

export const selectIsLoadingProgramCountries = (state: State): boolean =>
  state.isLoadingProgramCountries;

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

export const selectTicketCategories = (
  state: State
): ITicketCategory[] | null => state.ticketCategories;

export const selectIsLoadingTicketCategories = (state: State): boolean =>
  state.isLoadingTicketCategories;

export const selectTicketPriorities = (
  state: State
): ITicketPriority[] | null => state.ticketPriorities;

export const selectIsLoadingTicketPriorities = (state: State): boolean =>
  state.isLoadingTicketPriorities;

export const selectIsAddingEditingProgram = (state: State): boolean =>
  state.isAddingEditingProgram;

export const selectIsDeletingProgram = (state: State): boolean =>
  state.isDeletingProgram;

export const selectIsAddingEditingField = (state: State): boolean =>
  state.isAddingEditingField;

export const selectIsDeletingField = (state: State): boolean =>
  state.isDeletingField;

export const selectIsAddingEditingSubject = (state: State): boolean =>
  state.isAddingEditingSubject;

export const selectIsDeletingSubject = (state: State): boolean =>
  state.isDeletingSubject;

export const selectIsAddingEditingProgramCountries = (state: State): boolean =>
  state.isAddingEditingProgramCountries;

export const selectIsDeletingProgramCountries = (state: State): boolean =>
  state.isDeletingProgramCountries;

export const selectLookUpsPagination = (state: State): IPagination =>
  state.pagination;

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
    faqs = faqs?.filter(faq =>
      faq?.title.toLowerCase().includes(props.title.toLowerCase())
    );
  }

  if (props?.topic) {
    faqs = faqs.filter(faq => faq.topicId === +props.topic);
  }

  return faqs;
};

export const selectFilteredPrograms = (
  state: State,
  props?: any
): IProgram[] | null => {
  let programs: IProgram[] = [];

  if (state.programs && state.programs.length && props) {
    programs = getFilteredPrograms(state.programs, props);
  }

  return programs;
};

const getFilteredPrograms = (programs: IProgram[], props: any) => {
  if (props?.title) {
    programs = programs?.filter(program =>
      program?.name.toLowerCase().includes(props.title.toLowerCase())
    );
  }

  if (props?.status) {
    programs = programs.filter(program => program.status === +props.status);
  }

  return programs;
};
