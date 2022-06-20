import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';

import * as fromCore from '@metutor/core/state';
import * as fromAdmin from '@metutor/modules/admin/state';
import * as fromAdminActions from '@metutor/modules/admin/state/actions';

import {
  IField,
  ICountry,
  IProgram,
  ICountryFilters,
  IProgramFilters,
  IFieldFilters,
} from '@models';

import {
  GRADES,
  FieldStatus,
  ProgramStatus,
  CountryStatus,
  FIELD_STATUSES_CONST,
  PROGRAM_STATUSES_CONST,
  COUNTRY_STATUSES_CONST,
} from '@config';

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

  grade?: number;
  grades = GRADES;
  program?: number;
  country?: number;
  fieldTitle?: string;
  fieldStatus?: number;
  deletedField?: IField;
  selectedField?: IField;
  fieldStatuses = FieldStatus;
  isLoadingField$: Observable<boolean>;
  fields$: Observable<IField[] | null>;
  isDeletingField$: Observable<boolean>;
  isLoadingPrograms$: Observable<boolean>;
  fieldStatusConst = FIELD_STATUSES_CONST;
  isAddingEditingField$: Observable<boolean>;
  showAddNewFieldModal$: Observable<boolean>;

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

    // Field of study
    this.showAddNewFieldModal$ = this._store.select(
      fromAdmin.selectAddNewFieldModal
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

  // Field of study
  onOpenAddNewField(): void {
    this._store.dispatch(fromAdminActions.openAdminAddNewFieldModal());
  }

  onCloseAddNewField(): void {
    this._store.dispatch(fromAdminActions.closeAdminAddNewFieldModal());
  }

  filterFields(filters: IFieldFilters): void {
    this.fields$ = this._store.select(fromCore.selectFilteredFields, {
      ...filters,
    });
  }

  onChangeFieldStatus(field: IField, status: number): void {
    this._store.dispatch(
      fromCore.addEditField({
        field: { ...field, status },
      })
    );
  }

  onAddEditField(field: any): void {
    if (this.selectedField) {
      this._store.dispatch(
        fromCore.addEditField({
          field: { ...field, id: this.selectedField.id },
        })
      );
    } else {
      this._store.dispatch(fromCore.addEditField({ field }));
    }
  }

  deleteField(field: IField): void {
    if (confirm(`Are you sure to delete ${field.name} field?`)) {
      this.deletedField = field;
      this._store.dispatch(fromCore.deleteField({ id: field.id }));
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

  private _prepareFields(): void {
    this._store.dispatch(fromCore.loadAdminFields());
    this.fields$ = this._store.select(fromCore.selectFields);
    this.isLoadingField$ = this._store.select(fromCore.selectIsLoadingFields);
  }

  private _prepareCountries(): void {
    this._store.dispatch(fromCore.loadProgramCountries());
    this.countries$ = this._store.select(fromCore.selectProgramCountries);
    this.isLoadingCountry$ = this._store.select(
      fromCore.selectIsLoadingProgramCountries
    );
  }
}
