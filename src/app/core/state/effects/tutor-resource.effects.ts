import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { TutorsService } from '@services';
import { Injectable } from '@angular/core';
import camelcaseKeys from 'camelcase-keys';
import * as fromRouterStore from '@metutor/state';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AlertNotificationService } from '@metutor/core/components';
import * as tutorResourceActions from '../actions/tutor-resource.actions';
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators';

@Injectable()
export class TutorResourceEffects {
  loadTutorResources$ = createEffect(() =>
    this._actions$.pipe(
      ofType(tutorResourceActions.loadTutorResources),
      withLatestFrom(this._store.select(fromRouterStore.selectRouteParams)),
      mergeMap(([_, { id }]) =>
        this._tutorService.getTutorResources(id).pipe(
          map((resources) =>
            tutorResourceActions.loadTutorResourcesSuccess({
              resources: camelcaseKeys(resources, { deep: true }),
            })
          ),
          catchError((error) =>
            of(
              tutorResourceActions.loadTutorResourcesFailure({
                error: error?.error?.message || error?.error?.errors,
              })
            )
          )
        )
      )
    )
  );

  loadTutorResource$ = createEffect(() =>
    this._actions$.pipe(
      ofType(tutorResourceActions.loadTutorResource),
      mergeMap(({ id }) =>
        this._tutorService.getTutorResource(id).pipe(
          map((resource) =>
            tutorResourceActions.loadTutorResourceSuccess({
              resource: camelcaseKeys(resource, { deep: true }),
            })
          ),
          catchError((error) =>
            of(
              tutorResourceActions.loadTutorResourceFailure({
                error: error?.error?.message || error?.error?.errors,
              })
            )
          )
        )
      )
    )
  );

  addTutorResource$ = createEffect(() =>
    this._actions$.pipe(
      ofType(tutorResourceActions.addTutorResource),
      mergeMap(({ body }) =>
        this._tutorService.addTutorResource(body).pipe(
          map((resource) =>
            tutorResourceActions.addTutorResourceSuccess({
              resource: camelcaseKeys(resource, { deep: true }),
              message: 'RESOURCE_ADDED_SUCCESSFULLY',
            })
          ),
          catchError((error) =>
            of(
              tutorResourceActions.addTutorResourceFailure({
                error: error?.error?.message || error?.error?.errors,
              })
            )
          )
        )
      )
    )
  );

  editTutorResource$ = createEffect(() =>
    this._actions$.pipe(
      ofType(tutorResourceActions.editTutorResource),
      mergeMap(({ body }) =>
        this._tutorService.editTutorResource(body).pipe(
          map((resource) =>
            tutorResourceActions.editTutorResourceSuccess({
              resource: camelcaseKeys(resource, { deep: true }),
              message: 'RESOURCE_EDITED_SUCCESSFULLY',
            })
          ),
          catchError((error) =>
            of(
              tutorResourceActions.editTutorResourceFailure({
                error: error?.error?.message || error?.error?.errors,
              })
            )
          )
        )
      )
    )
  );

  deleteTutorResource$ = createEffect(() =>
    this._actions$.pipe(
      ofType(tutorResourceActions.deleteTutorResource),
      mergeMap(({ id }) =>
        this._tutorService.deleteTutorResource(id).pipe(
          map((resource) =>
            tutorResourceActions.deleteTutorResourceSuccess({
              id,
              message: 'RESOURCE_DELETED_SUCCESSFULLY',
            })
          ),
          catchError((error) =>
            of(
              tutorResourceActions.deleteTutorResourceFailure({
                error: error?.error?.message || error?.error?.errors,
              })
            )
          )
        )
      )
    )
  );

  uploadTutorResourceDocument$ = createEffect(() =>
    this._actions$.pipe(
      ofType(tutorResourceActions.uploadTutorResourceDocument),
      mergeMap(({ body }) =>
        this._tutorService.uploadTutorResourceDocument(body).pipe(
          map((resource) =>
            tutorResourceActions.uploadTutorResourceDocumentSuccess({
              message: resource.message,
              document: camelcaseKeys(resource.document, { deep: true }),
            })
          ),
          catchError((error) =>
            of(
              tutorResourceActions.uploadTutorResourceDocumentFailure({
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
            tutorResourceActions.addTutorResourceSuccess,
            tutorResourceActions.editTutorResourceSuccess,
            tutorResourceActions.deleteTutorResourceSuccess,
            tutorResourceActions.uploadTutorResourceDocumentSuccess,
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
            tutorResourceActions.addTutorResourceFailure,
            tutorResourceActions.editTutorResourceFailure,
            tutorResourceActions.deleteTutorResourceFailure,
            tutorResourceActions.uploadTutorResourceDocumentFailure,
          ]
        ),
        map((action) => {
          if (action.error) {
            return this._alertNotificationService.error(action.error);
          } else {
            return this._alertNotificationService.error('SOMETHING_WENT_WRONG');
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
    private _tutorService: TutorsService,
    private _alertNotificationService: AlertNotificationService
  ) {}
}
