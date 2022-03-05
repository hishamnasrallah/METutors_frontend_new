import { createReducer, on } from '@ngrx/store';

import { ICourse } from '@models';
import * as courseActions from '../actions/course.actions';

export interface State {
  isLoadingCourses: boolean;
  loadingCoursesFailure: string;
  courses: ICourse[] | null;
}

export const initialState: State = {
  courses: null,
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
  }))
);

export const selectCourses = (state: State): ICourse[] | null => state.courses;

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

export const selectIsLoadingCourses = (state: State): boolean =>
  state.isLoadingCourses;
