import { createReducer, on } from '@ngrx/store';

import { ITutor } from '@models';
import * as tutorActions from '../actions/tutor.actions';
import * as uploadActions from '../actions/upload.actions';
import * as courseActions from '../actions/course.actions';

export interface State {
  dashboard: any;
  attendance: any;
  feedbackOptions: any;
  tutor: ITutor | null;
  tutors: ITutor[] | null;
  isLoadingTutor: boolean;
  isLoadingTutors: boolean;
  isLaunchingClass: boolean;
  isLoadingDashboard: boolean;
  loadingTutorFailure: string;
  loadingTutorsFailure: string;
  isSubmittingFeedback: boolean;
  isLoadingTutorAttendance: boolean;
  isLoadingTutorFeedbackOptions: boolean;

  // Loading Profile Tutor
  isLoadingProfileTutor: boolean;
  profileTutor: ITutor | null;

  // Complete Tutor Profile
  isCompleteTutorProfile: boolean;
  completeTutorProfileFailure: string;

  // Update Tutor Profile
  isUpdateTutorProfile: boolean;
  updateTutorProfileFailure?: string;

  // Change Tutor Avatar
  isChangeTutorCover: boolean;

  // Submit Interview Request
  isSubmittingInterview: boolean;
  SubmitInterviewFailure?: string;
}

export const initialState: State = {
  tutor: null,
  tutors: null,
  dashboard: null,
  attendance: null,
  profileTutor: null,
  feedbackOptions: null,
  isLoadingTutor: false,
  isLoadingTutors: false,
  isLaunchingClass: false,
  loadingTutorFailure: '',
  loadingTutorsFailure: '',
  isLoadingDashboard: false,
  isChangeTutorCover: false,
  isSubmittingFeedback: false,
  isUpdateTutorProfile: false,
  isSubmittingInterview: false,
  isLoadingProfileTutor: false,
  isCompleteTutorProfile: false,
  isLoadingTutorAttendance: false,
  completeTutorProfileFailure: '',
  isLoadingTutorFeedbackOptions: false,
};

