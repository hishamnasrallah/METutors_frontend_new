import { of, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
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

  cancelUpload$ = createEffect(() =>
    this._actions$.pipe(
      ofType(uploadActions.cancelUpload),
      mergeMap(() =>
        this._uploadService
          .cancelUploadStream()
          .pipe(map(() => uploadActions.cancelUploadSuccess()))
      )
    )
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
              user,
              token: response?.token,
              avatar: response?.avatar,
              message: 'Profile photo updated successfully',
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

  changeCover$ = createEffect(() =>
    this._actions$.pipe(
      ofType(uploadActions.changeCover),
      mergeMap(({ file }) =>
        this._uploadService.changeCover(file).pipe(
          map((response) =>
            uploadActions.changeCoverSuccess({
              cover: response?.cover_img,
              message: 'Cover photo updated successfully',
            })
          ),
          catchError((error) =>
            of(
              uploadActions.changeCoverFailure({
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
            uploadActions.changeCoverSuccess,
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
            uploadActions.changeCoverFailure,
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
