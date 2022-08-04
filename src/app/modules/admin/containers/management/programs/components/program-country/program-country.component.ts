import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';

import { ICountry } from '@models';
import * as fromCore from '@metutor/core/state';
import * as fromAdmin from '@metutor/modules/admin/state';
import { COUNTRY_STATUSES_CONST, CountryStatus } from '@config';
import * as fromAdminActions from '@metutor/modules/admin/state/actions';

@Component({
  selector: 'metutors-program-country',
  templateUrl: './program-country.component.html',
  styleUrls: ['./program-country.component.scss'],
})
export class ProgramCountryComponent implements OnInit {
  isLoadingCountry$: Observable<boolean>;
  isDeletingCountry$: Observable<boolean>;
  countries$: Observable<ICountry[] | null>;
  isAddingEditingCountry$: Observable<boolean>;
  showAddNewCountryModal$: Observable<boolean>;
  flagCountries$: Observable<ICountry[] | null>;

  country?: number;
  deletedCountry?: ICountry;
  selectedCountry?: ICountry;
  countryStatus = CountryStatus;
  countryStatusConst = COUNTRY_STATUSES_CONST;

  constructor(private _store: Store<any>) {}

  onOpenAddNewCountry(): void {
    this._store.dispatch(fromAdminActions.openAdminAddNewCountryModal());
  }

  onCloseAddNewCountry(): void {
    this._store.dispatch(fromAdminActions.closeAdminAddNewCountryModal());
  }

  onChangeCountryStatus(country: ICountry, status: number): void {
    this._store.dispatch(
      fromCore.addEditProgramCountries({
        country: { ...country, status },
      })
    );
  }

  onAddEditCountry(country: any): void {
    if (this.selectedCountry) {
      this._store.dispatch(
        fromCore.addEditProgramCountries({
          country: { ...country, id: this.selectedCountry.id },
        })
      );
    } else {
      this._store.dispatch(fromCore.addEditProgramCountries({ country }));
    }
  }

  deleteCountry(country: ICountry): void {
    if (confirm(`Are you sure to delete ${country.name} country?`)) {
      this.deletedCountry = country;
      this._store.dispatch(fromCore.deleteProgramCountries({ id: country.id }));
    }
  }

  ngOnInit(): void {
    this.isDeletingCountry$ = this._store.select(
      fromCore.selectIsDeletingProgramCountries
    );

    this.showAddNewCountryModal$ = this._store.select(
      fromAdmin.selectAddNewCountryModal
    );

    this.isAddingEditingCountry$ = this._store.select(
      fromCore.selectIsAddingEditingProgramCountries
    );

    this._store.dispatch(fromCore.loadProgramCountries());
    this._store.dispatch(fromCore.loadFlagCountries());

    this.countries$ = this._store.select(fromCore.selectProgramCountries);
    this.flagCountries$ = this._store.select(fromCore.selectFlagCountries);
    this.isLoadingCountry$ = this._store.select(
      fromCore.selectIsLoadingProgramCountries
    );
  }
}
