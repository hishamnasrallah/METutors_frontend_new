import { Store } from '@ngrx/store';
import { mergeMap, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as fromCore from '@metutor/core/state';
import * as fromStudentAction from '@metutor/modules/student/state/actions';

@Injectable()
export class TutorModalEffects {
  openStudentViewResourceModal$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fromStudentAction.openStudentViewResourceModal),
      mergeMap(({ id }) => of(fromCore.loadStudentResource({ id })))
    )
  );

  constructor(private _actions$: Actions, private _store: Store) {}
}
