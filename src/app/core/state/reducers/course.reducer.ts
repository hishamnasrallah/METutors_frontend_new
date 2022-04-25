import { createReducer, on } from '@ngrx/store';

import { ICourse } from '@models';
import camelcaseKeys from 'camelcase-keys';
import * as tutorActions from '../actions/tutor.actions';
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

  // Explore courses
  exploredCourses: any;
  isLoadingExploreCourses: boolean;
}

export const initialState: State = {
  course: null,
  courses: null,
  exploredCourses: null,
  isLoadingCourse: false,
  isLoadingCourses: false,
  isRejectingCourse: false,
  isAcceptingCourse: false,
  isCancelingCourse: false,
  loadingCoursesFailure: '',
  isLoadingExploreCourses: false,
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

  on(courseActions.exploreCourses, (state) => ({
    ...state,
    isLoadingExploreCourses: true,
  })),

  on(courseActions.exploreCoursesSuccess, (state, { exploredCourses }) => ({
    ...state,
    exploredCourses,
    isLoadingExploreCourses: false,
  })),

  on(courseActions.exploreCoursesFailure, (state) => ({
    ...state,
    isLoadingExploreCourses: false,
  })),

  on(
    courseActions.tutorCancelCourse,
    courseActions.studentCancelCourse,
    (state) => ({
      ...state,
      isCancelingCourse: true,
    })
  ),

  on(
    courseActions.tutorCancelCourseSuccess,
    courseActions.studentCancelCourseSuccess,
    (state) => ({
      ...state,
      isCancelingCourse: false,
    })
  ),

  on(
    courseActions.tutorCancelCourseFailure,
    courseActions.studentCancelCourseFailure,
    (state) => ({
      ...state,
      isCancelingCourse: false,
    })
  ),

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
  })),

  // update reschedule class in upcoming classes
  on(tutorActions.tutorRescheduleClassSuccess, (state, { body }) => {
    const finalState = {
      ...state,
    };

    if (
      finalState.course?.upcomingClasses &&
      finalState.course?.upcomingClasses?.length
    ) {
      const upcomingClasses = finalState.course.upcomingClasses.map(
        (upComingClass: any) =>
          upComingClass.id === body.academic_class_id
            ? { ...upComingClass, ...camelcaseKeys(body) }
            : upComingClass
      );

      finalState.course = {
        ...finalState.course,
        upcomingClasses,
      };
    }

    return finalState;
  })
);

export const selectCourses = (state: State): any => state.courses;

export const selectCourseById = (state: State): ICourse | null => state.course;

export const selectExploredCourses = (state: State): any =>
  state.exploredCourses;

export const selectIsLoadingExploredCourses = (state: State): boolean =>
  state.isLoadingExploreCourses;

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

export const selectFilteredExploredCourses = (
  state: State,
  props?: any
): any => {
  let exploredCourses: any = state.exploredCourses;

  if (state.exploredCourses && props) {
    exploredCourses = {
      subjects: getFilteredExploredCourses(
        state.exploredCourses?.subjects,
        props
      ),
      fieldOfStudies: state.exploredCourses?.fieldOfStudies,
    };
  }

  return exploredCourses;
};

const getFilteredExploredCourses = (exploredCourses: any[], props: any) => {
  if (props?.name) {
    exploredCourses = exploredCourses?.filter((course) =>
      course?.name.toLowerCase().includes(props.name.toLowerCase())
    );
  }

  if (props?.fieldIds && props?.fieldIds?.length) {
    exploredCourses = exploredCourses.filter((course) =>
      props?.fieldIds?.includes(course?.fieldId)
    );
  }

  return exploredCourses;
};
