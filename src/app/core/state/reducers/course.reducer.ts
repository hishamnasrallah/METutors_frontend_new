import { createReducer, on } from '@ngrx/store';

import { ICourse } from '@models';
import * as courseActions from '../actions/course.actions';

export interface State {
  courses: any;
  isLoadingCourses: boolean;
  loadingCoursesFailure: string;

  // Course by id
  course: any | null;
  isLoadingCourse: boolean;
}

export const initialState: State = {
  course: null,
  courses: null,
  isLoadingCourse: false,
  isLoadingCourses: false,
  loadingCoursesFailure: '',
};

export const reducer = createReducer(
  initialState,
  on(courseActions.loadCourses, (state) => ({
    ...state,
    isLoadingCourses: true,
  })),

  on(courseActions.loadCoursesSuccess, (state, { courses }) => ({
    ...state,
    courses,
    isLoadingCourses: false,
  })),

  on(courseActions.loadCoursesFailure, (state, { error }) => ({
    ...state,
    isLoadingCourses: false,
    loadingCoursesFailure: error?.message,
  })),

  on(courseActions.loadCoursesEnded, (state) => ({
    ...state,
    isLoadingCourses: false,
  })),

  on(courseActions.loadCourseById, (state) => ({
    ...state,
    isLoadingCourse: true,
  })),

  on(courseActions.loadCourseByIdSuccess, (state, { course }) => ({
    ...state,
    course,
    isLoadingCourse: false,
  })),

  on(courseActions.loadCourseByIdFailure, (state) => ({
    ...state,
    isLoadingCourse: false,
  }))
);

export const selectCourses = (state: State): any => state.courses;
export const selectCourseById = (state: State): ICourse | null => state.course;

export const selectIsLoadingCourses = (state: State): boolean =>
  state.isLoadingCourses;

export const selectIsLoadingCourseById = (state: State): boolean =>
  state.isLoadingCourse;

export const selectNewCourses = (state: State): any =>
  state.courses?.newlyAssignedCourses;

export const selectActiveCourses = (state: State): any =>
  state.courses?.activeCourses;

export const selectCompletedCourses = (state: State): any =>
  state?.courses?.completedCourses;

export const selectCoursePrograms = (state: State): any =>
  state?.courses?.programs;

export const selectCourseFieldOfStudies = (state: State): any =>
  state?.courses?.fieldOfStudies;
