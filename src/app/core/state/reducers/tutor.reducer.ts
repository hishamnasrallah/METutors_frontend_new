import { IField, ITutor } from '@models';
import { TutorStatus } from '@metutor/config';
import { createReducer, on } from '@ngrx/store';
import * as tutorActions from '../actions/tutor.actions';
import * as uploadActions from '../actions/upload.actions';
import * as courseActions from '../actions/course.actions';
import * as languageActions from '../actions/language-menu.actions';

export interface State {
  dashboard: any;
  attendance: any;
  kudosPoints: any;
  tutorsCounts: any;
  signature: string;
  feedbackOptions: any;
  tutor: ITutor | null;
  tutors: ITutor[] | null;
  isLoadingTutor: boolean;
  isLoadingTutors: boolean;
  isLaunchingClass: boolean;
  isLoadingDashboard: boolean;
  loadingTutorFailure: string;
  loadingTutorsFailure: string;
  isReschedulingClass: boolean;
  isSubmittingFeedback: boolean;
  isLoadingKudosPoints: boolean;
  availableTutors: ITutor[] | null;
  isLoadingAvailableTutors: boolean;
  isLoadingTutorAttendance: boolean;
  isLoadingTutorFeedbackOptions: boolean;

  // Explore tutors
  exploreTutors: ITutor[];
  exploreTutorsCount: number;
  isLoadingExploreTutors: boolean;
  exploreTutorsFieldsOfStudy: IField[];

  // Loading Profile Tutor
  isLoadingProfileTutor: boolean;
  profileTutor: ITutor | null;

  // Complete Tutor Profile
  isCompleteTutorProfile: boolean;
  completeTutorProfileFailure: string;

  // Update Tutor Profile
  isUpdateTutorProfile: boolean;
  updateTutorProfileFailure?: string;

  // Change Tutor Status
  isChangeTutorStatus: boolean;

  // Submit Interview Request
  isSubmittingInterview: boolean;
  SubmitInterviewFailure?: string;

  // Loading Tutors
  currentTutors: ITutor[] | null;
  pendingTutors: ITutor[] | null;
  rejectedTutors: ITutor[] | null;
  isLoadingCurrentTutors: boolean;
  isLoadingPendingTutors: boolean;
  suspendedTutors: ITutor[] | null;
  isLoadingSuspendedTutors: boolean;

  // Load Featured Tutors
  featuredTutors: ITutor[] | null;
  isLoadingFeaturedTutors: boolean;
  subjectFeaturedTutors: ITutor[] | null;
  isLoadingSubjectFeaturedTutors: boolean;

  // loading
  loading: boolean;
}

export const initialState: State = {
  tutor: null,
  tutors: null,
  signature: '',
  loading: false,
  dashboard: null,
  attendance: null,
  kudosPoints: null,
  exploreTutors: [],
  profileTutor: null,
  featuredTutors: [],
  currentTutors: null,
  pendingTutors: null,
  rejectedTutors: null,
  feedbackOptions: null,
  exploreTutorsCount: 0,
  suspendedTutors: null,
  isLoadingTutor: false,
  availableTutors: null,
  isLoadingTutors: false,
  isLaunchingClass: false,
  loadingTutorFailure: '',
  loadingTutorsFailure: '',
  isLoadingDashboard: false,
  subjectFeaturedTutors: [],
  isChangeTutorStatus: false,
  isReschedulingClass: false,
  isLoadingKudosPoints: false,
  isSubmittingFeedback: false,
  isUpdateTutorProfile: false,
  isSubmittingInterview: false,
  isLoadingProfileTutor: false,
  isLoadingExploreTutors: false,
  isCompleteTutorProfile: false,
  isLoadingCurrentTutors: false,
  isLoadingPendingTutors: false,
  isLoadingFeaturedTutors: false,
  exploreTutorsFieldsOfStudy: [],
  isLoadingTutorAttendance: false,
  isLoadingAvailableTutors: false,
  isLoadingSuspendedTutors: false,
  completeTutorProfileFailure: '',
  isLoadingTutorFeedbackOptions: false,
  isLoadingSubjectFeaturedTutors: false,
  tutorsCounts: {
    pendingCount: 0,
    rejectedCount: 0
  }
};

