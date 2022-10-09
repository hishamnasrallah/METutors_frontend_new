import { createReducer, on } from '@ngrx/store';

import * as tutorResourceActions from '../actions/tutor-resource.actions';
import * as tutorModalActions from '@metutor/modules/tutor/state/actions';

export interface State {
  resource: any;
  resources: any;
  isDeletingResource: boolean;
  isLoadingTutorResource: boolean;
  isAddingTutorResources: boolean;
  isUploadingResourceDoc: boolean;
  isLoadingTutorResources: boolean;
}

export const initialState: State = {
  resource: null,
  resources: null,
  isDeletingResource: false,
  isUploadingResourceDoc: false,
  isAddingTutorResources: false,
  isLoadingTutorResource: false,
  isLoadingTutorResources: false,
};

export const reducer = createReducer(
  initialState,

  on(tutorResourceActions.loadTutorResources, (state) => ({
    ...state,
    isLoadingTutorResources: true,
  })),

  on(
    tutorResourceActions.loadTutorResourcesSuccess,
    (state, { resources }) => ({
      ...state,
      resources,
      isLoadingTutorResources: false,
    })
  ),

  on(tutorResourceActions.loadTutorResourcesFailure, (state) => ({
    ...state,
    isLoadingTutorResources: false,
  })),

  on(tutorResourceActions.loadTutorResource, (state) => ({
    ...state,
    isLoadingTutorResource: true,
  })),

  on(tutorResourceActions.loadTutorResourceSuccess, (state, { resource }) => ({
    ...state,
    resource,
    isLoadingTutorResource: false,
  })),

  on(tutorResourceActions.loadTutorResourceFailure, (state) => ({
    ...state,
    isLoadingTutorResource: false,
  })),

  // Reset resource on open add resource modal
  on(
    tutorModalActions.openTutorAddClassResourceModal,
    tutorModalActions.openTutorEditClassResourceModal,
    (state) => ({
      ...state,
      resource: null,
    })
  ),

  on(tutorResourceActions.addTutorResource, (state) => ({
    ...state,
    isAddingTutorResources: true,
  })),

  on(tutorResourceActions.addTutorResourceSuccess, (state, { resource }) => {
    const finalState = {
      ...state,
      isAddingTutorResources: false,
    };

    if (
      finalState.resources?.course?.classes &&
      finalState.resources?.course?.classes?.length
    ) {
      const classes = finalState.resources.course.classes.map((cls: any) =>
        cls.id === resource?.resource?.class?.id
          ? { ...cls, resourceId: resource?.resource?.class?.resourceId }
          : { ...cls }
      );

      const course = {
        ...finalState.resources.course,
        classes,
      };

      finalState.resources = {
        ...finalState.resources,
        course,
      };
    }

    return finalState;
  }),

  on(tutorResourceActions.addTutorResourceFailure, (state) => ({
    ...state,
    isAddingTutorResources: false,
  })),

  on(tutorResourceActions.editTutorResource, (state) => ({
    ...state,
    isAddingTutorResources: true,
  })),

  on(tutorResourceActions.editTutorResourceSuccess, (state) => ({
    ...state,
    isAddingTutorResources: false,
  })),

  on(tutorResourceActions.editTutorResourceFailure, (state) => ({
    ...state,
    isAddingTutorResources: false,
  })),

  on(tutorResourceActions.deleteTutorResource, (state) => ({
    ...state,
    isDeletingResource: true,
  })),

  on(tutorResourceActions.deleteTutorResourceSuccess, (state, { id }) => {
    const finalState = {
      ...state,
      isDeletingResource: false,
    };

    if (
      finalState.resources?.course?.classes &&
      finalState.resources?.course?.classes?.length
    ) {
      const classes = finalState.resources.course.classes.map((cls: any) =>
        cls.resourceId === id ? { ...cls, resourceId: null } : { ...cls }
      );

      const course = {
        ...finalState.resources.course,
        classes,
      };

      finalState.resources = {
        ...finalState.resources,
        course,
      };
    }

    return finalState;
  }),

  on(tutorResourceActions.deleteTutorResourceFailure, (state) => ({
    ...state,
    isDeletingResource: false,
  })),

  on(tutorResourceActions.uploadTutorResourceDocument, (state) => ({
    ...state,
    isUploadingResourceDoc: true,
  })),

  on(tutorResourceActions.uploadTutorResourceDocumentSuccess, (state) => ({
    ...state,
    isUploadingResourceDoc: false,
  })),

  on(tutorResourceActions.uploadTutorResourceDocumentFailure, (state) => ({
    ...state,
    isUploadingResourceDoc: false,
  }))
);

export const selectIsLoadingTutorResource = (state: State): boolean =>
  state.isLoadingTutorResource;

export const selectTutorResource = (state: State): boolean => state.resource;

export const selectIsLoadingTutorResources = (state: State): boolean =>
  state.isLoadingTutorResources;

export const selectTutorResources = (state: State): boolean => state.resources;

export const selectIsAddingTutorResources = (state: State): boolean =>
  state.isAddingTutorResources;

export const selectIsDeletingResource = (state: State): boolean =>
  state.isDeletingResource;

export const selectUploadingResourceDoc = (state: State): boolean =>
  state.isUploadingResourceDoc;
