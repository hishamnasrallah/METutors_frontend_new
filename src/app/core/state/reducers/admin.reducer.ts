import { createReducer, on } from '@ngrx/store';

import * as adminActions from '../actions/admin.actions';

export interface State {
  documents: any;
  isLoadingAdminDocs: boolean;
}

export const initialState: State = {
  documents: null,
  isLoadingAdminDocs: false,
};

export const reducer = createReducer(
  initialState,
  on(adminActions.loadAdminDocuments, (state) => ({
    ...state,
    isLoadingAdminDocs: true,
  })),

  on(adminActions.loadAdminDocumentsSuccess, (state, { documents }) => ({
    ...state,
    documents,
    isLoadingAdminDocs: false,
  })),

  on(adminActions.loadAdminDocumentsFailure, (state) => ({
    ...state,
    isLoadingAdminDocs: false,
  }))
);

export const selectAdminDocuments = (state: State): any[] | null =>
  state.documents;

export const selectIsLoadingAdminDocs = (state: State): boolean =>
  state.isLoadingAdminDocs;
