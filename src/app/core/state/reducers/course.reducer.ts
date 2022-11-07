import camelcaseKeys from 'camelcase-keys';
import { createReducer, on } from '@ngrx/store';
import * as tutorActions from '../actions/tutor.actions';
import * as courseActions from '../actions/course.actions';
import { ISubject, IField, ICourse, IProgram } from '@models';
import * as languageActions from '../actions/language-menu.actions';

export interface State {
  courses: any;
  courseRefund: any;
  isLoadingCourses: boolean;
  isRejectingCourse: boolean;
  isAcceptingCourse: boolean;
  isCancelingCourse: boolean;
  isReassigningTutor: boolean;
  loadingCoursesFailure: string;
  isLoadingRefundCourse: boolean;

  // Course by id
  course: any | null;
  isLoadingCourse: boolean;

  // Explore courses
  exploreCourses: ISubject[];
  exploreCoursesCount: number;
  isLoadingExploreCourses: boolean;
  exploreCoursesFieldsOfStudy: IField[];
  exploreCoursesProgram: IProgram | null;
}

export const initialState: State = {
  course: null,
  courses: null,
  courseRefund: null,
  exploreCourses: [],
  exploreCoursesCount: 0,
  isLoadingCourse: false,
  isLoadingCourses: false,
  isRejectingCourse: false,
  isAcceptingCourse: false,
  isCancelingCourse: false,
  isReassigningTutor: false,
  loadingCoursesFailure: '',
  exploreCoursesProgram: null,
  isLoadingRefundCourse: false,
  isLoadingExploreCourses: false,
  exploreCoursesFieldsOfStudy: []
};

