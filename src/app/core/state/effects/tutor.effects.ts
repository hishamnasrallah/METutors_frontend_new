import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import camelcaseKeys from 'camelcase-keys';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators';

import { selectTutorDashboard } from '..';
import { TutorsService } from '@services';
import * as tutorActions from '../actions/tutor.actions';

@Injectable()
export class TutorEffects {
  loadTutor$ = createEffect(() =>
    this._actions$.pipe(
      ofType(tutorActions.loadTutor),
      mergeMap(({ id }) =>
        this._tutorService.getTutorById(id).pipe(
          map((tutor) =>
            tutorActions.loadTutorSuccess({
              tutor,
            })
          ),
          catchError((error) => of(tutorActions.loadTutorFailure({ error })))
        )
      )
    )
  );

  loadTutorDashboard$ = createEffect(() =>
    this._actions$.pipe(
      ofType(tutorActions.loadTutorDashboard),
      withLatestFrom(this._store.select(selectTutorDashboard)),
      mergeMap(([_, _dashboard]) => {
        if (!_dashboard) {
          return this._tutorService.getTutorDashboard().pipe(
            map((dashboard) =>
              tutorActions.loadTutorDashboardSuccess({
                dashboard: camelcaseKeys(dashboard, { deep: true }),
              })
            ),
            catchError((error) =>
              of(tutorActions.loadTutorDashboardFailure({ error }))
            )
          );
        } else {
          return of(tutorActions.loadTutorDashboardEnded());
        }
      })
    )
  );

  constructor(
    private _store: Store<any>,
    private _actions$: Actions,
    private _tutorService: TutorsService
  ) {}
}
