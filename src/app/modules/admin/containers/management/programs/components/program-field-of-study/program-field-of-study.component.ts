import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';

import * as fromCore from '@metutor/core/state';
import * as fromAdmin from '@metutor/modules/admin/state';
import { ICountry, IField, IPagination, IProgram } from '@models';
import { FIELD_STATUSES_CONST, FieldStatus, GRADES } from '@config';
import * as fromAdminActions from '@metutor/modules/admin/state/actions';

@Component({
  selector: 'metutors-program-field-of-study',
  templateUrl: './program-field-of-study.component.html',
  styleUrls: ['./program-field-of-study.component.scss'],
})
export class ProgramFieldOfStudyComponent implements OnInit {
  perPage = 10;
  grades = GRADES;
  fieldOfStudy?: number;
  deletedField?: IField;
  selectedField?: IField;
  fieldStatus = FieldStatus;
  fieldStatusConst = FIELD_STATUSES_CONST;

  isDeletingField$: Observable<boolean>;
  programs$: Observable<IProgram[] | null>;
  countries$: Observable<ICountry[] | null>;
  isAddingEditingField$: Observable<boolean>;
  showAddNewFieldModal$: Observable<boolean>;

  view$: Observable<{
    loading: boolean;
    fields: IField[] | null;
    pagination: IPagination;
  }>;

  constructor(private _store: Store<any>) {}

  onOpenAddNewField(): void {
    this._store.dispatch(fromAdminActions.openAdminAddNewFieldModal());
  }

  onCloseAddNewField(): void {
    this._store.dispatch(fromAdminActions.closeAdminAddNewFieldModal());
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

  onPageChange({ page }: any): void {
    this._store.dispatch(
      fromCore.loadAdminFields({
        params: { page, search: '' },
      })
    );
  }

  onSearchText(search: string): void {
    this._store.dispatch(
      fromCore.loadAdminFields({
        params: { page: 1, search },
      })
    );
  }

  ngOnInit(): void {
    this._store.dispatch(fromCore.loadProgramCountries());

    this.showAddNewFieldModal$ = this._store.select(
      fromAdmin.selectAddNewFieldModal
    );

    this._store.dispatch(
      fromCore.loadAdminFields({ params: { page: 1, search: '' } })
    );

    this.programs$ = this._store.select(fromCore.selectPrograms);
    this.countries$ = this._store.select(fromCore.selectProgramCountries);

    this.view$ = combineLatest([
      this._store.select(fromCore.selectFields),
      this._store.select(fromCore.selectIsLoadingFields),
      this._store.select(fromCore.selectLookUpsPagination),
    ]).pipe(
      map(([fields, loading, pagination]) => ({
        fields,
        loading,
        pagination,
      }))
    );
  }
}
