import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as fromRoot from '@metutor/state';
import { AuthService } from '@services';
import * as userActions from '../actions/user.actions';
import * as tutorActions from '../actions/tutor.actions';
import * as fromCore from '@metutor/core/state';
import { Router } from '@angular/router';
import { AlertNotificationService } from '@metutor/core/components';
import camelcaseKeys from 'camelcase-keys';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserRole } from '@metutor/config';

@Injectable()
export class UserEffects {
  identifyUser$ = createEffect(() =>
    this._actions$.pipe(
      ofType(userActions.identifyUser),
      withLatestFrom(this._store.select(fromCore.selectToken)),
      mergeMap(([_, token]) => {
        const jwtHelper = new JwtHelperService();
        const decodeToken = camelcaseKeys(jwtHelper.decodeToken(token), {
          deep: true,
        });
        const user: any = decodeToken?.user;

        if (user && token) {
          return of(
            userActions.identifyUserSuccess({
              user,
              profileStep:
                user &&
                user.profileCompletedStep &&
                !isNaN(user.profileCompletedStep)
                  ? +user.profileCompletedStep + 1
                  : 1,
            })
          );
        } else {
          return of(userActions.identifyUserEnded());
        }
      })
    )
  );

  signIn$ = createEffect(() =>
    this._actions$.pipe(
      ofType(userActions.signIn),
      withLatestFrom(
        this._store.select(fromRoot.selectQueryParam('returnUrl'))
      ),
      mergeMap(([{ user }, returnUrl]) =>
        this._authService.login(user).pipe(
          map((response) => {
            const jwtHelper = new JwtHelperService();
            const decodeToken = camelcaseKeys(jwtHelper.decodeToken(response), {
              deep: true,
            });
            const user: any = decodeToken?.user;

            return userActions.signInSuccess({
              token: response,
              user,
              profileStep:
                user &&
                user.profileCompletedStep &&
                !isNaN(user.profileCompletedStep)
                  ? +user.profileCompletedStep + 1
                  : 1,
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
        withLatestFrom(
          this._store.select(fromCore.selectProfileStep),
          this._store.select(fromCore.selectUser)
        ),
        map(([action, step, user]) => {
          if (action.returnUrl) {
            this._router.navigateByUrl(action.returnUrl);
          } else {
            if (user?.roleId?.toString() === UserRole.student.toString()) {
              this._router.navigate(['/student']);
            } else if (user?.roleId?.toString() === UserRole.tutor.toString()) {
              if (step < 4)
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

  enterCompleteProfile$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(
          ...[
            userActions.enterCompleteProfile,
            tutorActions.completeTutorProfileSuccess,
          ]
        ),
        withLatestFrom(
          this._store.select(fromCore.selectProfileStep),
          this._store.select(fromCore.selectUser)
        ),
        map(([_, step, user]) => {
          if (step > 4 && user && user.id) {
            this._router.navigateByUrl(`/profile/tutor/${user.id.toString()}`);
          }
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
