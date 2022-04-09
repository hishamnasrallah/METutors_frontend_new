import { Store } from '@ngrx/store';
import { mergeMap, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as fromCore from '@metutor/core/state';
import * as fromStudentAction from '@metutor/modules/student/state/actions';
import { openStudentSendFeedbackModal } from '@metutor/modules/student/state/actions';

@Injectable()
export class TutorModalEffects {
  openStudentViewResourceModal$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fromStudentAction.openStudentViewResourceModal),
      mergeMap(({ id }) => of(fromCore.loadStudentResource({ id })))
    )
  );

  openStudentViewAssignmentModal$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fromStudentAction.openStudentViewAssignmentModal),
      mergeMap(({ id }) => of(fromCore.loadStudentAssignment({ id })))
    )
  );

  openStudentViewSubmittedAssignmentModal$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fromStudentAction.openViewSubmittedAssignmentModal),
      mergeMap(({ id }) => of(fromCore.loadStudentSubmittedAssignment({ id })))
    )
  );

  openStudentAttendanceModal$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fromStudentAction.openStudentAttendanceModal),
      mergeMap(() => of(fromCore.loadStudentAttendance()))
    )
  );

  openStudentSendFeedbackModal$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fromStudentAction.openStudentSendFeedbackModal),
      mergeMap(() => of(fromCore.loadStudentFeedbackOptions()))
    )
  );

  constructor(private _actions$: Actions, private _store: Store) {}
}
