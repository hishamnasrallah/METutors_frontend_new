import { createReducer, on } from '@ngrx/store';

import { ICourse } from '@models';
import * as courseActions from '../actions/course.actions';

export interface State {
  courses: any;
  isLoadingCourses: boolean;
  isRejectingCourse: boolean;
  isAcceptingCourse: boolean;
  isCancelingCourse: boolean;
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
  isRejectingCourse: false,
  isAcceptingCourse: false,
  isCancelingCourse: false,
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
  })),

  on(courseActions.tutorCancelCourse, (state) => ({
    ...state,
    isCancelingCourse: true,
  })),

  on(courseActions.tutorCancelCourseSuccess, (state) => ({
    ...state,
    isCancelingCourse: false,
  })),

  on(courseActions.tutorCancelCourseFailure, (state) => ({
    ...state,
    isCancelingCourse: false,
  })),

  on(courseActions.tutorRejectCourse, (state) => ({
    ...state,
    isRejectingCourse: true,
  })),

  on(courseActions.tutorRejectCourseSuccess, (state, { courseId }) => {
    let finalState = {
      ...state,
      isRejectingCourse: false,
    };

    if (finalState?.courses?.newlyAssignedCourses) {
      const courses = {
        ...finalState.courses,
        newlyAssignedCourses: finalState.courses.newlyAssignedCourses.filter(
          (course: any) => course.id !== courseId
        ),
      };

      finalState = {
        ...finalState,
        courses,
      };
    }

    return finalState;
  }),

  on(courseActions.tutorRejectCourseFailure, (state) => ({
    ...state,
    isRejectingCourse: false,
  })),

  on(courseActions.tutorAcceptCourse, (state) => ({
    ...state,
    isAcceptingCourse: true,
  })),

  on(courseActions.tutorAcceptCourseSuccess, (state, { courseId }) => {
    let finalState = {
      ...state,
      isAcceptingCourse: false,
    };

    if (finalState?.courses?.newlyAssignedCourses) {
      const acceptedCourse = finalState.courses.newlyAssignedCourses.find(
        (course: any) => course.id === courseId
      );

      const activeCourses = [...finalState.courses.activeCourses];
      activeCourses.unshift(acceptedCourse);

      const courses = {
        ...finalState.courses,
        activeCourses,
        newlyAssignedCourses: finalState.courses.newlyAssignedCourses.filter(
          (course: any) => course.id !== courseId
        ),
      };

      finalState = {
        ...finalState,
        courses,
      };
    }

    return finalState;
  }),

  on(courseActions.tutorAcceptCourseFailure, (state) => ({
    ...state,
    isAcceptingCourse: false,
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

export const selectIsRejectingCourse = (state: State): any =>
  state.isRejectingCourse;

export const selectIsAcceptingCourse = (state: State): any =>
  state.isAcceptingCourse;

export const selectIsCancelingCourse = (state: State): any =>
  state.isCancelingCourse;
