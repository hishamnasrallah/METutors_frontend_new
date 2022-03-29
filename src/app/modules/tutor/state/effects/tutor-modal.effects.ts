import { mergeMap, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as fromTutorAction from '../actions';
import * as fromCore from '@metutor/core/state';

@Injectable()
export class TutorModalEffects {
  openEditTutorResourceModal$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fromTutorAction.openTutorEditClassResourceModal),
      mergeMap(({ id }) => of(fromCore.loadTutorResource({ id })))
    )
  );

  openTutorViewAssignmentModal$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fromTutorAction.openTutorAssignmentDetailsModal),
      mergeMap(({ id }) => of(fromCore.loadTutorAssignment({ id })))
    )
  );

  openTutorAddAssignmentModal$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fromTutorAction.openTutorAddAssignmentModal),
      mergeMap(() => of(fromCore.loadTutorAssignmentAssignees()))
    )
  );

  constructor(private _actions$: Actions, private _store: Store) {}
}
