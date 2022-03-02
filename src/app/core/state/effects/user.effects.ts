import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as fromRoot from '@metutor/state';
import { AuthService } from '@services';
import * as userActions from '../actions/user.actions';

@Injectable()
export class UserEffects {
  signIn$ = createEffect(() =>
    this._actions$.pipe(
      ofType(userActions.signIn),
      withLatestFrom(
        this._store.select(fromRoot.selectQueryParam('returnUrl'))
      ),
      mergeMap(([{ user }, returnUrl]) =>
        this._authService.login(user).pipe(
          map((response) =>
            userActions.signInSuccess({
              user: response,
              returnUrl,
            })
          ),
          catchError((error) => of(userActions.signInFailure({ error })))
        )
      )
    )
  );

  constructor(
    private _store: Store<any>,
    private _actions$: Actions,
    private _authService: AuthService
  ) {}
}
