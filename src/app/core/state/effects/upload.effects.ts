import { of, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { environment } from '@environment';
import camelcaseKeys from 'camelcase-keys';
import { JwtHelperService } from '@auth0/angular-jwt';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { UploadService } from '@services';
import * as uploadActions from '../actions/upload.actions';
import { AlertNotificationService } from '@metutor/core/components';

@Injectable()
export class UploadEffects {
  uploadFile$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(uploadActions.uploadFile),
        tap(({ file }) => this._uploadService.uploadFile(file))
      ),
    { dispatch: false }
  );

  changeAvatar$ = createEffect(() =>
    this._actions$.pipe(
      ofType(uploadActions.changeAvatar),
      mergeMap(({ file }) =>
        this._uploadService.changeAvatar(file).pipe(
          map((response) => {
            const jwtHelper = new JwtHelperService();
            const decodeToken = camelcaseKeys(
              jwtHelper.decodeToken(response?.token),
              {
                deep: true,
              }
            );
            const user: any = decodeToken?.user;

            return uploadActions.changeAvatarSuccess({
              message: 'Profile image successfully changed',
              token: response?.token,
              user: {
                ...user,
                avatar: environment.imageURL + user?.avatar,
              },
              avatar: response?.avatar,
            });
          }),
          catchError((error) =>
            of(
              uploadActions.changeAvatarFailure({
                error: error?.error?.message || error?.error?.errors,
              })
            )
          )
        )
      )
    )
  );

  deleteUploadedFile$ = createEffect(() =>
    this._actions$.pipe(
      ofType(uploadActions.deleteUploadedFile),
      mergeMap(({ id }) =>
        this._uploadService.deleteUploadedFile(id).pipe(
          map(() =>
            uploadActions.deleteUploadedFileSuccess({
              id,
              message: 'File successfully deleted',
            })
          ),
          catchError((error) =>
            of(
              uploadActions.deleteUploadedFileFailure({
                error: error?.error?.message || error?.error?.errors,
              })
            )
          )
        )
      )
    )
  );

  successMessages$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(
          ...[
            uploadActions.changeAvatarSuccess,
            uploadActions.deleteUploadedFileSuccess,
          ]
        ),
        map(({ message }) => this._alertNotificationService.success(message))
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
            uploadActions.changeAvatarFailure,
            uploadActions.deleteUploadedFileFailure,
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
    private _store: Store<any>,
    private _actions$: Actions,
    private _uploadService: UploadService,
    private _alertNotificationService: AlertNotificationService
  ) {}
}
