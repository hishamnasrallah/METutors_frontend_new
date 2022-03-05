import { createReducer, on } from '@ngrx/store';

import { ICourse } from '@models';
import * as courseActions from '../actions/course.actions';

export interface State {
  isLoadingCourses: boolean;
  loadingCoursesFailure: string;
  courses: ICourse[] | null;

  // Course by id
  course: ICourse | null;
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
    loadingCoursesFailure: error.message,
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

export const selectCourses = (state: State): ICourse[] | null => state.courses;
export const selectCourseById = (state: State): ICourse | null => state.course;

export const selectIsLoadingCourses = (state: State): boolean =>
  state.isLoadingCourses;

export const selectIsLoadingCourseById = (state: State): boolean =>
  state.isLoadingCourse;

export const selectNewCourses = (
  state: State
): ICourse[] | null | undefined => {
  return state.courses?.filter((course) => course.status !== 'completed');
};

export const selectActiveCourses = (
  state: State
): ICourse[] | null | undefined => {
  return state.courses?.filter((course) => course.status !== 'completed');
};

export const selectCompletedCourses = (
  state: State
): ICourse[] | null | undefined => {
  return state.courses?.filter((course) => course.status !== 'completed');
};
