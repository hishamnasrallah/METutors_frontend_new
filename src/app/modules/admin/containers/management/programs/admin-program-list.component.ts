import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromCore from '@metutor/core/state';
import { Component, OnInit } from '@angular/core';
import * as fromAdmin from '@metutor/modules/admin/state';
import { ICountry, ICountryFilters, IProgram, IProgramFilters } from '@models';
import {
  ProgramStatus,
  PROGRAM_STATUSES_CONST,
  CountryStatus,
  COUNTRY_STATUSES_CONST,
} from '@config';
import * as fromAdminActions from '@metutor/modules/admin/state/actions';

@Component({
  selector: 'metutors-programs',
  templateUrl: './admin-program-list.component.html',
  styleUrls: ['./admin-program-list.component.scss'],
})
export class AdminProgramListComponent implements OnInit {
  isLoading$: Observable<boolean>;
  isDeletingProgram$: Observable<boolean>;
  programs$: Observable<IProgram[] | null>;
  isAddingEditingProgram$: Observable<boolean>;
  showAddNewProgramModal$: Observable<boolean>;

  isLoadingCountry$: Observable<boolean>;
  isDeletingCountry$: Observable<boolean>;
  countries$: Observable<ICountry[] | null>;
  isAddingEditingCountry$: Observable<boolean>;
  showAddNewCountryModal$: Observable<boolean>;

  title?: string;
  status?: number;
  deletedProgram?: IProgram;
  selectedProgram?: IProgram;
  programStatus = ProgramStatus;
  statuses = PROGRAM_STATUSES_CONST;

  countryTitle?: string;
  countryStatus?: number;
  deletedCountry?: ICountry;
  selectedCountry?: ICountry;
  countryStatuses = CountryStatus;
  countryStatusConst = COUNTRY_STATUSES_CONST;

  constructor(private _store: Store<any>) {}

  ngOnInit(): void {
    this._preparePrograms();

    this.showAddNewProgramModal$ = this._store.select(
      fromAdmin.selectAddNewProgramModal
    );

    this.isAddingEditingProgram$ = this._store.select(
      fromCore.selectIsAddingEditingProgram
    );

    this.isDeletingProgram$ = this._store.select(
      fromCore.selectIsDeletingProgram
    );

    // Country
    this._prepareCountries();
    this.isDeletingCountry$ = this._store.select(
      fromCore.selectIsDeletingProgramCountries
    );

    this.showAddNewCountryModal$ = this._store.select(
      fromAdmin.selectAddNewCountryModal
    );

    this.isAddingEditingCountry$ = this._store.select(
      fromCore.selectIsAddingEditingProgramCountries
    );
  }

  onOpenAddNewProgram(): void {
    this._store.dispatch(fromAdminActions.openAdminAddNewProgramModal());
  }

  onCloseAddNewProgram(): void {
    this._store.dispatch(fromAdminActions.closeAdminAddNewProgramModal());
  }

  filterPrograms(filters: IProgramFilters): void {
    this.programs$ = this._store.select(fromCore.selectFilteredPrograms, {
      ...filters,
    });
  }

  onChangeSelection(): void {
    this.filterPrograms({
      title: this.title,
      status: this.status?.toString(),
    });
  }

  onAddEditProgram(program: any): void {
    if (this.selectedProgram) {
      this._store.dispatch(
        fromCore.addEditProgram({
          program: { ...program, id: this.selectedProgram.id },
        })
      );
    } else {
      this._store.dispatch(fromCore.addEditProgram({ program }));
    }
  }

  onChangeStatus(program: IProgram, status: number): void {
    this._store.dispatch(
      fromCore.addEditProgram({
        program: { ...program, status },
      })
    );
  }

  deleteProgram(program: IProgram): void {
    if (confirm(`Are you sure to delete ${program.name} program?`)) {
      this.deletedProgram = program;
      this._store.dispatch(fromCore.deleteProgram({ id: program.id }));
    }
  }

  // Country
  onOpenAddNewCountry(): void {
    this._store.dispatch(fromAdminActions.openAdminAddNewCountryModal());
  }

  onCloseAddNewCountry(): void {
    this._store.dispatch(fromAdminActions.closeAdminAddNewCountryModal());
  }

  onChangeCountrySelection(): void {
    this.filterCountries({
      title: this.countryTitle,
      status: this.countryStatus?.toString(),
    });
  }

  filterCountries(filters: ICountryFilters): void {
    this.countries$ = this._store.select(
      fromCore.selectFilteredProgramCountries,
      {
        ...filters,
      }
    );
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

  private _preparePrograms(): void {
    this._store.dispatch(fromCore.loadPrograms());
    this.programs$ = this._store.select(fromCore.selectPrograms);
    this.isLoading$ = this._store.select(fromCore.selectIsLoadingPrograms);
  }

  private _prepareCountries(): void {
    this._store.dispatch(fromCore.loadProgramCountries());
    this.countries$ = this._store.select(fromCore.selectProgramCountries);
    this.isLoadingCountry$ = this._store.select(
      fromCore.selectIsLoadingProgramCountries
    );
  }
}
