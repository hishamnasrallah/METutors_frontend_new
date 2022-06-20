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
  ISubject,
  IFieldFilters,
  ICountryFilters,
  IProgramFilters,
  ISubjectFilters,
} from '@models';

import {
  GRADES,
  FieldStatus,
  ProgramStatus,
  CountryStatus,
  SubjectStatus,
  FIELD_STATUSES_CONST,
  PROGRAM_STATUSES_CONST,
  COUNTRY_STATUSES_CONST,
  SUBJECT_STATUSES_CONST,
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

  title: string;
  grades = GRADES;
  grade?: number;
  status?: number;
  program?: number;
  country?: number;
  fieldOfStudy?: number;
  deletedProgram?: IProgram;
  fieldStatus = FieldStatus;
  selectedProgram?: IProgram;
  programStatus = ProgramStatus;
  countryStatus = CountryStatus;
  subjectStatus = SubjectStatus;
  fieldStatusConst = FIELD_STATUSES_CONST;
  subjectStatusConst = SUBJECT_STATUSES_CONST;
  countryStatusConst = COUNTRY_STATUSES_CONST;
  programStatusConst = PROGRAM_STATUSES_CONST;

  deletedField?: IField;
  selectedField?: IField;
  deletedCountry?: ICountry;
  selectedCountry?: ICountry;
  isLoadingFields$: Observable<boolean>;
  fields$: Observable<IField[] | null>;
  isDeletingField$: Observable<boolean>;
  isLoadingPrograms$: Observable<boolean>;
  isAddingEditingField$: Observable<boolean>;
  showAddNewFieldModal$: Observable<boolean>;

  deletedSubject?: ISubject;
  selectedSubject?: ISubject;
  isLoadingSubject$: Observable<boolean>;
  isDeletingSubject$: Observable<boolean>;
  subjects$: Observable<ISubject[] | null>;
  isAddingEditingSubject$: Observable<boolean>;
  showAddNewSubjectModal$: Observable<boolean>;

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

    // course
    this.showAddNewSubjectModal$ = this._store.select(
      fromAdmin.selectAddNewSubjectModal
    );

    this.isAddingEditingSubject$ = this._store.select(
      fromCore.selectIsAddingEditingSubject
    );

    this.isDeletingSubject$ = this._store.select(
      fromCore.selectIsDeletingSubject
    );
  }

  onChangeTab(tab: any): void {
    this.resetFilters();

    switch (tab.index) {
      case 0:
        this._preparePrograms();
        break;
      case 1:
        this._prepareFields();
        break;
      case 2:
        this._prepareCountries();
        break;
      case 3:
        this._prepareFields();
        this._prepareSubjects();
        break;
    }
  }

  resetFilters(): void {
    this.title = '';
    this.grade = undefined;
    this.status = undefined;
    this.program = undefined;
    this.country = undefined;
    this.fieldOfStudy = undefined;
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

  onChangeFieldSelection(): void {
    this.filterFields({
      title: this.title,
      program: this.program,
      country: this.country,
      grade: this.grade?.toString(),
      status: this.status?.toString(),
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
      title: this.title,
      status: this.status?.toString(),
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

  // Course
  onCloseAddNewSubject(): void {
    this._store.dispatch(fromAdminActions.closeAdminAddNewSubjectModal());
  }

  filterSubjects(filters: ISubjectFilters): void {
    this.subjects$ = this._store.select(fromCore.selectFilteredSubjects, {
      ...filters,
    });
  }

  onChangeSubjectStatus(subject: ISubject, status: number): void {
    this._store.dispatch(
      fromCore.addEditSubject({
        subject: { ...subject, status },
      })
    );
  }

  onChangeSubjectSelection(): void {
    this.filterSubjects({
      title: this.title,
      program: this.program,
      country: this.country,
      field: this.fieldOfStudy,
      grade: this.grade?.toString(),
      status: this.status?.toString(),
    });
  }

  onAddEditSubject(subject: any): void {
    if (this.selectedSubject) {
      this._store.dispatch(
        fromCore.addEditSubject({
          subject: { ...subject, id: this.selectedSubject.id },
        })
      );
    } else {
      this._store.dispatch(fromCore.addEditSubject({ subject }));
    }
  }

  onOpenAddNewSubject(): void {
    this._store.dispatch(fromAdminActions.openAdminAddNewSubjectModal());
  }

  deleteSubject(subject: ISubject): void {
    if (confirm(`Are you sure to delete ${subject.name} subject?`)) {
      this.deletedSubject = subject;
      this._store.dispatch(fromCore.deleteSubject({ id: subject.id }));
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
    this.isLoadingFields$ = this._store.select(fromCore.selectIsLoadingFields);
  }

  private _prepareSubjects(): void {
    this._store.dispatch(fromCore.loadAdminSubjects());
    this.subjects$ = this._store.select(fromCore.selectSubjects);
    this.isLoadingSubject$ = this._store.select(
      fromCore.selectIsLoadingSubjects
    );
  }

  private _prepareCountries(): void {
    this._store.dispatch(fromCore.loadProgramCountries());
    this.countries$ = this._store.select(fromCore.selectProgramCountries);
    this.isLoadingCountry$ = this._store.select(
      fromCore.selectIsLoadingProgramCountries
    );
  }
}
