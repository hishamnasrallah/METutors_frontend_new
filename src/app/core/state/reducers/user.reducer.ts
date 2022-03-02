import { createReducer, on } from '@ngrx/store';
import * as userActions from '../actions/user.actions';

export interface State {
  // Sign in
  isSignIn: boolean;
  token?: string;
  signInFailure?: string;
}

export const initialState: State = {
  isSignIn: false,
};

export const reducer = createReducer(
  initialState,

  on(userActions.signIn, (state) => ({
    ...state,
    isSignIn: true,
  })),

  on(userActions.signInSuccess, (state, { token }) => ({
    ...state,
    token,
    isSignIn: false,
  })),

  on(userActions.signInFailure, (state, { error }) => ({
    ...state,
    isSignIn: false,
    signInFailure: error.message,
  }))
);

export const selectToken = (state: State): string | undefined => state.token;

export const selectIsSignIn = (state: State): boolean => state.isSignIn;
