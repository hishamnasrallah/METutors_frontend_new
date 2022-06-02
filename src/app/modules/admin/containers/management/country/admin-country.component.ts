import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromCore from '@metutor/core/state';
import { Component, OnInit } from '@angular/core';
import * as fromAdmin from '@metutor/modules/admin/state';
import { ICountry, ICountryFilters } from '@models';
import { CountryStatus, COUNTRY_STATUSES_CONST } from '@config';
import * as fromAdminActions from '@metutor/modules/admin/state/actions';

@Component({
  selector: 'metutors-country',
  templateUrl: './admin-country.component.html',
  styleUrls: ['./admin-country.component.scss'],
})
export class AdminCountryComponent implements OnInit {
  isLoading$: Observable<boolean>;
  isDeletingCountry$: Observable<boolean>;
  countries$: Observable<ICountry[] | null>;
  isAddingEditingCountry$: Observable<boolean>;
  showAddNewCountryModal$: Observable<boolean>;

  title?: string;
  status?: number;
  deletedCountry?: ICountry;
  selectedCountry?: ICountry;
  countryStatus = CountryStatus;
  statuses = COUNTRY_STATUSES_CONST;

  constructor(private _store: Store<any>) {}

  ngOnInit(): void {
    this._prepareCountries();

    this.showAddNewCountryModal$ = this._store.select(
      fromAdmin.selectAddNewCountryModal
    );

    this.isAddingEditingCountry$ = this._store.select(
      fromCore.selectIsAddingEditingProgramCountries
    );

    this.isDeletingCountry$ = this._store.select(
      fromCore.selectIsDeletingProgramCountries
    );
  }

  onOpenAddNewCountry(): void {
    this._store.dispatch(fromAdminActions.openAdminAddNewCountryModal());
  }

  onCloseAddNewCountry(): void {
    this._store.dispatch(fromAdminActions.closeAdminAddNewCountryModal());
  }

  filterCountries(filters: ICountryFilters): void {
    this.countries$ = this._store.select(
      fromCore.selectFilteredProgramCountries,
      {
        ...filters,
      }
    );
  }

  onChangeSelection(): void {
    this.filterCountries({
      title: this.title,
      status: this.status?.toString(),
    });
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

  onChangeStatus(country: ICountry, status: number): void {
    this._store.dispatch(
      fromCore.addEditProgramCountries({
        country: { ...country, status },
      })
    );
  }

  deleteCountry(country: ICountry): void {
    if (confirm(`Are you sure to delete ${country.name} country?`)) {
      this.deletedCountry = country;
      this._store.dispatch(fromCore.deleteProgramCountries({ id: country.id }));
    }
  }

  private _prepareCountries(): void {
    this._store.dispatch(fromCore.loadProgramCountries());
    this.countries$ = this._store.select(fromCore.selectProgramCountries);
    this.isLoading$ = this._store.select(
      fromCore.selectIsLoadingProgramCountries
    );
  }
}
