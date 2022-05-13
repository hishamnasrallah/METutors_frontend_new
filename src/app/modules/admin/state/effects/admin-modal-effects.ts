import { Store } from '@ngrx/store';
import { mergeMap, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as fromCore from '@metutor/core/state';
import * as fromAdminAction from '@metutor/modules/admin/state/actions';

@Injectable()
export class AdminModalEffects {
  openAdminTutorListModal$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fromAdminAction.openAdminTutorListModal),
      mergeMap(({ id, tutorType }) =>
        of(fromCore.loadAdminTutors({ id, tutorType }))
      )
    )
  );

  constructor(private _actions$: Actions, private _store: Store) {}
}
