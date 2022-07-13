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
  ITicketCategory,
  ITicketPriority,
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

export const loadLanguagesEnded = createAction(
  '[Lookups] Load Languages Ended'
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

export const loadCountriesEnded = createAction(
  '[Lookups] Load Countries Ended'
);

export const loadProgramCountries = createAction(
  '[Lookups] Load Program Countries'
);

export const loadProgramCountriesSuccess = createAction(
  '[Lookups] Load Program Countries Success',
  props<{ countries: ICountry[] }>()
);

export const loadProgramCountriesFailure = createAction(
  '[Lookups] Load Program Countries Failure',
  props<{ error: any }>()
);

export const loadProgramCountriesEnded = createAction(
  '[Lookups] Load Program Countries Ended'
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

export const loadAdminPrograms = createAction(
  '[Lookups] Load Admin Programs',
  props<{
    params: { page: number; search: string; status?: string | number };
  }>()
);

export const loadAdminProgramsSuccess = createAction(
  '[Lookups] Load Admin Programs Success',
  props<{ total: number; programs: IProgram[] }>()
);

export const loadAdminProgramsFailure = createAction(
  '[Lookups] Load Admin Programs Failure',
  props<{ error: any }>()
);

export const loadProgramsEnded = createAction('[Lookups] Load Programs Ended');

export const loadSubjects = createAction('[Lookups] Load Subjects');

export const loadAdminSubjects = createAction('[Lookups] Load Admin Subjects');

export const loadAdminSubjectsSuccess = createAction(
  '[Lookups] Load Admin Subjects Success',
  props<{ total: number; subjects: ISubject[] }>()
);

export const loadAdminSubjectsFailure = createAction(
  '[Lookups] Load Admin Subjects Failure',
  props<{ error: any }>()
);

export const loadSubjectsSuccess = createAction(
  '[Lookups] Load Subjects Success',
  props<{ subjects: ISubject[] }>()
);

export const loadSubjectsFailure = createAction(
  '[Lookups] Load Subjects Failure',
  props<{ error: any }>()
);

export const loadSubjectsByFieldId = createAction(
  '[Lookups] Load Subjects By Field Id',
  props<{ fieldId: string; countryId?: string }>()
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
  props<{ programId: string; countryId?: string; grade?: number }>()
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

export const loadAdminFields = createAction(
  '[Lookups] Load Admin Fields',
  props<{ params: { page: number; search: string } }>()
);

export const loadAdminFieldsSuccess = createAction(
  '[Lookups] Load Admin Fields Success',
  props<{ fields: IField[]; total: number }>()
);

export const loadAdminFieldsFailure = createAction(
  '[Lookups] Load Admin Fields Failure',
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

export const loadTicketCategories = createAction(
  '[Lookups] Load Ticket Categories'
);

export const loadTicketCategoriesSuccess = createAction(
  '[Lookups] Load Ticket Categories Success',
  props<{ ticketCategories: ITicketCategory[] }>()
);

export const loadTicketCategoriesFailure = createAction(
  '[Lookups] Load Ticket Categories Failure',
  props<{ error: any }>()
);

export const loadTicketCategoriesEnded = createAction(
  '[Lookups] Load Ticket Categories Ended'
);

export const loadTicketPriorities = createAction(
  '[Lookups] Load Ticket Priorities'
);

export const loadTicketPrioritiesSuccess = createAction(
  '[Lookups] Load Ticket Priorities Success',
  props<{ ticketPriorities: ITicketPriority[] }>()
);

export const loadTicketPrioritiesFailure = createAction(
  '[Lookups] Load Ticket Priorities Failure',
  props<{ error: any }>()
);

export const loadTicketPrioritiesEnded = createAction(
  '[Lookups] Load Ticket Priorities Ended'
);

export const addEditProgram = createAction(
  '[Lookups] Add Edit Program',
  props<{ program: IProgram }>()
);

export const addEditProgramSuccess = createAction(
  '[Lookups] Add Edit Program Success',
  props<{ program: IProgram; message: string; isEdit: boolean }>()
);

export const addEditProgramFailure = createAction(
  '[Lookups] Add Edit Program Failure',
  props<{ error: any }>()
);

export const deleteProgram = createAction(
  '[Lookups] Delete Program',
  props<{ id: number }>()
);

export const deleteProgramSuccess = createAction(
  '[Lookups] Delete Program Success',
  props<{ id: number; message: string }>()
);

export const deleteProgramFailure = createAction(
  '[Lookups] Delete Program Failure',
  props<{ error: any }>()
);

export const addEditField = createAction(
  '[Lookups] Add Edit Field',
  props<{ field: IField }>()
);

export const addEditFieldSuccess = createAction(
  '[Lookups] Add Edit Field Success',
  props<{ field: IField; message: string; isEdit: boolean }>()
);

export const addEditFieldFailure = createAction(
  '[Lookups] Add Edit Field Failure',
  props<{ error: any }>()
);

export const deleteField = createAction(
  '[Lookups] Delete Field',
  props<{ id: number }>()
);

export const deleteFieldSuccess = createAction(
  '[Lookups] Delete Field Success',
  props<{ id: number; message: string }>()
);

export const deleteFieldFailure = createAction(
  '[Lookups] Delete Field Failure',
  props<{ error: any }>()
);

export const addEditSubject = createAction(
  '[Lookups] Add Edit Subject',
  props<{ subject: ISubject }>()
);

export const addEditSubjectSuccess = createAction(
  '[Lookups] Add Edit Subject Success',
  props<{ subject: ISubject; message: string; isEdit: boolean }>()
);

export const addEditSubjectFailure = createAction(
  '[Lookups] Add Edit Subject Failure',
  props<{ error: any }>()
);

export const deleteSubject = createAction(
  '[Lookups] Delete Subject',
  props<{ id: number }>()
);

export const deleteSubjectSuccess = createAction(
  '[Lookups] Delete Subject Success',
  props<{ id: number; message: string }>()
);

export const deleteSubjectFailure = createAction(
  '[Lookups] Delete Subject Failure',
  props<{ error: any }>()
);

export const addEditProgramCountries = createAction(
  '[Lookups] Add Edit Program Countries',
  props<{ country: ICountry }>()
);

export const addEditProgramCountriesSuccess = createAction(
  '[Lookups] Add Edit Program Countries Success',
  props<{ country: ICountry; message: string; isEdit: boolean }>()
);

export const addEditProgramCountriesFailure = createAction(
  '[Lookups] Add Edit Program Countries Failure',
  props<{ error: any }>()
);

export const deleteProgramCountries = createAction(
  '[Lookups] Delete Program Countries',
  props<{ id: number }>()
);

export const deleteProgramCountriesSuccess = createAction(
  '[Lookups] Delete Program Countries Success',
  props<{ id: number; message: string }>()
);

export const deleteProgramCountriesFailure = createAction(
  '[Lookups] Delete Program Countries Failure',
  props<{ error: any }>()
);
