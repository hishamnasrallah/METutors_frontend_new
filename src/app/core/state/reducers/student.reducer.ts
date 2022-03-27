import { createReducer, on } from '@ngrx/store';

import * as tutorActions from '../actions/student.actions';

export interface State {
  resource: any;
  syllabus: any;
  dashboard: any;
  classroom: any;
  resources: any;
  classesDashboard: any;
  isLoadingStudentSyllabus: boolean;
  isLoadingStudentResource: boolean;
  isLoadingStudentResources: boolean;
  isLoadingStudentDashboard: boolean;
  isLoadingStudentClassroom: boolean;
  isLoadingStudentClassesDashboard: boolean;
}

export const initialState: State = {
  resource: null,
  syllabus: null,
  dashboard: null,
  resources: null,
  classroom: null,
  classesDashboard: null,
  isLoadingStudentSyllabus: false,
  isLoadingStudentResource: false,
  isLoadingStudentResources: false,
  isLoadingStudentDashboard: false,
  isLoadingStudentClassroom: false,
  isLoadingStudentClassesDashboard: false,
};

export const reducer = createReducer(
  initialState,
  on(tutorActions.loadStudentDashboard, (state) => ({
    ...state,
    isLoadingStudentDashboard: true,
  })),

  on(tutorActions.loadStudentDashboardSuccess, (state, { dashboard }) => ({
    ...state,
    dashboard,
    isLoadingStudentDashboard: false,
  })),

  on(tutorActions.loadStudentDashboardFailure, (state) => ({
    ...state,
    isLoadingStudentDashboard: false,
  })),

  on(tutorActions.loadStudentDashboardEnded, (state) => ({
    ...state,
    isLoadingStudentDashboard: false,
  })),

  on(tutorActions.loadStudentClassroom, (state) => ({
    ...state,
    isLoadingStudentClassroom: true,
  })),

  on(tutorActions.loadStudentClassroomSuccess, (state, { classroom }) => ({
    ...state,
    classroom,
    isLoadingStudentClassroom: false,
  })),

  on(tutorActions.loadStudentClassroomFailure, (state) => ({
    ...state,
    isLoadingStudentClassroom: false,
  })),

  on(tutorActions.loadStudentClassesDashboard, (state) => ({
    ...state,
    isLoadingStudentClassesDashboard: true,
  })),

  on(
    tutorActions.loadStudentClassesDashboardSuccess,
    (state, { classesDashboard }) => ({
      ...state,
      classesDashboard,
      isLoadingStudentClassesDashboard: false,
    })
  ),

  on(tutorActions.loadStudentClassesDashboardFailure, (state) => ({
    ...state,
    isLoadingStudentClassesDashboard: false,
  })),

  on(tutorActions.loadStudentSyllabus, (state) => ({
    ...state,
    isLoadingStudentSyllabus: true,
  })),

  on(tutorActions.loadStudentSyllabusSuccess, (state, { syllabus }) => ({
    ...state,
    syllabus,
    isLoadingStudentSyllabus: false,
  })),

  on(tutorActions.loadStudentSyllabusFailure, (state) => ({
    ...state,
    isLoadingStudentSyllabus: false,
  })),

  on(tutorActions.loadStudentResources, (state) => ({
    ...state,
    isLoadingStudentResources: true,
  })),

  on(tutorActions.loadStudentResourcesSuccess, (state, { resources }) => ({
    ...state,
    resources,
    isLoadingStudentResources: false,
  })),

  on(tutorActions.loadStudentResourcesFailure, (state) => ({
    ...state,
    isLoadingStudentResources: false,
  })),

  on(tutorActions.loadStudentResource, (state) => ({
    ...state,
    isLoadingStudentResource: true,
  })),

  on(tutorActions.loadStudentResourceSuccess, (state, { resource }) => ({
    ...state,
    resource,
    isLoadingStudentResource: false,
  })),

  on(tutorActions.loadStudentResourceFailure, (state) => ({
    ...state,
    isLoadingStudentResource: false,
  }))
);

export const selectStudentDashboard = (state: State): boolean =>
  state.dashboard;

export const selectStudentClassesDashboard = (state: State): boolean =>
  state.classesDashboard;

export const selectIsLoadingStudentDashboard = (state: State): boolean =>
  state.isLoadingStudentDashboard;

export const selectActiveClassroomCourses = (state: State): any =>
  state.classroom?.activeCourses;

export const selectClassroomLastActivityCourse = (state: State): any =>
  state.classroom?.lastActivityCourse;

export const selectCompletedClassroomCourses = (state: State): any =>
  state?.classroom?.completedCourses;

export const selectClassroomCoursePrograms = (state: State): any =>
  state?.classroom?.programs;

export const selectClassroomCourseFieldOfStudies = (state: State): any =>
  state?.classroom?.fieldOfStudies;

export const selectIsLoadingStudentClassroom = (state: State): boolean =>
  state.isLoadingStudentClassroom;

export const selectStudentSyllabus = (state: State): boolean => state.syllabus;

export const selectIsLoadingStudentClassesDashboard = (state: State): boolean =>
  state.isLoadingStudentClassesDashboard;

export const selectIsLoadingStudentSyllabus = (state: State): boolean =>
  state.isLoadingStudentSyllabus;

export const selectStudentResources = (state: State): boolean =>
  state.resources;

export const selectIsLoadingStudentResources = (state: State): boolean =>
  state.isLoadingStudentResources;

export const selectStudentResource = (state: State): boolean => state.resource;

export const selectIsLoadingStudentResource = (state: State): boolean =>
  state.isLoadingStudentResource;
