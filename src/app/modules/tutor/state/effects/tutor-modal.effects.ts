import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { mergeMap, switchMap } from 'rxjs/operators';
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

  openTutorEditAssignmentModal$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fromTutorAction.openTutorEditAssignmentModal),
      switchMap(({ id }) => [
        fromCore.loadTutorAssignmentAssignees(),
        fromCore.loadTutorAssignment({ id }),
      ])
    )
  );

  openTutorStudentAssignmentDetailsModal$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fromTutorAction.openTutorViewStudentAssignmentModal),
      mergeMap(({ id, userId }) =>
        of(fromCore.loadTutorStudentAssignmentDetail({ id, userId }))
      )
    )
  );

  openTutorAttendanceModal$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fromTutorAction.openTutorCourseAttendanceModal),
      mergeMap(() => of(fromCore.loadTutorAttendance()))
    )
  );

  openTutorFeedbackModal$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fromTutorAction.openTutorSendFeedbackModal),
      mergeMap(() => of(fromCore.loadTutorFeedbackOptions()))
    )
  );

  openTutorPlatformFeedbackModal$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fromTutorAction.openTutorSendPlatformFeedbackModal),
      mergeMap(() => of(fromCore.loadTutorFeedbackPlatformOptions()))
    )
  );

  openTutorKudosPointsModal$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fromTutorAction.openKudosPointsModal),
      mergeMap(() => of(fromCore.loadTutorKudosPoints()))
    )
  );

  constructor(private _actions$: Actions, private _store: Store) {}
}
