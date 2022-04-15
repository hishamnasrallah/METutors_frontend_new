import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators';

import { AdminService } from '@services';
import camelcaseKeys from 'camelcase-keys';
import * as fromCore from '@metutor/core/state';
import * as fromRouterStore from '@metutor/state';
import * as adminActions from '../actions/admin.actions';
import { AlertNotificationService } from '@metutor/core/components';

@Injectable()
export class AdminEffects {
  loadInterviews$ = createEffect(() =>
    this._actions$.pipe(
      ofType(adminActions.loadAdminDocuments),
      withLatestFrom(
        this._store.select(fromCore.selectAdminDocuments),
        this._store.select(fromRouterStore.selectRouteParams)
      ),
      mergeMap(([_, _documents, { id }]) => {
        if (!_documents || !_documents.length) {
          return this._adminService.loadAdminDocuments(id).pipe(
            map(
              (documents) =>
                adminActions.loadAdminDocumentsSuccess({
                  documents: camelcaseKeys(documents?.user_documents, {
                    deep: true,
                  }),
                }),
              catchError((error) =>
                of(
                  adminActions.loadAdminDocumentsFailure({
                    error: error?.error?.message || error?.error?.errors,
                  })
                )
              )
            )
          );
        } else {
          return of(adminActions.loadAdminDocumentsEnded());
        }
      })
    )
  );
  /*
  successMessages$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(
          ...[
            interviewActions.acceptInterviewRequestSuccess,
            interviewActions.declineInterviewRequestSuccess,
            interviewActions.scheduleInterviewRequestSuccess,
          ]
        ),
        map((action) => this._alertNotificationService.success(action.message))
      ),
    {
      dispatch: false,
    }
  );

  failureMessages$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(...[]),
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
  );*/

  constructor(
    private _router: Router,
    private _store: Store<any>,
    private _actions$: Actions,
    private _adminService: AdminService,
    private _alertNotificationService: AlertNotificationService
  ) {}
}
