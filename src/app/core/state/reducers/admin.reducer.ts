import { createReducer, on } from '@ngrx/store';

import * as adminActions from '../actions/admin.actions';

export interface State {
  documents: any;
  isApprovingDoc: boolean;
  isRejectingDoc: boolean;
  isLoadingAdminDocs: boolean;
}

export const initialState: State = {
  documents: null,
  isApprovingDoc: false,
  isRejectingDoc: false,
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
  })),

  on(adminActions.adminRejectDocument, (state) => ({
    ...state,
    isRejectingDoc: true,
  })),

  on(adminActions.adminRejectDocumentSuccess, (state) => ({
    ...state,
    isRejectingDoc: false,
  })),

  on(adminActions.adminRejectDocumentFailure, (state) => ({
    ...state,
    isRejectingDoc: false,
  })),

  on(adminActions.adminApproveDocument, (state) => ({
    ...state,
    isRejectingDoc: true,
  })),

  on(adminActions.adminApproveDocumentSuccess, (state) => ({
    ...state,
    isRejectingDoc: false,
  })),

  on(adminActions.adminApproveDocumentFailure, (state) => ({
    ...state,
    isRejectingDoc: false,
  }))
);

export const selectAdminDocuments = (state: State): any[] | null =>
  state.documents;

export const selectIsLoadingAdminDocs = (state: State): boolean =>
  state.isLoadingAdminDocs;

export const selectIsRejectingAdminDocs = (state: State): boolean =>
  state.isRejectingDoc;

export const selectIsApprovingAdminDocs = (state: State): boolean =>
  state.isApprovingDoc;
