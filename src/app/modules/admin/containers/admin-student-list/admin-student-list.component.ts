import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';

import * as fromCore from '@metutor/core/state';
import * as fromAdmin from '@metutor/modules/admin/state';
import { IStudent, IStudentFilters } from '@metutor/core/models';
import { TutorStatus, STUDENT_STATUSES_CONST } from '@metutor/config';
import * as fromAdminAction from '@metutor/modules/admin/state/actions';

@Component({
  selector: 'metutors-admin-student-list',
  templateUrl: './admin-student-list.component.html',
  styleUrls: ['./admin-student-list.component.scss'],
})
export class AdminStudentListComponent implements OnInit {
  isLoading$: Observable<boolean>;
  studentsCounts$: Observable<any>;
  openBookingModal$: Observable<boolean>;
  students$: Observable<IStudent[] | null>;

  name: string;
  tutorStatus = TutorStatus;
  studentId: number | undefined;
  studentStatuses = STUDENT_STATUSES_CONST;

  constructor(private _store: Store<any>) {}

  ngOnInit(): void {
    this._prepareStudents();

    this.openBookingModal$ = this._store.select(
      fromAdmin.selectAdminStudentBookingModal
    );
  }

  filterStudents(filters: IStudentFilters): void {
    this.students$ = this._store.select(fromCore.selectFilteredStudents, {
      ...filters,
    });
  }

  onFilterStudents(): void {
    this.filterStudents({
      name: this.name,
    });
  }

  onOpenBookingModal(): void {
    this._store.dispatch(fromAdminAction.openAdminStudentBookingModal());
  }

  onCloseBookingModal(): void {
    this._store.dispatch(fromAdminAction.closeAdminStudentBookingModal());
  }

  private _prepareStudents(): void {
    this._store.dispatch(fromCore.loadStudents());
    this.students$ = this._store.select(fromCore.selectStudents);
    this.studentsCounts$ = this._store.select(fromCore.selectTutorsCounts);
    this.isLoading$ = this._store.select(fromCore.selectIsLoadingStudents);
  }
}
