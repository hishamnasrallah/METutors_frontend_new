import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import camelcaseKeys from 'camelcase-keys';
import { Injectable } from '@angular/core';
import { environment } from '@environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators';

import { AuthService } from '@services';
import * as fromRoot from '@metutor/state';
import { SocialProvider, UserRole } from '@metutor/config';
import * as fromCore from '@metutor/core/state';
import * as userActions from '../actions/user.actions';
import * as tutorActions from '../actions/tutor.actions';
import { AlertNotificationService } from '@metutor/core/components';

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
              user: {
                ...user,
                avatar: environment.imageURL + user?.avatar,
              },
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

  register$ = createEffect(() =>
    this._actions$.pipe(
      ofType(userActions.register),
      withLatestFrom(
        this._store.select(fromRoot.selectQueryParam('returnUrl'))
      ),
      mergeMap(([{ user }, returnUrl]) =>
        this._authService.register(user).pipe(
          map((response) => {
            console.log(response);
            return userActions.registerSuccess({ email: user.email });
          }),
          catchError((error) =>
            of(
              userActions.registerFailure({
                error: error?.error?.message || error?.error?.errors,
              })
            )
          )
        )
      )
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

            if (user?.roleId?.toString() === UserRole.admin.toString()) {
              return userActions.signInAdminSuccess({
                tempToken: response,
                user: {
                  ...user,
                  avatar: environment.imageURL + user?.avatar,
                },
                returnUrl,
              });
            } else {
              return userActions.signInSuccess({
                token: response,
                user: {
                  ...user,
                  avatar: environment.imageURL + user?.avatar,
                },
                profileStep:
                  user &&
                  user.profileCompletedStep &&
                  !isNaN(user.profileCompletedStep)
                    ? +user.profileCompletedStep + 1
                    : 1,
                returnUrl,
              });
            }
          }),
          catchError((error) =>
            of(
              userActions.signInFailure({
                error: error?.error?.message || error?.error?.errors,
              })
            )
          )
        )
      )
    )
  );

  socialSignIn$ = createEffect(() =>
    this._actions$.pipe(
      ofType(userActions.socialSignIn),
      withLatestFrom(
        this._store.select(fromRoot.selectQueryParam('returnUrl'))
      ),
      mergeMap(([{ user }, returnUrl]) => {
        if (user.provider === SocialProvider.google) {
          return this._authService.googleSignIn(user).pipe(
            map((response) => {
              const jwtHelper = new JwtHelperService();
              const decodeToken = camelcaseKeys(
                jwtHelper.decodeToken(response),
                {
                  deep: true,
                }
              );
              const user: any = decodeToken?.user;

              if (user?.roleId?.toString() === UserRole.admin.toString()) {
                return userActions.signInAdminSuccess({
                  tempToken: response,
                  user: {
                    ...user,
                    avatar: environment.imageURL + user?.avatar,
                  },
                  returnUrl,
                });
              } else {
                return userActions.signInSuccess({
                  token: response,
                  user: {
                    ...user,
                    avatar: environment.imageURL + user?.avatar,
                  },
                  profileStep:
                    user &&
                    user.profileCompletedStep &&
                    !isNaN(user.profileCompletedStep)
                      ? +user.profileCompletedStep + 1
                      : 1,
                  returnUrl,
                });
              }
            }),
            catchError((error) =>
              of(
                userActions.signInFailure({
                  error: error?.error?.message || error?.error?.errors,
                })
              )
            )
          );
        } else {
          return this._authService.facebookSignIn(user).pipe(
            map((response) => {
              const jwtHelper = new JwtHelperService();
              const decodeToken = camelcaseKeys(
                jwtHelper.decodeToken(response),
                {
                  deep: true,
                }
              );
              const user: any = decodeToken?.user;

              if (user?.roleId?.toString() === UserRole.admin.toString()) {
                return userActions.signInAdminSuccess({
                  tempToken: response,
                  user: {
                    ...user,
                    avatar: environment.imageURL + user?.avatar,
                  },
                  returnUrl,
                });
              } else {
                return userActions.signInSuccess({
                  token: response,
                  user: {
                    ...user,
                    avatar: environment.imageURL + user?.avatar,
                  },
                  profileStep:
                    user &&
                    user.profileCompletedStep &&
                    !isNaN(user.profileCompletedStep)
                      ? +user.profileCompletedStep + 1
                      : 1,
                  returnUrl,
                });
              }
            }),
            catchError((error) =>
              of(
                userActions.signInFailure({
                  error: error?.error?.message || error?.error?.errors,
                })
              )
            )
          );
        }
      })
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
              if (step <= 5)
                this._router.navigate(['/profile', 'complete-profile']);
              else this._router.navigate(['/tutor']);
            } else if (user?.roleId?.toString() === UserRole.admin.toString()) {
              this._router.navigate(['/admin']);
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

  submitOTPAdmin$ = createEffect(() =>
    this._actions$.pipe(
      ofType(userActions.submitOTPAdmin),
      withLatestFrom(
        this._store.select(fromCore.selectTempToken),
        this._store.select(fromRoot.selectQueryParam('returnUrl'))
      ),
      mergeMap(([action, token, returnUrl]) =>
        this._authService.submitOTPAdmin(action.otp).pipe(
          map(() => {
            const jwtHelper = new JwtHelperService();
            const decodeToken = camelcaseKeys(jwtHelper.decodeToken(token), {
              deep: true,
            });
            const user: any = decodeToken?.user;

            return userActions.signInSuccess({
              token: token || '',
              user: {
                ...user,
                avatar: environment.imageURL + user?.avatar,
              },
              profileStep:
                user &&
                user.profileCompletedStep &&
                !isNaN(user.profileCompletedStep)
                  ? +user.profileCompletedStep + 1
                  : 1,
              returnUrl,
            });
          }),
          catchError((error) =>
            of(
              userActions.signInFailure({
                error: error?.error?.message || error?.error?.errors,
              })
            )
          )
        )
      )
    )
  );

  resendOTPAdmin$ = createEffect(() =>
    this._actions$.pipe(
      ofType(userActions.resendOTPAdmin),
      mergeMap(() =>
        this._authService.resendOTPAdmin().pipe(
          map((response) =>
            userActions.resendOTPAdminSuccess({
              message: response.message,
            })
          ),
          catchError((error) =>
            of(
              userActions.resendOTPAdminFailure({
                error: error?.error?.message || error?.error?.errors,
              })
            )
          )
        )
      )
    )
  );

  logout$ = createEffect(() =>
    this._actions$.pipe(
      ofType(userActions.logout),
      withLatestFrom(this._store.select(fromCore.selectToken)),
      mergeMap(([_, token]) => {
        if (token) {
          this._authService.logout().pipe(
            map((payload) => {}),
            catchError((_) => of(userActions.logoutSuccess()))
          );
        }
        return of(userActions.logoutSuccess());
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

  changePassword$ = createEffect(() =>
    this._actions$.pipe(
      ofType(userActions.changePassword),
      mergeMap((action) =>
        this._authService.changePassword(action.value).pipe(
          map((response) =>
            userActions.changePasswordSuccess({
              message: response.message,
            })
          ),
          catchError((error) =>
            of(
              userActions.changePasswordFailure({
                error:
                  error?.error?.message ||
                  error?.error?.error?.new_password ||
                  error?.error?.errors,
              })
            )
          )
        )
      )
    )
  );

  completeTutorProfileSuccess$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(tutorActions.completeTutorProfileSuccess),
        withLatestFrom(
          this._store.select(fromCore.selectProfileStep),
          this._store.select(fromCore.selectUser)
        ),
        map(([_, step, user]) => {
          if (step > 5 && user && user.id) {
            this._router.navigateByUrl('/tutor/settings');
          }
        })
      ),
    {
      dispatch: false,
    }
  );

  enterCompleteProfile$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(userActions.enterCompleteProfile),
        withLatestFrom(
          this._store.select(fromCore.selectProfileStep),
          this._store.select(fromCore.selectUser)
        ),
        map(([_, step, user]) => {
          if (step > 5 && user && user.id) {
            this._router.navigateByUrl(`/profile/tutor/${user.id.toString()}`);
          }
        })
      ),
    {
      dispatch: false,
    }
  );

  enterRequestTutor$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(userActions.enterRequestTutor),
        withLatestFrom(this._store.select(fromCore.selectUser)),
        map(([_, user]) => {
          if (user && user?.roleId?.toString() === UserRole.tutor.toString()) {
            this._alertNotificationService.error(
              'You dont have a permission to access this page from tutor account'
            );
            this._router.navigate(['/']);
          }
        })
      ),
    {
      dispatch: false,
    }
  );

  enterInvoiceDetails$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(userActions.enterInvoiceDetails),
        withLatestFrom(this._store.select(fromCore.selectCreatedClass)),
        map(([_, _class]) => {
          if (!_class) {
            this._alertNotificationService.error(
              'You dont have a permission to access this page directly'
            );
            this._router.navigate(['/']);
          }
        })
      ),
    {
      dispatch: false,
    }
  );

  successMessages$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(
          ...[
            userActions.changePasswordSuccess,
            userActions.resendOTPAdminSuccess,
          ]
        ),
        map((action) => {
          if (action.message) {
            return this._alertNotificationService.success(action.message);
          } else {
            return this._alertNotificationService.success(
              'Information updated successfully!'
            );
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
        ofType(
          ...[
            userActions.signInFailure,
            userActions.registerFailure,
            userActions.changePasswordFailure,
            userActions.resendOTPAdminFailure,
          ]
        ),
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
