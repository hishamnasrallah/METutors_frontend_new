import { tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
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

  constructor(
    private _store: Store<any>,
    private _actions$: Actions,
    private _uploadService: UploadService,
    private _alertNotificationService: AlertNotificationService
  ) {}
}
