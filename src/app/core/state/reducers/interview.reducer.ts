import { createReducer, on } from '@ngrx/store';
import { IInterview } from '@models';
import * as interviewActions from '../actions/interview.actions';

export interface State {
  // Loading Interviews
  isLoadingInterviews: boolean;
  interviews: IInterview[] | null;
  loadingInterviewsFailure: string;

  // Loading Interview
  interview: IInterview | null;
  isLoadingInterview: boolean;
  loadingInterviewFailure: string;

  // Accept Interview
  isAcceptingInterview: boolean;
  acceptingInterviewFailure?: string;

  // Decline Interview
  isDeclineInterview: boolean;
  declineInterviewFailure?: string;

  isJoiningInterview: boolean;
  isSchedulingInterview: boolean;
}

export const initialState: State = {
  interview: null,
  interviews: null,
  isJoiningInterview: false,
  isLoadingInterview: false,
  isDeclineInterview: false,
  isLoadingInterviews: false,
  isAcceptingInterview: false,
  isSchedulingInterview: false,
  loadingInterviewFailure: '',
  loadingInterviewsFailure: '',
};

export const reducer = createReducer(
  initialState,
  on(interviewActions.loadInterviews, (state) => ({
    ...state,
    isLoadingInterviews: true,
  })),

  on(interviewActions.loadInterviewsSuccess, (state, { interviews }) => ({
    ...state,
    interviews,
    isLoadingInterviews: false,
  })),

  on(interviewActions.loadInterviewsFailure, (state, { error }) => ({
    ...state,
    isLoadingInterviews: false,
    loadingInterviewsFailure: error,
  })),

  on(interviewActions.loadInterviewsEnded, (state) => ({
    ...state,
    isLoadingInterviews: false,
  })),

  on(interviewActions.loadInterview, (state) => ({
    ...state,
    isLoadingInterview: true,
  })),

  on(interviewActions.loadInterviewSuccess, (state, { interview }) => ({
    ...state,
    interview,
    isLoadingInterview: false,
  })),

  on(interviewActions.loadInterviewFailure, (state, { error }) => ({
    ...state,
    isLoadingInterview: false,
    loadingInterviewFailure: error,
  })),

  on(interviewActions.loadInterviewEnded, (state) => ({
    ...state,
    isLoadingInterview: false,
  })),

  on(interviewActions.acceptInterviewRequest, (state) => ({
    ...state,
    isAcceptingInterview: true,
  })),

  on(interviewActions.acceptInterviewRequestSuccess, (state) => ({
    ...state,
    isAcceptingInterview: false,
  })),

  on(interviewActions.acceptInterviewRequestFailure, (state, { error }) => ({
    ...state,
    isAcceptingInterview: false,
    acceptingInterviewFailure: error,
  })),

  on(interviewActions.declineInterviewRequest, (state) => ({
    ...state,
    isDeclineInterview: true,
  })),

  on(interviewActions.declineInterviewRequestSuccess, (state) => ({
    ...state,
    isDeclineInterview: false,
  })),

  on(interviewActions.declineInterviewRequestFailure, (state, { error }) => ({
    ...state,
    isDeclineInterview: false,
    declineInterviewFailure: error,
  })),

  on(interviewActions.scheduleInterviewRequest, (state) => ({
    ...state,
    isSchedulingInterview: true,
  })),

  on(interviewActions.scheduleInterviewRequestSuccess, (state) => ({
    ...state,
    isSchedulingInterview: false,
  })),

  on(interviewActions.scheduleInterviewRequestFailure, (state) => ({
    ...state,
    isSchedulingInterview: false,
  })),

  on(interviewActions.joinInterview, (state) => ({
    ...state,
    isJoiningInterview: true,
  })),

  on(interviewActions.joinInterviewSuccess, (state) => ({
    ...state,
    isJoiningInterview: false,
  })),

  on(interviewActions.joinInterviewFailure, (state) => ({
    ...state,
    isJoiningInterview: false,
  }))
);

export const selectInterviews = (state: State): IInterview[] | null =>
  state.interviews;

export const selectIsLoadingInterviews = (state: State): boolean =>
  state.isLoadingInterviews;

export const selectInterview = (state: State): IInterview | null =>
  state.interview;

export const selectIsLoadingInterview = (state: State): boolean =>
  state.isLoadingInterview;

export const selectIsAcceptingInterview = (state: State): boolean =>
  state.isAcceptingInterview;

export const selectIsDeclineInterview = (state: State): boolean =>
  state.isDeclineInterview;

export const selectIsSchedulingInterview = (state: State): boolean =>
  state.isSchedulingInterview;

export const selectIsJoiningInterview = (state: State): boolean =>
  state.isJoiningInterview;

export const selectFilteredInterviews = (
  state: State,
  props?: any
): IInterview[] | null => {
  let interviews: IInterview[] = [];

  if (state.interviews && state.interviews.length && props) {
    interviews = getFilteredInterviews(state.interviews, props);
  }

  return interviews;
};

const getFilteredInterviews = (interviews: IInterview[], props: any) => {
  if (props?.status) {
    interviews = interviews?.filter(
      (interview) => interview?.status === props.status
    );
  }

  if (props?.title) {
    interviews = interviews?.filter((interview) =>
      interview?.tutor?.name?.toLowerCase()?.includes(props.title.toLowerCase())
    );
  }

  return interviews;
};
