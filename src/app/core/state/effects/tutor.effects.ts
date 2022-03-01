import {of} from 'rxjs';
import {Store} from "@ngrx/store";
import {Injectable} from '@angular/core';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {TutorsService} from "@services";
import * as tutorActions from '../actions/tutor.actions';

@Injectable()
export class TutorEffects {
  constructor(private _store: Store<any>, private _actions$: Actions, private _tutorService: TutorsService) {
  }

  loadTutor$ = createEffect(() =>
    this._actions$.pipe(
      ofType(tutorActions.loadTutor),
      mergeMap(({id}) => this._tutorService.getTutorById(id).pipe(
        map(tutor =>
          tutorActions.loadTutorSuccess({
            tutor
          })
        ),
        catchError(error =>
          of(tutorActions.loadTutorFailure({error}))
        )
      ))
    )
  );

}
