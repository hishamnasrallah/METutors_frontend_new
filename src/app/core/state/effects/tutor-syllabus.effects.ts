import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { TutorsService } from '@services';
import { Injectable } from '@angular/core';
import camelcaseKeys from 'camelcase-keys';
import * as fromRouterStore from '@metutor/state';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AlertNotificationService } from '@metutor/core/components';
import * as tutorSyllabusActions from '../actions/tutor-syllabus.actions';
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators';

@Injectable()
export class TutorSyllabusEffects {
  loadTutorSyllabus$ = createEffect(() =>
    this._actions$.pipe(
      ofType(tutorSyllabusActions.loadTutorSyllabus),
      withLatestFrom(this._store.select(fromRouterStore.selectRouteParams)),
      mergeMap(([_, { id }]) =>
        this._tutorService.getTutorSyllabus(id).pipe(
          map((syllabus) =>
            tutorSyllabusActions.loadTutorSyllabusSuccess({
              syllabus: camelcaseKeys(syllabus, { deep: true }),
            })
          ),
          catchError((error) =>
            of(
              tutorSyllabusActions.loadTutorSyllabusFailure({
                error: error?.error?.message || error?.error?.errors,
              })
            )
          )
        )
      )
    )
  );

  tutorAddSyllabusTopic$ = createEffect(() =>
    this._actions$.pipe(
      ofType(tutorSyllabusActions.tutorAddSyllabusTopic),
      withLatestFrom(this._store.select(fromRouterStore.selectRouteParams)),
      mergeMap(([{ body }, { id }]) =>
        this._tutorService.addSyllabusTopic(body, id).pipe(
          map((syllabus) =>
            tutorSyllabusActions.tutorAddSyllabusTopicSuccess({
              syllabus: camelcaseKeys(syllabus, { deep: true }),
              message: 'TOPIC_ADDED_SUCCESSFULLY',
            })
          ),
          catchError((error) =>
            of(
              tutorSyllabusActions.tutorAddSyllabusTopicFailure({
                error: error?.error?.message || error?.error?.errors,
              })
            )
          )
        )
      )
    )
  );

  tutorEditSyllabusTopic$ = createEffect(() =>
    this._actions$.pipe(
      ofType(tutorSyllabusActions.tutorEditSyllabusTopic),
      mergeMap(({ body }) =>
        this._tutorService.editSyllabusTopic(body).pipe(
          map((syllabus) =>
            tutorSyllabusActions.tutorEditSyllabusTopicSuccess({
              syllabus: camelcaseKeys(syllabus, { deep: true }),
              message: 'TOPIC_UPDATED_SUCCESSFULLY',
            })
          ),
          catchError((error) =>
            of(
              tutorSyllabusActions.tutorEditSyllabusTopicFailure({
                error: error?.error?.message || error?.error?.errors,
              })
            )
          )
        )
      )
    )
  );

  tutorDeleteSyllabusTopic$ = createEffect(() =>
    this._actions$.pipe(
      ofType(tutorSyllabusActions.tutorDeleteSyllabusTopic),
      mergeMap(({ id }) =>
        this._tutorService.deleteSyllabusTopic(id).pipe(
          map((data) =>
            tutorSyllabusActions.tutorDeleteSyllabusTopicSuccess({
              data: camelcaseKeys(data, { deep: true }),
              message: 'TOPIC_DELETED_SUCCESSFULLY',
            })
          ),
          catchError((error) =>
            of(
              tutorSyllabusActions.tutorDeleteSyllabusTopicFailure({
                error: error?.error?.message || error?.error?.errors,
              })
            )
          )
        )
      )
    )
  );

  tutorEditSubjectTitle$ = createEffect(() =>
    this._actions$.pipe(
      ofType(tutorSyllabusActions.tutorEditSyllabusSubjectTitle),
      mergeMap(({ title, classId }) =>
        this._tutorService.editSubjectTitle(title, classId).pipe(
          map(() =>
            tutorSyllabusActions.tutorEditSyllabusSubjectTitleSuccess({
              title,
              classId,
              message: 'CLASS_SUBJECT_UPDATED_SUCCESSFULLY',
            })
          ),
          catchError((error) =>
            of(
              tutorSyllabusActions.tutorEditSyllabusSubjectTitleFailure({
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
            tutorSyllabusActions.tutorAddSyllabusTopicSuccess,
            tutorSyllabusActions.tutorEditSyllabusTopicSuccess,
            tutorSyllabusActions.tutorDeleteSyllabusTopicSuccess,
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
            tutorSyllabusActions.tutorAddSyllabusTopicFailure,
            tutorSyllabusActions.tutorEditSyllabusTopicFailure,
            tutorSyllabusActions.tutorDeleteSyllabusTopicFailure,
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
