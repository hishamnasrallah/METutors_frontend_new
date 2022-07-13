import { combineLatest, map, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';

import * as fromCore from '@metutor/core/state';
import * as fromAdmin from '@metutor/modules/admin/state';
import { GRADES, SUBJECT_STATUSES_CONST, SubjectStatus } from '@config';
import * as fromAdminActions from '@metutor/modules/admin/state/actions';
import { ICountry, IField, IPagination, IProgram, ISubject } from '@models';

@Component({
  selector: 'metutors-program-subject',
  templateUrl: './program-subject.component.html',
  styleUrls: ['./program-subject.component.scss'],
})
export class ProgramSubjectComponent implements OnInit {
  perPage = 10;
  grades = GRADES;
  deletedSubject?: ISubject;
  selectedSubject?: ISubject;
  subjectStatus = SubjectStatus;
  subjectStatusConst = SUBJECT_STATUSES_CONST;
  isDeletingSubject$: Observable<boolean>;
  isAddingEditingSubject$: Observable<boolean>;
  showAddNewSubjectModal$: Observable<boolean>;

  view$: Observable<{
    loading: boolean;
    fields: IField[] | null;
    pagination: IPagination;
    programs: IProgram[] | null;
    subjects: ISubject[] | null;
    countries: ICountry[] | null;
  }>;

  constructor(private _store: Store<any>) {}

  onCloseAddNewSubject(): void {
    this._store.dispatch(fromAdminActions.closeAdminAddNewSubjectModal());
  }

  onChangeSubjectStatus(subject: ISubject, status: number): void {
    this._store.dispatch(
      fromCore.addEditSubject({
        subject: { ...subject, status },
      })
    );
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

  onSearchText(search: string): void {
    this._store.dispatch(
      fromCore.loadAdminSubjects({ params: { page: 1, search } })
    );
  }

  onPageChange({ page }: any): void {
    this._store.dispatch(
      fromCore.loadAdminSubjects({ params: { page, search: '' } })
    );
  }

  ngOnInit(): void {
    this._store.dispatch(fromCore.loadProgramCountries());

    this._store.dispatch(
      fromCore.loadAdminSubjects({ params: { page: 1, search: '' } })
    );

    this._store.dispatch(
      fromCore.loadAdminFields({ params: { page: 1, search: '' } })
    );

    this._store.dispatch(
      fromCore.loadAdminPrograms({ params: { page: 1, search: '' } })
    );

    this.showAddNewSubjectModal$ = this._store.select(
      fromAdmin.selectAddNewSubjectModal
    );

    this.isAddingEditingSubject$ = this._store.select(
      fromCore.selectIsAddingEditingSubject
    );

    this.isDeletingSubject$ = this._store.select(
      fromCore.selectIsDeletingSubject
    );

    this.view$ = combineLatest([
      this._store.select(fromCore.selectFields),
      this._store.select(fromCore.selectSubjects),
      this._store.select(fromCore.selectPrograms),
      this._store.select(fromCore.selectProgramCountries),
      this._store.select(fromCore.selectIsLoadingSubjects),
      this._store.select(fromCore.selectLookUpsPagination),
    ]).pipe(
      map(([fields, subjects, programs, countries, loading, pagination]) => ({
        fields,
        loading,
        programs,
        subjects,
        countries,
        pagination,
      }))
    );
  }
}
