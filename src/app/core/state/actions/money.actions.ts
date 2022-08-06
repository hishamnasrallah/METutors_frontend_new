import { createAction, props } from '@ngrx/store';

export const loadCurrencyRates = createAction(
  '[Money] Load Currency Rates'
);

export const loadCurrencyRatesSuccess = createAction(
  '[Money] Load Currency Rates Success',
  props<{ rates: any; base: string }>()
);

export const loadCurrencyRatesFailure = createAction(
  '[Money] Load Currency Rates Failure',
  props<{ error: any }>()
);

export const loadCurrenciesNames = createAction(
  '[Money] Load Currencies'
);

export const loadCurrenciesNamesSuccess = createAction(
  '[Money] Load Currencies Success',
  props<{ currencies: any }>()
);

export const loadCurrenciesNamesFailure = createAction(
  '[Money] Load Currencies Failure',
  props<{ error: any }>()
);
