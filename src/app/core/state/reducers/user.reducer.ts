import { createReducer } from '@ngrx/store';

export interface State {
  token: string;
}

export const initialState: State = { token: 'kamran' };

export const reducer = createReducer(initialState);