export const reducer = createReducer(
  initialState,
  on(tutorActions.loadTutor, state => ({
    ...state,
    isLoadingTutor: true
  })),

  on(tutorActions.loadTutorSuccess, (state, { tutor }) => ({
    ...state,
    tutor,
    isLoadingTutor: false
  })),

  on(tutorActions.loadTutorFailure, (state, { error }) => ({
    ...state,
    isLoadingTutor: false,
    loadingTutorFailure: error
  })),

  on(tutorActions.loadAdminTutor, state => ({
    ...state,
    isLoadingTutor: true
  })),

  on(tutorActions.loadAdminTutorSuccess, (state, { tutor }) => ({
    ...state,
    tutor,
    isLoadingTutor: false
  })),

  on(tutorActions.loadAdminTutorFailure, (state, { error }) => ({
    ...state,
    isLoadingTutor: false,
    loadingTutorFailure: error
  })),

  on(tutorActions.loadAvailableTutors, state => ({
    ...state,
    isLoadingAvailableTutors: true
  })),

  on(tutorActions.loadAvailableTutorsSuccess, (state, { availableTutors }) => ({
    ...state,
    availableTutors,
    isLoadingAvailableTutors: false
  })),

  on(tutorActions.loadAvailableTutorsFailure, state => ({
    ...state,
    isLoadingAvailableTutors: false
  })),

  on(tutorActions.loadProfileTutor, state => ({
    ...state,
    isLoadingProfileTutor: true
  })),

  on(tutorActions.loadProfileTutorSuccess, (state, { tutor }) => ({
    ...state,
    profileTutor: tutor,
    isLoadingProfileTutor: false
  })),

  on(tutorActions.loadProfileTutorFailure, (state, { error }) => ({
    ...state,
    isLoadingProfileTutor: false,
    loadingProfileTutorFailure: error
  })),

  on(tutorActions.loadTutors, state => ({
    ...state,
    isLoadingTutors: true
  })),

  on(tutorActions.loadTutorsSuccess, (state, { tutors, tutorsCounts }) => ({
    ...state,
    tutors,
    tutorsCounts: {
      ...state.tutorsCounts,
      ...tutorsCounts
    },
    isLoadingTutors: false
  })),

  on(tutorActions.loadTutorsFailure, (state, { error }) => ({
    ...state,
    isLoadingTutors: false,
    loadingTutorsFailure: error
  })),

  on(tutorActions.loadCurrentTutors, state => ({
    ...state,
    isLoadingCurrentTutors: true
  })),

  on(
    tutorActions.loadCurrentTutorsSuccess,
    (state, { currentTutors, tutorsCounts }) => ({
      ...state,
      currentTutors,
      currentActiveTutors: currentTutors.filter(
        tutor => tutor?.status === TutorStatus.active
      ),
      currentInactiveTutors: currentTutors.filter(
        tutor => tutor?.status === TutorStatus.deactive
      ),
      tutorsCounts: {
        ...state.tutorsCounts,
        ...tutorsCounts
      },
      isLoadingCurrentTutors: false
    })
  ),

  on(tutorActions.loadCurrentTutorsFailure, state => ({
    ...state,
    isLoadingCurrentTutors: false
  })),

  on(tutorActions.loadPendingTutors, state => ({
    ...state,
    isLoadingPendingTutors: true
  })),

  on(
    tutorActions.loadPendingTutorsSuccess,
    (state, { pendingTutors, rejectedTutors, tutorsCounts }) => ({
      ...state,
      pendingTutors,
      rejectedTutors,
      tutorsCounts: {
        ...state.tutorsCounts,
        ...tutorsCounts
      },
      isLoadingPendingTutors: false
    })
  ),

  on(tutorActions.loadPendingTutorsFailure, state => ({
    ...state,
    isLoadingPendingTutors: false
  })),

  on(tutorActions.loadSuspendedTutors, state => ({
    ...state,
    isLoadingSuspendedTutors: true
  })),

  on(
    tutorActions.loadSuspendedTutorsSuccess,
    (state, { tutorsCounts, suspendedTutors }) => ({
      ...state,
      tutorsCounts,
      suspendedTutors,
      isLoadingSuspendedTutors: false
    })
  ),

  on(tutorActions.loadSuspendedTutorsFailure, state => ({
    ...state,
    isLoadingSuspendedTutors: false
  })),

  on(tutorActions.submitInterview, state => ({
    ...state,
    isSubmittingInterview: true
  })),

  on(tutorActions.submitInterviewSuccess, (state, { interviewRequest }) => ({
    ...state,
    isSubmittingInterview: false,
    profileTutor: state.profileTutor
      ? { ...state.profileTutor, interviewRequest }
      : null
  })),

  on(tutorActions.submitInterviewFailure, state => ({
    ...state,
    isSubmittingInterview: false
  })),

  on(tutorActions.loadTutorDashboard, state => ({
    ...state,
    isLoadingDashboard: true
  })),

  on(tutorActions.loadTutorDashboardSuccess, (state, { dashboard }) => ({
    ...state,
    dashboard,
    isLoadingDashboard: false
  })),

  on(tutorActions.loadTutorDashboardFailure, (state, { error }) => ({
    ...state,
    isLoadingDashboard: false
  })),

  on(tutorActions.loadTutorDashboardEnded, state => ({
    ...state,
    isLoadingDashboard: false
  })),

  on(tutorActions.completeTutorProfile, state => ({
    ...state,
    isCompleteTutorProfile: true
  })),

  on(tutorActions.completeTutorProfileSuccess, (state, { profileTutor }) => ({
    ...state,
    isCompleteTutorProfile: false,
    profileTutor
  })),

  on(tutorActions.completeTutorProfileFailure, (state, { error }) => ({
    ...state,
    isCompleteTutorProfile: false,
    completeTutorProfileFailure: error
  })),

  on(
    tutorActions.updateTutorProfile,
    tutorActions.updateTutorPreferences,
    tutorActions.updateTutorProfileRates,
    state => ({
      ...state,
      isUpdateTutorProfile: true
    })
  ),

  on(
    tutorActions.updateTutorProfileSuccess,
    tutorActions.updateTutorProfileRatesSuccess,
    (state, { profileTutor }) => ({
      ...state,
      isUpdateTutorProfile: false,
      profileTutor
    })
  ),

  on(tutorActions.updateTutorPreferencesSuccess, (state, { preferences }) => ({
    ...state,
    isUpdateTutorProfile: false,
    profileTutor: state.profileTutor
      ? { ...state.profileTutor, preferences }
      : null
  })),

  on(
    tutorActions.updateTutorProfileFailure,
    tutorActions.updateTutorPreferencesFailure,
    tutorActions.updateTutorProfileRatesFailure,
    (state, { error }) => ({
      ...state,
      isUpdateTutorProfile: false,
      updateTutorProfileFailure: error
    })
  ),

  on(uploadActions.changeAvatarSuccess, (state, { avatar }) => ({
    ...state,
    profileTutor: state.profileTutor ? { ...state.profileTutor, avatar } : null
  })),

  on(uploadActions.changeCoverSuccess, (state, { cover }) => ({
    ...state,
    profileTutor: state.profileTutor ? { ...state.profileTutor, cover } : null
  })),

  on(uploadActions.changeVideoSuccess, (state, { video }) => {
    const finalState = {
      ...state
    };

    if (finalState.profileTutor?.qualifications) {
      const qualifications = {
        ...finalState.profileTutor.qualifications,
        video
      };

      finalState.profileTutor = {
        ...finalState.profileTutor,
        qualifications
      };
    }

    return finalState;
  }),

  on(tutorActions.exploreTutors, state => ({
    ...state,
    isLoadingExploreTutors: true
  })),

  on(
    tutorActions.exploreTutorsSuccess,
    (state, { tutors, tutorsCount, fieldsOfStudy }) => ({
      ...state,
      exploreTutors: tutors,
      exploreTutorsCount: tutorsCount,
      isLoadingExploreTutors: false,
      exploreTutorsFieldsOfStudy:
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

  on(tutorActions.exploreTutorsFailure, state => ({
    ...state,
    isLoadingExploreTutors: false
  })),

  on(tutorActions.changeTutorStatus, state => ({
    ...state,
    isChangeTutorStatus: true
  })),

  on(tutorActions.changeTutorStatusSuccess, (state, { tutorId, status }) => ({
    ...state,
    isChangeTutorStatus: false,
    tutors:
      state.tutors && state.tutors.length
        ? state.tutors?.map(tutor =>
            tutor.id === tutorId ? { ...tutor, status } : { ...tutor }
          )
        : [],
    tutor: state.tutor
      ? {
          ...state.tutor,
          status
        }
      : null
  })),

  on(tutorActions.changeTutorStatusFailure, (state, { error }) => ({
    ...state,
    isChangeTutorStatus: false
  })),

  // On accept/reject course filter out rejected course
  on(
    courseActions.tutorAcceptCourseSuccess,
    courseActions.tutorRejectCourseSuccess,
    (state, { courseId }) => {
      let finalState = {
        ...state
      };

      if (finalState?.dashboard?.newlyAssignedCourses) {
        const dashboard = {
          ...finalState.dashboard,
          newlyAssignedCourses: finalState.dashboard.newlyAssignedCourses.filter(
            (course: any) => course.id !== courseId
          )
        };

        finalState = {
          ...finalState,
          dashboard
        };
      }

      return finalState;
    }
  ),

  on(tutorActions.tutorLaunchClass, state => ({
    ...state,
    isLaunchingClass: true
  })),

  on(tutorActions.tutorLaunchClassSuccess, state => ({
    ...state,
    isLaunchingClass: false
  })),

  on(tutorActions.tutorLaunchClassFailure, state => ({
    ...state,
    isLaunchingClass: false
  })),

  on(tutorActions.loadTutorAttendance, state => ({
    ...state,
    isLoadingTutorAttendance: true
  })),

  on(tutorActions.loadTutorAttendanceSuccess, (state, { attendance }) => ({
    ...state,
    attendance,
    isLoadingTutorAttendance: false
  })),

  on(tutorActions.loadTutorAttendanceFailure, state => ({
    ...state,
    isLoadingTutorAttendance: false
  })),

  on(
    tutorActions.loadTutorFeedbackOptions,
    tutorActions.loadTutorFeedbackPlatformOptions,
    state => ({
      ...state,
      isLoadingTutorFeedbackOptions: true
    })
  ),

  on(
    tutorActions.loadTutorFeedbackOptionsSuccess,
    tutorActions.loadTutorFeedbackPlatformOptionsSuccess,
    (state, { feedbackOptions }) => ({
      ...state,
      feedbackOptions,
      isLoadingTutorFeedbackOptions: false
    })
  ),

  on(
    tutorActions.loadTutorFeedbackOptionsFailure,
    tutorActions.loadTutorFeedbackPlatformOptionsFailure,
    state => ({
      ...state,
      isLoadingTutorFeedbackOptions: false
    })
  ),

  on(
    tutorActions.tutorSubmitFeedback,
    tutorActions.tutorSubmitPlatformFeedback,
    state => ({
      ...state,
      isSubmittingFeedback: true
    })
  ),

  on(
    tutorActions.tutorSubmitFeedbackSuccess,
    tutorActions.tutorSubmitPlatformFeedbackSuccess,
    state => ({
      ...state,
      isSubmittingFeedback: false
    })
  ),

  on(
    tutorActions.tutorSubmitFeedbackFailure,
    tutorActions.tutorSubmitPlatformFeedbackFailure,
    state => ({
      ...state,
      isSubmittingFeedback: false
    })
  ),

  // Reschedule class
  on(tutorActions.tutorRescheduleClass, state => ({
    ...state,
    isReschedulingClass: true
  })),

  on(tutorActions.tutorRescheduleClassSuccess, (state, { body }) => ({
    ...state,
    isReschedulingClass: false
  })),

  on(tutorActions.tutorRescheduleClassFailure, state => ({
    ...state,
    isReschedulingClass: false
  })),

  // Load Featured Tutors
  on(tutorActions.loadFeaturedTutors, state => ({
    ...state,
    isLoadingFeaturedTutors: true
  })),

  on(tutorActions.loadFeaturedTutorsSuccess, (state, { tutors }) => ({
    ...state,
    featuredTutors: tutors,
    isLoadingFeaturedTutors: false
  })),

  on(
    tutorActions.loadFeaturedTutorsEnded,
    tutorActions.loadFeaturedTutorsFailure,
    state => ({
      ...state,
      isLoadingFeaturedTutors: false
    })
  ),

  on(tutorActions.loadSubjectFeaturedTutors, state => ({
    ...state,
    isLoadingSubjectFeaturedTutors: true
  })),

  on(tutorActions.loadSubjectFeaturedTutorsSuccess, (state, { tutors }) => ({
    ...state,
    subjectFeaturedTutors: tutors,
    isLoadingSubjectFeaturedTutors: false
  })),

  on(tutorActions.loadSubjectFeaturedTutorsFailure, state => ({
    ...state,
    isLoadingSubjectFeaturedTutors: false
  })),

  on(tutorActions.loadTutorKudosPoints, state => ({
    ...state,
    isLoadingKudosPoints: true
  })),

  on(tutorActions.loadTutorKudosPointsSuccess, (state, { kudosPoints }) => ({
    ...state,
    kudosPoints,
    isLoadingKudosPoints: false
  })),

  on(tutorActions.loadTutorKudosPointsFailure, state => ({
    ...state,
    isLoadingKudosPoints: false
  })),

  on(tutorActions.tutorAddSignature, state => ({
    ...state,
    loading: true
  })),

  on(tutorActions.tutorAddSignatureSuccess, (state, { signature }) => ({
    ...state,
    signature,
    loading: false
  })),

  on(tutorActions.tutorAddSignatureFailure, state => ({
    ...state,
    loading: false
  })),

  on(tutorActions.tutorSetSignature, (state, { signature }) => ({
    ...state,
    signature,
    loading: false
  })),

  on(languageActions.changeLanguage, state => ({
    ...state,
    exploreTutorsFieldsOfStudy:
      state.exploreTutorsFieldsOfStudy &&
      state.exploreTutorsFieldsOfStudy.length
        ? state.exploreTutorsFieldsOfStudy.map(field => ({
            ...field,
            name:
              localStorage.getItem('DEFAULT_LANGUAGE') === 'ar'
                ? field?.nameAr
                : field?.nameEn
          }))
        : []
  }))
);

export const selectTutor = (state: State): ITutor | null => state.tutor;

export const selectProfileTutor = (state: State): ITutor | null =>
  state.profileTutor;

export const selectTutorLoading = (state: State): boolean => state.loading;

export const selectTutorDashboard = (state: State): boolean => state.dashboard;

export const selectIsLoadingTutor = (state: State): boolean =>
  state.isLoadingTutor;

export const selectIsLoadingProfileTutor = (state: State): boolean =>
  state.isLoadingProfileTutor;

export const selectTutors = (state: State): ITutor[] | null => state.tutors;

export const selectAvailableTutors = (state: State): ITutor[] | null =>
  state.availableTutors;

export const selectIsLoadingAvailableTutors = (state: State): boolean =>
  state.isLoadingAvailableTutors;

export const selectCurrentTutors = (state: State): ITutor[] | null =>
  state.currentTutors;

export const selectPendingTutors = (state: State): ITutor[] | null =>
  state.pendingTutors;

export const selectRejectedTutors = (state: State): ITutor[] | null =>
  state.rejectedTutors;

export const selectSuspendedTutors = (state: State): ITutor[] | null =>
  state.suspendedTutors;

export const selectIsLoadingTutors = (state: State): boolean =>
  state.isLoadingTutors;

export const selectIsLoadingCurrentTutors = (state: State): boolean =>
  state.isLoadingCurrentTutors;

export const selectIsLoadingPendingTutors = (state: State): boolean =>
  state.isLoadingPendingTutors;

export const selectIsLoadingSuspendedTutors = (state: State): boolean =>
  state.isLoadingSuspendedTutors;

export const selectTutorsCounts = (state: State): any => state.tutorsCounts;

export const selectIsLoadingExploreTutors = (state: State): boolean =>
  state.isLoadingExploreTutors;

export const selectExploreTutors = (state: State): ITutor[] =>
  state.exploreTutors;

export const selectExploreTutorsCount = (state: State): number =>
  state.exploreTutorsCount;

export const selectExploreTutorsFieldsOfStudy = (state: State): IField[] =>
  state.exploreTutorsFieldsOfStudy;

export const selectIsLoadingTutorDashboard = (state: State): boolean =>
  state.isLoadingDashboard;

export const selectIsCompleteTutorProfile = (state: State): boolean =>
  state.isCompleteTutorProfile;

export const selectIsUpdateTutorProfile = (state: State): boolean =>
  state.isUpdateTutorProfile;

export const selectIsChangeTutorStatus = (state: State): boolean =>
  state.isChangeTutorStatus;

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

export const selectIsReschedulingTutorClass = (state: State): boolean =>
  state.isReschedulingClass;

export const selectFeaturedTutors = (state: State): ITutor[] | null =>
  state.featuredTutors;

export const selectIsLoadingFeaturedTutors = (state: State): boolean =>
  state.isLoadingFeaturedTutors;

export const selectSubjectFeaturedTutors = (state: State): ITutor[] | null =>
  state.subjectFeaturedTutors;

export const selectIsLoadingSubjectFeaturedTutors = (state: State): boolean =>
  state.isLoadingSubjectFeaturedTutors;

export const selectTutorKudosPoints = (state: State): ITutor[] | null =>
  state.kudosPoints;

export const selectIsLoadingTutorKudosPoints = (state: State): boolean =>
  state.isLoadingKudosPoints;

export const selectTutorSignature = (state: State): string => state.signature;
