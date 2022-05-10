import { createReducer, on } from '@ngrx/store';

import { ICapacity, ISubject, ITeacherDocument } from '@models';
import * as adminActions from '../actions/admin.actions';

export interface State {
  isApprovingDoc: boolean;
  isRejectingDoc: boolean;
  isLoadingAdminDocs: boolean;
  documents: ITeacherDocument[];

  // Loading workforce capacity
  workforceCapacity: ICapacity[];
  isLoadingWorkforceCapacity: boolean;

  // Loading course booking list
  courseBooking: ISubject | null;
  isLoadingCourseBooking: boolean;
}

export const initialState: State = {
  documents: [],
  courseBooking: null,
  isApprovingDoc: false,
  isRejectingDoc: false,
  workforceCapacity: [],
  isLoadingAdminDocs: false,
  isLoadingCourseBooking: false,
  isLoadingWorkforceCapacity: false,
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
  })),

  on(adminActions.loadWorkforceCapacity, (state) => ({
    ...state,
    isLoadingWorkforceCapacity: true,
  })),

  on(
    adminActions.loadWorkforceCapacitySuccess,
    (state, { workforceCapacity }) => ({
      ...state,
      workforceCapacity,
      isLoadingWorkforceCapacity: false,
    })
  ),

  on(
    adminActions.loadWorkforceCapacityEnded,
    adminActions.loadWorkforceCapacityFailure,
    (state) => ({
      ...state,
      isLoadingWorkforceCapacity: false,
    })
  ),

  on(adminActions.loadCourseBookingList, (state) => ({
    ...state,
    isLoadingCourseBooking: true,
  })),

  on(adminActions.loadCourseBookingListSuccess, (state, { courseBooking }) => ({
    ...state,
    courseBooking,
    isLoadingCourseBooking: false,
  })),

  on(adminActions.loadCourseBookingListFailure, (state) => ({
    ...state,
    isLoadingCourseBooking: false,
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

export const selectIsLoadingWorkforceCapacity = (state: State): boolean =>
  state.isLoadingWorkforceCapacity;

export const selectWorkforceCapacity = (state: State): ICapacity[] =>
  state.workforceCapacity;

export const selectIsLoadingCourseBooking = (state: State): boolean =>
  state.isLoadingCourseBooking;

export const selectCourseBooking = (state: State): ISubject | null =>
  state.courseBooking;

export const selectFilteredWorkforceCapacity = (
  state: State,
  props?: any
): ICapacity[] | null => {
  let workforceCapacity: ICapacity[] = [];

  if (state.workforceCapacity && state.workforceCapacity.length && props) {
    workforceCapacity = getFilteredWorkforceCapacity(
      state.workforceCapacity,
      props
    );
  }

  return workforceCapacity;
};

const getFilteredWorkforceCapacity = (
  workforceCapacity: ICapacity[],
  props: any
) => {
  if (props?.name) {
    workforceCapacity = workforceCapacity?.filter((tutor) =>
      tutor?.subject?.name?.toLowerCase()?.includes(props.name.toLowerCase())
    );
  }

  return workforceCapacity;
};
