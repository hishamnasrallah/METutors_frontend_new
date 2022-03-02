import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as fromRoot from '@metutor/state';
import { AuthService } from '@services';
import * as userActions from '../actions/user.actions';
import * as fromCore from '@metutor/core/state';
import { Router } from '@angular/router';
import { AlertNotificationService } from '@metutor/core/components';

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
          map((response) => {
            return userActions.signInSuccess({
              token: response,
              returnUrl,
            });
          }),
          catchError((error) => of(userActions.signInFailure({ error })))
        )
      )
    )
  );

  signInSuccess$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(userActions.signInSuccess),
        map((action) => {
          if (action.returnUrl) {
            this._router.navigateByUrl(action.returnUrl);
          } else {
            if (this._authService.getIsStudentAuth()) {
              this._router.navigate(['/student']);
            } else if (this._authService.getIsTutorAuth()) {
              if (
                +this._authService.decodeToken()?.user?.profileCompletedStep < 4
              )
                this._router.navigate(['/profile', 'complete-profile']);
              else this._router.navigate(['/tutor']);
            } else {
              this._router.navigate(['/']);
            }
          }
        })
      ),
    {
      dispatch: false,
    }
  );

  signInRequired$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(userActions.signInRequired),
        map((action) => {
          this._router.navigate(['/signin'], {
            queryParams: { returnUrl: action.returnUrl },
          });
        })
      ),
    {
      dispatch: false,
    }
  );

  logout$ = createEffect(() =>
    this._actions$.pipe(
      ofType(userActions.logout),
      withLatestFrom(this._store.select(fromCore.selectToken)),
      mergeMap(([_, token]) => {
        if (token) {
          return this._authService.logout().pipe(
            map((payload) => {
              return userActions.logoutSuccess();
            }),
            catchError((_) => of(userActions.logoutSuccess()))
          );
        } else {
          return of(userActions.logoutSuccess());
        }
      })
    )
  );

  logoutSuccess$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(userActions.logoutSuccess),
        map(() => {
          this._router.navigateByUrl('/login');
        })
      ),
    {
      dispatch: false,
    }
  );

  failureMessages$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(...[userActions.signInFailure]),
        map((action) => {
          if (action.error) {
            return this._alertNotificationService.error(action.error);
          } else {
            return this._alertNotificationService.error(
              'Something went wrong!'
            );
          }
        })
      ),
    {
      dispatch: false,
    }
  );

  constructor(
    private _router: Router,
    private _store: Store<any>,
    private _actions$: Actions,
    private _authService: AuthService,
    private _alertNotificationService: AlertNotificationService
  ) {}
}
