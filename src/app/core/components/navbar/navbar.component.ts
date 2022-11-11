import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import * as fromCore from '@metutor/core/state';
import { MatDialog } from '@angular/material/dialog';
import { map, Observable, withLatestFrom } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { generalConstants, UserRole } from '@metutor/config';
import { ICountry, IProgram, IUser } from '@metutor/core/models';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { ChooseCountryDialogComponent } from '@metutor/shared/components';

@Component({
  selector: 'metutors-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input() countries: ICountry[];
  @Input() loadingCountries: boolean;

  user$: Observable<IUser | null>;
  currencyRates$: Observable<any[]>;
  selectedCurrency$: Observable<any>;
  token$: Observable<string | undefined>;
  programs$: Observable<IProgram[] | null>;
  isCurrencyRatesLoading$: Observable<boolean>;

  userRole = UserRole;
  selectedLanguage: string;

  constructor(
    private _router: Router,
    private _dialog: MatDialog,
    private _store: Store<any>,
    private _translate: TranslateService
  ) {}

  ngOnInit(): void {
    this._preparePrograms();
    this.selectedLanguage = this._translate.currentLang;

    this.token$ = this._store.select(fromCore.selectToken);
    this.user$ = this._store.select(fromCore.selectUser);

    this.currencyRates$ = this._store.select(fromCore.selectCurrencyRates).pipe(
      withLatestFrom(this._store.select(fromCore.selectCurrenciesNames)),
      map(([rates, currencies]) =>
        rates
          ? Object.keys(rates).map(key => ({
              id: key,
              name: `${currencies[key]} (${key})`
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
          name: `${currencies[currencySymbol]} (${currencySymbol})`
        }))
      );

    this._translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.selectedLanguage = event.lang;
    });
  }

  onCurrencySelect(currency: any): void {
    this._store.dispatch(fromCore.selectCurrency({ currency: currency.id }));
  }

  onLanguageSelect(language: string): void {
    localStorage.setItem('DEFAULT_LANGUAGE', language);
    this._translate.use(language);
    this._store.dispatch(fromCore.changeLanguage({ language }));
  }

  onSelectProgram(id: number): void {
    if (id === generalConstants.nationalId) {
      const dialogRef = this._dialog.open(ChooseCountryDialogComponent, {
        width: '1000px',
        data: { countries: this.countries, isLoading: this.loadingCountries },
        panelClass: 'overflow-height'
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this._router.navigate([`/all-courses/${id.toString()}`], {
            queryParams: { country: result.country?.id }
          });
        }
      });
    } else {
      this._router.navigateByUrl(`/all-courses/${id.toString()}`);
    }
  }

  logout(): void {
    this._store.dispatch(fromCore.logout());
  }

  private _preparePrograms(): void {
    this._store.dispatch(fromCore.loadPrograms());
    this.programs$ = this._store.select(fromCore.selectPrograms);
  }
}
