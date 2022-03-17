import { createReducer, on } from '@ngrx/store';

import { ITutor } from '@models';
import * as tutorActions from '../actions/tutor.actions';
import { finalize } from 'rxjs';

export interface State {
  syllabus: any;
  dashboard: any;
  tutor: ITutor | null;
  isLoadingTutors: boolean;
  isDeletingTopic: boolean;
  isLoadingSyllabus: boolean;
  isLoadingDashboard: boolean;
  loadingTutorFailure: string;
  isSavingSubjectTitle: boolean;
  isAddingSyllabusTopic: boolean;

  // Complete Tutor Profile
  isCompleteTutorProfile: boolean;
  completeTutorProfileFailure: string;
}

export const initialState: State = {
  tutor: null,
  syllabus: null,
  dashboard: null,
  isLoadingTutors: false,
  isDeletingTopic: false,
  loadingTutorFailure: '',
  isLoadingSyllabus: false,
  isLoadingDashboard: false,
  isSavingSubjectTitle: false,
  isAddingSyllabusTopic: false,
  isCompleteTutorProfile: false,
  completeTutorProfileFailure: '',
};

export const reducer = createReducer(
  initialState,
  on(tutorActions.loadTutor, (state) => ({
    ...state,
    isLoadingTutors: true,
  })),

  on(tutorActions.loadTutorSuccess, (state, { tutor }) => ({
    ...state,
    tutor,
    isLoadingTutors: false,
  })),

  on(tutorActions.loadTutorFailure, (state, { error }) => ({
    ...state,
    isLoadingTutors: false,
    loadingTutorFailure: error,
  })),

  on(tutorActions.loadTutorDashboard, (state) => ({
    ...state,
    isLoadingDashboard: true,
  })),

  on(tutorActions.loadTutorDashboardSuccess, (state, { dashboard }) => ({
    ...state,
    dashboard,
    isLoadingDashboard: false,
  })),

  on(tutorActions.loadTutorDashboardFailure, (state, { error }) => ({
    ...state,
    isLoadingDashboard: false,
  })),

  on(tutorActions.loadTutorDashboardEnded, (state) => ({
    ...state,
    isLoadingDashboard: false,
  })),

  on(tutorActions.completeTutorProfile, (state) => ({
    ...state,
    isCompleteTutorProfile: true,
  })),

  on(tutorActions.completeTutorProfileSuccess, (state) => ({
    ...state,
    isCompleteTutorProfile: false,
  })),

  on(tutorActions.completeTutorProfileFailure, (state, { error }) => ({
    ...state,
    isCompleteTutorProfile: false,
    completeTutorProfileFailure: error,
  })),

  on(tutorActions.loadTutorSyllabus, (state) => ({
    ...state,
    isLoadingSyllabus: true,
  })),

  on(tutorActions.loadTutorSyllabusSuccess, (state, { syllabus }) => ({
    ...state,
    syllabus,
    isLoadingSyllabus: false,
  })),

  on(tutorActions.loadTutorSyllabusFailure, (state) => ({
    ...state,
    isLoadingSyllabus: false,
  })),

  on(tutorActions.tutorAddSyllabusTopic, (state) => ({
    ...state,
    isAddingSyllabusTopic: true,
  })),

  on(tutorActions.tutorAddSyllabusTopicSuccess, (state, { syllabus }) => {
    let finalState = {
      ...state,
      isAddingSyllabusTopic: false,
    };

    console.log(finalState);
    console.log(syllabus);

    const topics = [...finalState.syllabus.topics];
    topics.push(syllabus.topic);

    finalState.syllabus = {
      ...finalState.syllabus,
      topics,
      unclassifiedClasses: syllabus.unclassifiedClasses,
    };
    console.log(finalState);
    return finalState;
  }),

  on(tutorActions.tutorAddSyllabusTopicFailure, (state) => ({
    ...state,
    isAddingSyllabusTopic: false,
  })),

  on(tutorActions.tutorEditSyllabusTopic, (state) => ({
    ...state,
    isAddingSyllabusTopic: true,
  })),

  on(tutorActions.tutorEditSyllabusTopicSuccess, (state, { syllabus }) => {
    console.log(syllabus);

    return {
      ...state,
      isAddingSyllabusTopic: false,
    };
  }),

  on(tutorActions.tutorEditSyllabusTopicFailure, (state) => ({
    ...state,
    isAddingSyllabusTopic: false,
  })),

  on(tutorActions.tutorDeleteSyllabusTopic, (state) => ({
    ...state,
    isDeletingTopic: true,
  })),

  on(tutorActions.tutorDeleteSyllabusTopicSuccess, (state, { data }) => {
    const finalState = {
      ...state,
      isDeletingTopic: false,
    };

    if (finalState.syllabus?.topics?.length) {
      const topics = finalState.syllabus?.topics.filter(
        (item: any) => item.topic.id !== data.deletedTopic?.id
      );

      finalState.syllabus = {
        ...finalState.syllabus,
        topics,
        unclassifiedClasses: data?.unclassifiedClasses,
      };
    }
    return finalState;
  }),

  on(tutorActions.tutorDeleteSyllabusTopicFailure, (state) => ({
    ...state,
    isDeletingTopic: false,
  })),

  on(tutorActions.tutorEditSubjectTitle, (state) => ({
    ...state,
    isSavingSubjectTitle: true,
  })),

  on(tutorActions.tutorEditSubjectTitleSuccess, (state) => ({
    ...state,
    isSavingSubjectTitle: false,
  })),

  on(tutorActions.tutorEditSubjectTitleFailure, (state) => ({
    ...state,
    isSavingSubjectTitle: false,
  }))
);

export const selectTutor = (state: State): ITutor | null => state.tutor;
export const selectTutorSyllabus = (state: State): any => state.syllabus;

export const selectTutorDashboard = (state: State): boolean => state.dashboard;

export const selectIsLoadingTutor = (state: State): boolean =>
  state.isLoadingTutors;

export const selectIsLoadingTutorDashboard = (state: State): boolean =>
  state.isLoadingDashboard;

export const selectIsCompleteTutorProfile = (state: State): boolean =>
  state.isCompleteTutorProfile;

export const selectIsLoadingTutorSyllabus = (state: State): boolean =>
  state.isLoadingSyllabus;

export const selectIsAddingSyllabusTopic = (state: State): boolean =>
  state.isAddingSyllabusTopic;

export const selectIsSavingSubjectTitle = (state: State): boolean =>
  state.isSavingSubjectTitle;

export const selectIsDeletingTopic = (state: State): boolean =>
  state.isDeletingTopic;
