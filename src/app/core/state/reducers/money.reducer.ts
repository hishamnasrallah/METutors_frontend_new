// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createReducer, on } from '@ngrx/store';

import * as moneyActions from '../actions/money.actions';
import * as languageMenuActions from '../actions/language-menu.actions';

export interface State {
  currencies: any;
  currencyRates: any;
  baseCurrency: string;
  isLoadingRates: boolean;
  selectedCurrency: string;
  loadingRatesError: string;
  isLoadingCurrencies: boolean;
  loadingCurrenciesError: string;
}

export const initialState: State = {
  baseCurrency: 'USD',
  loadingRatesError: '',
  isLoadingRates: false,
  selectedCurrency: 'USD',
  currencyRates: { USD: 1 },
  loadingCurrenciesError: '',
  isLoadingCurrencies: false,
  currencies: { USD: 'United States Dollar' },
};

export const reducer = createReducer(
  initialState,

  on(moneyActions.loadCurrencyRates, (state) => ({
    ...state,
    isLoadingRates: true,
  })),

  on(moneyActions.loadCurrencyRatesSuccess, (state, { rates, base }) => ({
    ...state,
    isLoadingRates: false,
    loadingRatesError: '',
    currencyRates: rates,
    baseCurrency: base,
  })),

  on(moneyActions.loadCurrencyRatesFailure, (state, { error }) => ({
    ...state,
    isLoadingRates: false,
    loadingRatesError: error.message,
  })),

  on(moneyActions.loadCurrenciesNames, (state) => ({
    ...state,
    isLoadingCurrencies: true,
  })),

  on(moneyActions.loadCurrenciesNamesSuccess, (state, { currencies }) => ({
    ...state,
    isLoadingCurrencies: false,
    loadingCurrenciesError: '',
    currencies,
  })),

  on(moneyActions.loadCurrenciesNamesFailure, (state, { error }) => ({
    ...state,
    isLoadingCurrencies: false,
    loadingCurrenciesError: error.message,
  })),

  on(languageMenuActions.selectCurrency, (state, { currency }) => ({
    ...state,
    selectedCurrency: currency,
  }))
);

// Language Selectors

export const selectIsLoadingCurrencyRates = (state: State): boolean =>
  state.isLoadingRates;

export const selectCurrencyRates = (state: State): any => state.currencyRates;

export const selectBaseCurrency = (state: State): string => state.baseCurrency;

export const selectCurrentCurrency = (state: State): string =>
  state.selectedCurrency;

export const selectLoadingRatesErrorMessage = (state: State): string =>
  state.loadingRatesError;

export const selectCurrencies = (state: State): any | undefined =>
  state.currencies;

export const selectIsLoadingCurrencies = (state: State): boolean | undefined =>
  state.isLoadingCurrencies;

export const selectLoadingCurrenciesErrorMessage = (state: State): string =>
  state.loadingCurrenciesError;
