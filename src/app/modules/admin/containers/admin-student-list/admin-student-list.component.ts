import { map, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';

import { environment } from '@environment';
import * as fromCore from '@metutor/core/state';
import { IStudentFilters } from '@metutor/core/models';
import * as fromAdmin from '@metutor/modules/admin/state';
import * as fromAdminAction from '@metutor/modules/admin/state/actions';

import {
  TutorStatus,
  StudentStatus,
  STUDENT_STATUSES_CONST,
} from '@metutor/config';

@Component({
  selector: 'metutors-admin-student-list',
  templateUrl: './admin-student-list.component.html',
  styleUrls: ['./admin-student-list.component.scss'],
})
export class AdminStudentListComponent implements OnInit {
  students$: Observable<any>;
  totalBooking$: Observable<any>;
  isLoading$: Observable<boolean>;
  registeredStudents$: Observable<any>;
  openBookingModal$: Observable<boolean>;
  loadingTotalBooking: Observable<boolean>;

  name: string;
  studentId: any;
  tutorStatus = TutorStatus;
  imageUrl = environment.imageURL;
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

  onChangeTab(tab: any): void {
    let status: any = StudentStatus.active;
    switch (tab.index) {
      case 0:
        status = null;
        break;
      case 1:
        status = StudentStatus.active;
        break;
      case 2:
        status = StudentStatus.suspended;
        break;
    }

    this.filterStudents({
      status,
    });
  }

  filterStudents(filters: IStudentFilters): void {
    this.registeredStudents$ = this._store.select(
      fromCore.selectFilteredStudents,
      {
        ...filters,
      }
    );
  }

  onFilterStudents(): void {
    console.log(this.name);
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
    this.isLoading$ = this._store.select(fromCore.selectIsLoadingStudents);
    this.students$ = this._store.select(fromCore.selectStudents);
    this.registeredStudents$ = this._store
      .select(fromCore.selectStudents)
      .pipe(map((students: any) => students?.registeredStudents));
  }
}
