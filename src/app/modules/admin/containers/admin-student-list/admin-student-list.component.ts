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
  students$: Observable<any>;
  totalBooking$: Observable<any>;
  isLoading$: Observable<boolean>;
  openBookingModal$: Observable<boolean>;
  loadingTotalBooking: Observable<boolean>;

  name: string;
  studentId: any;
  tutorStatus = TutorStatus;
  studentStatuses = STUDENT_STATUSES_CONST;

  constructor(private _store: Store<any>) {}

  ngOnInit(): void {
    this._prepareStudents();

    this.openBookingModal$ = this._store.select(
      fromAdmin.selectAdminStudentBookingModal
    );

    this.loadingTotalBooking = this._store.select(
      fromCore.selectIsLoadingAdminBookingDetail
    );

    this.totalBooking$ = this._store.select(
      fromCore.selectAdminStudentTotalBooking
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

  onOpenBookingModal(id: number): void {
    this._store.dispatch(fromCore.loadAdminStudentTotalBooking({ id }));
    this._store.dispatch(fromAdminAction.openAdminStudentBookingModal());
  }

  onCloseBookingModal(): void {
    this._store.dispatch(fromAdminAction.closeAdminStudentBookingModal());
  }

  private _prepareStudents(): void {
    this._store.dispatch(fromCore.loadStudents());
    this.students$ = this._store.select(fromCore.selectStudents);
    this.isLoading$ = this._store.select(fromCore.selectIsLoadingStudents);
  }
}
