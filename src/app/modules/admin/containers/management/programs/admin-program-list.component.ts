import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';

import * as fromCore from '@metutor/core/state';
import * as fromAdmin from '@metutor/modules/admin/state';
import { ISubject, IPagination, IProgram } from '@models';
import * as fromAdminActions from '@metutor/modules/admin/state/actions';

import { GRADES, SubjectStatus, SUBJECT_STATUSES_CONST } from '@config';

@Component({
  selector: 'metutors-programs',
  templateUrl: './admin-program-list.component.html',
  styleUrls: ['./admin-program-list.component.scss'],
})
export class AdminProgramListComponent implements OnInit {
  pagination$: Observable<IPagination>;

  programs$: Observable<IProgram[] | null>;

  tab = 0;
  perPage = 10;
  title: string;
  grades = GRADES;
  grade?: number;
  status?: number;

  subjectStatus = SubjectStatus;

  subjectStatusConst = SUBJECT_STATUSES_CONST;

  deletedSubject?: ISubject;
  selectedSubject?: ISubject;
  isLoadingSubject$: Observable<boolean>;
  isDeletingSubject$: Observable<boolean>;
  subjects$: Observable<ISubject[] | null>;
  isAddingEditingSubject$: Observable<boolean>;
  showAddNewSubjectModal$: Observable<boolean>;

  constructor(private _store: Store<any>) {}

  ngOnInit(): void {
    this.programs$ = this._store.select(fromCore.selectPrograms);

    // Country
    // this._prepareCountries();

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

    this.pagination$ = this._store.select(fromCore.selectLookUpsPagination);
  }

  onSearchText(search: string, type: string): void {
    switch (type) {
      case 'fields':
        break;
    }
  }

  onChangeTab(tab: any): void {
    this.tab = tab.index;
    this._store.dispatch(fromCore.resetLookUpsPagination());
    switch (tab.index) {
      case 0:
        break;
      case 1:
        break;
      case 2:
        break;
      case 3:
        this._prepareSubjects();
        break;
    }
  }

  // Country

  onChangeCountrySelection(): void {}

  // Course
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

  private _prepareSubjects(): void {
    this._store.dispatch(fromCore.loadAdminSubjects());
    this.subjects$ = this._store.select(fromCore.selectSubjects);
    this.isLoadingSubject$ = this._store.select(
      fromCore.selectIsLoadingSubjects
    );
  }
}
