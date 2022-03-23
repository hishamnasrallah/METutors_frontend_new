import { Store } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';

@Injectable()
export class TutorModalEffects {
  constructor(private _actions$: Actions, private _store: Store) {}
}
