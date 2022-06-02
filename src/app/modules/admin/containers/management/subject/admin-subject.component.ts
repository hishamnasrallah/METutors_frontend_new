import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromCore from '@metutor/core/state';
import { Component, OnInit } from '@angular/core';
import * as fromAdmin from '@metutor/modules/admin/state';
import { ICountry, IField, IProgram, ISubject, ISubjectFilters } from '@models';
import * as fromAdminActions from '@metutor/modules/admin/state/actions';
import { GRADES, SubjectStatus, SUBJECT_STATUSES_CONST } from '@config';

@Component({
  selector: 'metutors-subject',
  templateUrl: './admin-subject.component.html',
  styleUrls: ['./admin-subject.component.scss'],
})
export class AdminSubjectComponent implements OnInit {
  isLoading$: Observable<boolean>;
  fields$: Observable<IField[] | null>;
  isLoadingFields$: Observable<boolean>;
  isDeletingSubject$: Observable<boolean>;
  isLoadingPrograms$: Observable<boolean>;
  subjects$: Observable<ISubject[] | null>;
  programs$: Observable<IProgram[] | null>;
  countries$: Observable<ICountry[] | null>;
  isAddingEditingSubject$: Observable<boolean>;
  showAddNewSubjectModal$: Observable<boolean>;

  title?: string;
  grade?: number;
  status?: number;
  grades = GRADES;
  program?: number;
  country?: number;
  fieldOfStudy?: number;
  deletedSubject?: ISubject;
  selectedSubject?: ISubject;
  subjectStatus = SubjectStatus;
  statuses = SUBJECT_STATUSES_CONST;

  constructor(private _store: Store<any>) {}

  ngOnInit(): void {
    this._prepareFields();
    this._prepareSubjects();
    this._preparePrograms();
    this._prepareCountries();

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

  onOpenAddNewSubject(): void {
    this._store.dispatch(fromAdminActions.openAdminAddNewSubjectModal());
  }

  onCloseAddNewSubject(): void {
    this._store.dispatch(fromAdminActions.closeAdminAddNewSubjectModal());
  }

  filterSubjects(filters: ISubjectFilters): void {
    this.subjects$ = this._store.select(fromCore.selectFilteredSubjects, {
      ...filters,
    });
  }

  onChangeSelection(): void {
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

  onChangeStatus(subject: ISubject, status: number): void {
    this._store.dispatch(
      fromCore.addEditSubject({
        subject: { ...subject, status },
      })
    );
  }

  deleteSubject(subject: ISubject): void {
    if (confirm(`Are you sure to delete ${subject.name} subject?`)) {
      this.deletedSubject = subject;
      this._store.dispatch(fromCore.deleteSubject({ id: subject.id }));
    }
  }

  private _prepareSubjects(): void {
    this._store.dispatch(fromCore.loadAdminSubjects());
    this.subjects$ = this._store.select(fromCore.selectSubjects);
    this.isLoading$ = this._store.select(fromCore.selectIsLoadingSubjects);
  }

  private _prepareFields(): void {
    this._store.dispatch(fromCore.loadAdminFields());
    this.fields$ = this._store.select(fromCore.selectFields);
    this.isLoadingFields$ = this._store.select(fromCore.selectIsLoadingFields);
  }

  private _preparePrograms(): void {
    this._store.dispatch(fromCore.loadPrograms());
    this.programs$ = this._store.select(fromCore.selectPrograms);
    this.isLoadingPrograms$ = this._store.select(
      fromCore.selectIsLoadingPrograms
    );
  }

  private _prepareCountries(): void {
    this._store.dispatch(fromCore.loadProgramCountries());
    this.countries$ = this._store.select(fromCore.selectProgramCountries);
  }
}
