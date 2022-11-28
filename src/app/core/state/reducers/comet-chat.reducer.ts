import { createReducer, on } from '@ngrx/store';
import * as userActions from '../actions/user.actions';
import * as cometChatActions from '../actions/comet-chat.actions';

export interface State {
  accessToken: string;
}

export const initialState: State = {
  accessToken: ''
};

export const reducer = createReducer(
  initialState,
  on(cometChatActions.initCometChatSuccess, (state, { accessToken }) => ({
    ...state,
    accessToken
  })),

  on(userActions.signInSuccess, userActions.logoutSuccess, state => ({
    ...state,
    accessToken: ''
  }))
);

export const selectCometChatAccessToken = (state: State): string =>
  state.accessToken;
