import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromCore from '@metutor/core/state';
import { Component, OnInit } from '@angular/core';
import * as fromAdmin from '@metutor/modules/admin/state';
import {
  ICountry,
  IField,
  IFieldFilters,
  IProgram,
} from '@metutor/core/models';
import * as fromAdminActions from '@metutor/modules/admin/state/actions';
import { FieldStatus, FIELD_STATUSES_CONST, GRADES } from '@metutor/config';

@Component({
  selector: 'metutors-admin-field-of-study',
  templateUrl: './admin-field-of-study.component.html',
  styleUrls: ['./admin-field-of-study.component.scss'],
})
export class AdminFieldOfStudyComponent implements OnInit {
  isLoading$: Observable<boolean>;
  fields$: Observable<IField[] | null>;
  isDeletingField$: Observable<boolean>;
  isLoadingPrograms$: Observable<boolean>;
  programs$: Observable<IProgram[] | null>;
  countries$: Observable<ICountry[] | null>;
  isAddingEditingField$: Observable<boolean>;
  showAddNewFieldModal$: Observable<boolean>;

  title?: string;
  grade?: number;
  status?: number;
  grades = GRADES;
  program?: number;
  country?: number;
  deletedField?: IField;
  selectedField?: IField;
  fieldStatus = FieldStatus;
  statuses = FIELD_STATUSES_CONST;

  constructor(private _store: Store<any>) {}

  ngOnInit(): void {
    this._prepareFields();
    this._preparePrograms();
    this._prepareCountries();

    this.showAddNewFieldModal$ = this._store.select(
      fromAdmin.selectAddNewFieldModal
    );

    this.isAddingEditingField$ = this._store.select(
      fromCore.selectIsAddingEditingField
    );

    this.isDeletingField$ = this._store.select(fromCore.selectIsDeletingField);
  }

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

  onChangeSelection(): void {
    this.filterFields({
      title: this.title,
      program: this.program,
      country: this.country,
      grade: this.grade?.toString(),
      status: this.status?.toString(),
    });
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

  onChangeStatus(field: IField, status: number): void {
    this._store.dispatch(
      fromCore.addEditField({
        field: { ...field, status },
      })
    );
  }

  deleteField(field: IField): void {
    if (confirm(`Are you sure to delete ${field.name} field?`)) {
      this.deletedField = field;
      this._store.dispatch(fromCore.deleteField({ id: field.id }));
    }
  }

  private _prepareFields(): void {
    this._store.dispatch(fromCore.loadAdminFields());
    this.fields$ = this._store.select(fromCore.selectFields);
    this.isLoading$ = this._store.select(fromCore.selectIsLoadingFields);
  }

  private _preparePrograms(): void {
    this._store.dispatch(fromCore.loadPrograms());
    this.programs$ = this._store.select(fromCore.selectPrograms);
    this.isLoadingPrograms$ = this._store.select(
      fromCore.selectIsLoadingPrograms
    );
  }

  private _prepareCountries(): void {
    this._store.dispatch(fromCore.loadCountries());
    this.countries$ = this._store.select(fromCore.selectCountries);
  }
}
