import { createReducer, on } from '@ngrx/store';

import { ITeacherDocument } from '@models';
import * as adminActions from '../actions/admin.actions';

export interface State {
  isApprovingDoc: boolean;
  isRejectingDoc: boolean;
  isLoadingAdminDocs: boolean;
  documents: ITeacherDocument[];
}

export const initialState: State = {
  documents: [],
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

  on(adminActions.adminRejectDocumentSuccess, (state, { id }) => {
    const finalState = {
      ...state,
      isRejectingDoc: false,
    };

    if (finalState.documents.length) {
      finalState.documents = finalState.documents.map(
        (document: ITeacherDocument) =>
          document.id === id ? { ...document, status: 'rejected' } : document
      );
    }

    return finalState;
  }),

  on(adminActions.adminRejectDocumentFailure, (state) => ({
    ...state,
    isRejectingDoc: false,
  })),

  on(adminActions.adminApproveDocument, (state) => ({
    ...state,
    isRejectingDoc: true,
  })),

  on(adminActions.adminApproveDocumentSuccess, (state, { id }) => {
    const finalState = {
      ...state,
      isRejectingDoc: false,
    };

    if (finalState.documents.length) {
      finalState.documents = finalState.documents.map(
        (document: ITeacherDocument) =>
          document.id === id ? { ...document, status: 'approved' } : document
      );
    }

    return finalState;
  }),

  on(adminActions.adminApproveDocumentFailure, (state) => ({
    ...state,
    isRejectingDoc: false,
  }))
);

export const selectAdminDocuments = (state: State): ITeacherDocument[] =>
  state.documents;

export const selectIsLoadingAdminDocs = (state: State): boolean =>
  state.isLoadingAdminDocs;

export const selectIsRejectingAdminDocs = (state: State): boolean =>
  state.isRejectingDoc;

export const selectIsApprovingAdminDocs = (state: State): boolean =>
  state.isApprovingDoc;
