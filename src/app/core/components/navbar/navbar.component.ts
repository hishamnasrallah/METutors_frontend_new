import { Store } from '@ngrx/store';
import { UserRole } from '@metutor/config';
import { IUser } from '@metutor/core/models';
import * as fromCore from '@metutor/core/state';
import { Component, OnInit } from '@angular/core';
import { map, Observable, withLatestFrom } from 'rxjs';

@Component({
  selector: 'metutors-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  user$: Observable<IUser | null>;
  currencyRates$: Observable<any[]>;
  selectedCurrency$: Observable<any>;
  token$: Observable<string | undefined>;
  isCurrencyRatesLoading$: Observable<boolean>;

  userRole = UserRole;

  constructor(private _store: Store<any>) {}

  ngOnInit(): void {
    this.token$ = this._store.select(fromCore.selectToken);
    this.user$ = this._store.select(fromCore.selectUser);

    this.currencyRates$ = this._store.select(fromCore.selectCurrencyRates).pipe(
      withLatestFrom(this._store.select(fromCore.selectCurrenciesNames)),
      map(([rates, currencies]) =>
        rates
          ? Object.keys(rates).map((key) => ({
              id: key,
              name: `${currencies[key]} (${key})`,
            }))
          : []
      )
    );

    this.isCurrencyRatesLoading$ = this._store.select(
      fromCore.selectIsLoadingCurrencyRates
    );

    this.selectedCurrency$ = this._store
      .select(fromCore.selectCurrentCurrency)
      .pipe(
        withLatestFrom(this._store.select(fromCore.selectCurrenciesNames)),
        map(([currencySymbol, currencies]) => ({
          id: currencySymbol,
          name: `${currencies[currencySymbol]} (${currencySymbol})`,
        }))
      );
  }

  onCurrencySelect(currency: any): void {
    this._store.dispatch(fromCore.selectCurrency({ currency: currency.id }));
  }

  logout(): void {
    this._store.dispatch(fromCore.logout());
  }
}
