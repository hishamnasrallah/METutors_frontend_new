/* eslint-disable import/no-deprecated */
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import * as fromCore from '@metutor/core/state';
import { CometChatService } from '@metutor/core/services';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as cometChatActions from '../actions/comet-chat.actions';
import { catchError, withLatestFrom, tap, mergeMap, map } from 'rxjs/operators';

@Injectable()
export class CometChatEffects {
  // initCometChat$ = createEffect(() =>
  //   this._actions$.pipe(
  //     ofType(cometChatActions.initCometChat),
  //     withLatestFrom(
  //       this._store.select(fromCore.selectUser),
  //       this._store.select(fromCore.selectCometChatAccessToken)
  //     ),
  //     mergeMap(([_, user, accessToken]) => {
  //       if (user && !accessToken) {
  //         return this._cometChatService.chatConnectUser().pipe(
  //           map((result: any) => {
  //             if (result.success) {
  //               return cometChatActions.initCometChatSuccess({
  //                 accessToken: result.accessToken
  //               });
  //             } else {
  //               return cometChatActions.initCometChatError();
  //             }
  //           }),
  //           catchError(() => of(cometChatActions.initCometChatError()))
  //         );
  //       } else {
  //         return of(cometChatActions.initCometChatEnded());
  //       }
  //     })
  //   )
  // );

  initCometChat$ = createEffect(() =>
    this._actions$.pipe(
      ofType(cometChatActions.initCometChat),
      withLatestFrom(
        this._store.select(fromCore.selectUser),
        this._store.select(fromCore.selectCometChatAccessToken)
      ),
      mergeMap(([_, user, accessToken]) =>
        of(cometChatActions.initCometChatSuccess({ accessToken: 'SUPERHERO1' }))
      )
    )
  );

  connectCometChat$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(cometChatActions.initCometChatSuccess),
        tap(action => this._cometChatService.connect(action.accessToken))
      ),
    {
      dispatch: false
    }
  );

  disconnectCometChat$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(cometChatActions.disconnectCometChat),
        tap(() => this._cometChatService.disconnect())
      ),
    {
      dispatch: false
    }
  );

  constructor(
    private _store: Store<any>,
    private _actions$: Actions,
    private _cometChatService: CometChatService
  ) {}
}
