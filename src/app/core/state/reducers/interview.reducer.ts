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
}

export const initialState: State = {
  interview: null,
  interviews: null,
  isLoadingInterview: false,
  isLoadingInterviews: false,
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