export const reducer = createReducer(
  initialState,
  on(tutorActions.loadTutor, (state) => ({
    ...state,
    isLoadingTutor: true,
  })),

  on(tutorActions.loadTutorSuccess, (state, { tutor }) => ({
    ...state,
    tutor,
    isLoadingTutor: false,
  })),

  on(tutorActions.loadTutorFailure, (state, { error }) => ({
    ...state,
    isLoadingTutor: false,
    loadingTutorFailure: error,
  })),

  on(tutorActions.loadProfileTutor, (state) => ({
    ...state,
    isLoadingProfileTutor: true,
  })),

  on(tutorActions.loadProfileTutorSuccess, (state, { tutor }) => ({
    ...state,
    profileTutor: tutor,
    isLoadingProfileTutor: false,
  })),

  on(tutorActions.loadProfileTutorFailure, (state, { error }) => ({
    ...state,
    isLoadingProfileTutor: false,
    loadingProfileTutorFailure: error,
  })),

  on(tutorActions.loadProfileTutorEnded, (state) => ({
    ...state,
    isLoadingProfileTutor: false,
  })),

  on(tutorActions.loadTutors, (state) => ({
    ...state,
    isLoadingTutors: true,
  })),

  on(tutorActions.loadTutorsSuccess, (state, { tutors }) => ({
    ...state,
    tutors,
    isLoadingTutors: false,
  })),

  on(tutorActions.loadTutorsFailure, (state, { error }) => ({
    ...state,
    isLoadingTutors: false,
    loadingTutorsFailure: error,
  })),

  on(tutorActions.submitInterview, (state) => ({
    ...state,
    isSubmittingInterview: true,
  })),

  on(tutorActions.submitInterviewSuccess, (state) => ({
    ...state,
    isSubmittingInterview: false,
  })),

  on(tutorActions.submitInterviewFailure, (state) => ({
    ...state,
    isSubmittingInterview: false,
  })),

  on(tutorActions.loadTutorsEnded, (state) => ({
    ...state,
    isLoadingTutors: false,
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

  on(tutorActions.updateTutorProfile, (state) => ({
    ...state,
    isUpdateTutorProfile: true,
  })),

  on(tutorActions.updateTutorProfileSuccess, (state) => ({
    ...state,
    isUpdateTutorProfile: false,
  })),

  on(tutorActions.updateTutorProfileFailure, (state, { error }) => ({
    ...state,
    isUpdateTutorProfile: false,
    updateTutorProfileFailure: error,
  })),

  on(uploadActions.changeAvatarSuccess, (state, { avatar }) => ({
    ...state,
    profileTutor: state.profileTutor ? { ...state.profileTutor, avatar } : null,
  })),

  on(tutorActions.changeTutorCover, (state) => ({
    ...state,
    isChangeTutorCover: true,
  })),

  on(tutorActions.changeTutorCoverSuccess, (state, { cover }) => ({
    ...state,
    isChangeTutorCover: false,
    profileTutor: state.profileTutor ? { ...state.profileTutor, cover } : null,
  })),

  on(tutorActions.changeTutorCoverFailure, (state, { error }) => ({
    ...state,
    isChangeTutorCover: false,
  })),

  // On accept/reject course filter out rejected course
  on(
    courseActions.tutorAcceptCourseSuccess,
    courseActions.tutorRejectCourseSuccess,
    (state, { courseId }) => {
      let finalState = {
        ...state,
      };

      if (finalState?.dashboard?.newlyAssignedCourses) {
        const dashboard = {
          ...finalState.dashboard,
          newlyAssignedCourses:
            finalState.dashboard.newlyAssignedCourses.filter(
              (course: any) => course.id !== courseId
            ),
        };

        finalState = {
          ...finalState,
          dashboard,
        };
      }

      return finalState;
    }
  ),

  on(tutorActions.tutorLaunchClass, (state) => ({
    ...state,
    isLaunchingClass: true,
  })),

  on(tutorActions.tutorLaunchClassSuccess, (state) => ({
    ...state,
    isLaunchingClass: false,
  })),

  on(tutorActions.tutorLaunchClassFailure, (state) => ({
    ...state,
    isLaunchingClass: false,
  })),

  on(tutorActions.loadTutorAttendance, (state) => ({
    ...state,
    isLoadingTutorAttendance: true,
  })),

  on(tutorActions.loadTutorAttendanceSuccess, (state, { attendance }) => ({
    ...state,
    attendance,
    isLoadingTutorAttendance: false,
  })),

  on(tutorActions.loadTutorAttendanceFailure, (state) => ({
    ...state,
    isLoadingTutorAttendance: false,
  })),

  on(
    tutorActions.loadTutorFeedbackOptions,
    tutorActions.loadTutorFeedbackPlatformOptions,
    (state) => ({
      ...state,
      isLoadingTutorFeedbackOptions: true,
    })
  ),

  on(
    tutorActions.loadTutorFeedbackOptionsSuccess,
    tutorActions.loadTutorFeedbackPlatformOptionsSuccess,
    (state, { feedbackOptions }) => ({
      ...state,
      feedbackOptions,
      isLoadingTutorFeedbackOptions: false,
    })
  ),

  on(
    tutorActions.loadTutorFeedbackOptionsFailure,
    tutorActions.loadTutorFeedbackPlatformOptionsFailure,
    (state) => ({
      ...state,
      isLoadingTutorFeedbackOptions: false,
    })
  ),

  on(
    tutorActions.tutorSubmitFeedback,
    tutorActions.tutorSubmitPlatformFeedback,
    (state) => ({
      ...state,
      isSubmittingFeedback: true,
    })
  ),

  on(
    tutorActions.tutorSubmitFeedbackSuccess,
    tutorActions.tutorSubmitPlatformFeedbackSuccess,
    (state) => ({
      ...state,
      isSubmittingFeedback: false,
    })
  ),

  on(
    tutorActions.tutorSubmitFeedbackFailure,
    tutorActions.tutorSubmitPlatformFeedbackFailure,
    (state) => ({
      ...state,
      isSubmittingFeedback: false,
    })
  )
);

export const selectTutor = (state: State): ITutor | null => state.tutor;

export const selectProfileTutor = (state: State): ITutor | null =>
  state.profileTutor;

export const selectTutorDashboard = (state: State): boolean => state.dashboard;

export const selectIsLoadingTutor = (state: State): boolean =>
  state.isLoadingTutor;

export const selectIsLoadingProfileTutor = (state: State): boolean =>
  state.isLoadingProfileTutor;

export const selectTutors = (state: State): ITutor[] | null => state.tutors;

export const selectIsLoadingTutors = (state: State): boolean =>
  state.isLoadingTutors;

export const selectIsLoadingTutorDashboard = (state: State): boolean =>
  state.isLoadingDashboard;

export const selectIsCompleteTutorProfile = (state: State): boolean =>
  state.isCompleteTutorProfile;

export const selectIsUpdateTutorProfile = (state: State): boolean =>
  state.isUpdateTutorProfile;

export const selectIsChangeTutorCover = (state: State): boolean =>
  state.isChangeTutorCover;

export const selectIsSubmittingInterview = (state: State): boolean =>
  state.isSubmittingInterview;

export const selectIsLaunchingClass = (state: State): boolean =>
  state.isLaunchingClass;

export const selectTutorAttendance = (state: State): any => state.attendance;

export const selectIsLoadingTutorAttendance = (state: State): boolean =>
  state.isLoadingTutorAttendance;

export const selectTutorFeedbackOptions = (state: State): any =>
  state.feedbackOptions;

export const selectIsLoadingTutorFeedbackOptions = (state: State): boolean =>
  state.isLoadingTutorFeedbackOptions;

export const selectIsSubmittingTutorFeedback = (state: State): boolean =>
  state.isSubmittingFeedback;

export const selectFilteredTutors = (
  state: State,
  props?: any
): ITutor[] | null => {
  let tutors: ITutor[] = [];

  if (state.tutors && state.tutors.length && props) {
    tutors = getFilteredTutors(state.tutors, props);
  }

  return tutors;
};

const getFilteredTutors = (tutors: ITutor[], props: any) => {
  if (props?.name) {
    tutors = tutors?.filter((tutor) =>
      tutor?.name?.toLowerCase()?.includes(props.name.toLowerCase())
    );
  }

  return tutors;
};
