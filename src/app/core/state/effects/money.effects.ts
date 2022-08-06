import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as moneyServiceActions from '../actions/money.actions';
import { MoneyService } from '@metutor/core/services/money.service';

@Injectable()
export class MoneyServiceEffects {
  loadRates$ = createEffect(() =>
    this._actions$.pipe(
      ofType(moneyServiceActions.loadCurrencyRates),
      mergeMap((_) =>
        this._moneyService.getLatestCurrencyRates().pipe(
          map(({ base, rates }) =>
            moneyServiceActions.loadCurrencyRatesSuccess({ base, rates })
          ),
          catchError((error) =>
            of(moneyServiceActions.loadCurrencyRatesFailure({ error }))
          )
        )
      )
    )
  );

  loadCurrenciesNames$ = createEffect(() =>
    this._actions$.pipe(
      ofType(moneyServiceActions.loadCurrenciesNames),
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      mergeMap((_) =>
        this._moneyService.getCurrenciesNames().pipe(
          map((currencies) =>
            moneyServiceActions.loadCurrenciesNamesSuccess({ currencies })
          ),
          catchError((error) =>
            of(moneyServiceActions.loadCurrenciesNamesFailure({ error }))
          )
        )
      )
    )
  );

  constructor(
    private _actions$: Actions,
    private _moneyService: MoneyService
  ) {}
}