export const reducer = createReducer(
  initialState,
  on(courseActions.loadCourses, state => ({
    ...state,
    isLoadingCourses: true
  })),

  on(courseActions.loadCoursesSuccess, (state, { courses }) => ({
    ...state,
    courses,
    isLoadingCourses: false
  })),

  on(courseActions.loadCoursesFailure, (state, { error }) => ({
    ...state,
    isLoadingCourses: false,
    loadingCoursesFailure: error?.message
  })),

  on(courseActions.loadCoursesEnded, state => ({
    ...state,
    isLoadingCourses: false
  })),

  on(courseActions.loadCourseById, state => ({
    ...state,
    isLoadingCourse: true
  })),

  on(courseActions.loadCourseByIdSuccess, (state, { course }) => ({
    ...state,
    course,
    isLoadingCourse: false
  })),

  on(courseActions.loadCourseByIdFailure, state => ({
    ...state,
    isLoadingCourse: false
  })),

  on(
    courseActions.studentRefundCourse,
    courseActions.studentRefundCourseClasses,
    state => ({
      ...state,
      isLoadingRefundCourse: true
    })
  ),

  on(
    courseActions.studentRefundCourseSuccess,
    courseActions.studentRefundCourseClassesSuccess,
    (state, { courseRefund }) => {
      const finalState: any = {
        ...state,
        courseRefund,
        isLoadingRefundCourse: false
      };

      if (finalState.courseRefund.hasOwnProperty('refundableClasses')) {
        const nonRefundableClasses = finalState.courseRefund?.nonRefundableClasses.map(
          (cls: any) => ({
            ...cls,
            isNonRefundable: true
          })
        );

        const refundableClasses = finalState.courseRefund?.refundableClasses.map(
          (cls: any) => ({
            ...cls,
            isNonRefundable: false
          })
        );

        finalState.courseRefund = {
          ...finalState.courseRefund,
          allClasses: [...nonRefundableClasses, ...refundableClasses]
        };
      }

      return finalState;
    }
  ),

  on(
    courseActions.studentRefundCourseFailure,
    courseActions.studentRefundCourseClassesFailure,
    state => ({
      ...state,
      isLoadingRefundCourse: false
    })
  ),

  on(courseActions.exploreCourses, state => ({
    ...state,
    isLoadingExploreCourses: true
  })),

  on(
    courseActions.exploreCoursesSuccess,
    (state, { exploreCourses, coursesCount, fieldsOfStudy, program }) => ({
      ...state,
      exploreCourses:
        exploreCourses && exploreCourses.length
          ? exploreCourses.map(course => ({
              ...course,
              name:
                localStorage.getItem('DEFAULT_LANGUAGE') === 'ar'
                  ? course?.nameAr
                  : course?.nameEn,
              description:
                localStorage.getItem('DEFAULT_LANGUAGE') === 'ar'
                  ? course?.descriptionAr
                  : course?.descriptionEn
            }))
          : [],
      isLoadingExploreCourses: false,
      exploreCoursesProgram: {
        ...program,
        name:
          localStorage.getItem('DEFAULT_LANGUAGE') === 'ar'
            ? program?.nameAr
            : program?.nameEn,
        title:
          localStorage.getItem('DEFAULT_LANGUAGE') === 'ar'
            ? program?.titleAr
            : program?.titleEn,
        description:
          localStorage.getItem('DEFAULT_LANGUAGE') === 'ar'
            ? program?.descriptionAr
            : program?.descriptionEn
      },
      exploreCoursesCount: coursesCount,
      exploreCoursesFieldsOfStudy:
        fieldsOfStudy && fieldsOfStudy.length
          ? fieldsOfStudy.map(field => ({
              ...field,
              name:
                localStorage.getItem('DEFAULT_LANGUAGE') === 'ar'
                  ? field?.nameAr
                  : field?.nameEn
            }))
          : []
    })
  ),

  on(courseActions.exploreCoursesFailure, state => ({
    ...state,
    isLoadingExploreCourses: false
  })),

  on(
    courseActions.tutorCancelCourse,
    courseActions.studentCancelCourse,
    state => ({
      ...state,
      isCancelingCourse: true
    })
  ),

  on(
    courseActions.tutorCancelCourseSuccess,
    courseActions.studentCancelCourseSuccess,
    state => ({
      ...state,
      isCancelingCourse: false
    })
  ),

  on(
    courseActions.tutorCancelCourseFailure,
    courseActions.studentCancelCourseFailure,
    state => ({
      ...state,
      isCancelingCourse: false
    })
  ),

  on(courseActions.tutorRejectCourse, state => ({
    ...state,
    isRejectingCourse: true
  })),

  on(courseActions.tutorRejectCourseSuccess, (state, { courseId }) => {
    let finalState = {
      ...state,
      isRejectingCourse: false
    };

    if (finalState?.courses?.newlyAssignedCourses) {
      const courses = {
        ...finalState.courses,
        newlyAssignedCourses: finalState.courses.newlyAssignedCourses.filter(
          (course: any) => course.id !== courseId
        )
      };

      finalState = {
        ...finalState,
        courses
      };
    }

    return finalState;
  }),

  on(courseActions.tutorRejectCourseFailure, state => ({
    ...state,
    isRejectingCourse: false
  })),

  on(courseActions.tutorAcceptCourse, state => ({
    ...state,
    isAcceptingCourse: true
  })),

  on(courseActions.tutorAcceptCourseSuccess, (state, { courseId }) => {
    let finalState = {
      ...state,
      isAcceptingCourse: false
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
        )
      };

      finalState = {
        ...finalState,
        courses
      };
    }

    return finalState;
  }),

  on(courseActions.tutorAcceptCourseFailure, state => ({
    ...state,
    isAcceptingCourse: false
  })),

  // update reschedule class in upcoming classes
  on(tutorActions.tutorRescheduleClassSuccess, (state, { body }) => {
    const finalState: any = {
      ...state
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
        upcomingClasses
      };
    }

    return finalState;
  }),

  on(courseActions.studentReassignTutor, state => ({
    ...state,
    isReassigningTutor: true
  })),

  on(courseActions.studentReassignTutorSuccess, state => ({
    ...state,
    isReassigningTutor: false
  })),

  on(courseActions.studentReassignTutorFailure, state => ({
    ...state,
    isReassigningTutor: false
  })),

  on(languageActions.changeLanguage, state => ({
    ...state,
    exploreCourses:
      state.exploreCourses && state.exploreCourses.length
        ? state.exploreCourses.map(course => ({
            ...course,
            name:
              localStorage.getItem('DEFAULT_LANGUAGE') === 'ar'
                ? course?.nameAr
                : course?.nameEn,
            description:
              localStorage.getItem('DEFAULT_LANGUAGE') === 'ar'
                ? course?.descriptionAr
                : course?.descriptionEn
          }))
        : [],
    exploreCoursesProgram: state.exploreCoursesProgram
      ? {
          ...state.exploreCoursesProgram,
          name:
            localStorage.getItem('DEFAULT_LANGUAGE') === 'ar'
              ? state.exploreCoursesProgram?.nameAr
              : state.exploreCoursesProgram?.nameEn,
          title:
            localStorage.getItem('DEFAULT_LANGUAGE') === 'ar'
              ? state.exploreCoursesProgram?.titleAr
              : state.exploreCoursesProgram?.titleEn,
          description:
            localStorage.getItem('DEFAULT_LANGUAGE') === 'ar'
              ? state.exploreCoursesProgram?.descriptionAr
              : state.exploreCoursesProgram?.descriptionEn
        }
      : null,
    exploreCoursesFieldsOfStudy:
      state.exploreCoursesFieldsOfStudy &&
      state.exploreCoursesFieldsOfStudy.length
        ? state.exploreCoursesFieldsOfStudy.map(field => ({
            ...field,
            name:
              localStorage.getItem('DEFAULT_LANGUAGE') === 'ar'
                ? field?.nameAr
                : field?.nameEn
          }))
        : []
  }))
);

export const selectCourses = (state: State): any => state.courses;

export const selectCourseById = (state: State): ICourse | null => state.course;

export const selectStudentCourseRefund = (state: State): ICourse | null =>
  state.courseRefund;

export const selectIsLoadingRefundCourse = (state: State): any =>
  state.isLoadingRefundCourse;

export const selectExploreCourses = (state: State): any => state.exploreCourses;

export const selectIsLoadingExploreCourses = (state: State): boolean =>
  state.isLoadingExploreCourses;

export const selectExploreCoursesCount = (state: State): number =>
  state.exploreCoursesCount;

export const selectExploreCoursesFieldsOfStudy = (state: State): IField[] =>
  state.exploreCoursesFieldsOfStudy;

export const selectExploreCoursesProgram = (state: State): IProgram | null =>
  state.exploreCoursesProgram;

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

export const selectCancelledCourses = (state: State): any =>
  state?.courses?.cancelledCourses;

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

export const selectIsReassigningTutor = (state: State): any =>
  state.isReassigningTutor;
