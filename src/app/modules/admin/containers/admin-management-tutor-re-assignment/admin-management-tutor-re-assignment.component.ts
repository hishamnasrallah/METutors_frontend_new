import { Store } from '@ngrx/store';
import { CourseStatus } from '@config';
import { ITutorFilters } from '@models';
import { Component, OnInit } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';

import * as fromCore from '@metutor/core/state';
import * as fromAdmin from '@metutor/modules/admin/state';
import * as fromAdminAction from '@metutor/modules/admin/state/actions';

@Component({
  selector: 'metutors-admin-management-tutor-re-assignment',
  templateUrl: './admin-management-tutor-re-assignment.component.html',
  styleUrls: ['./admin-management-tutor-re-assignment.component.scss'],
})
export class AdminManagementTutorReAssignmentComponent implements OnInit {
  name: string;
  courseStatus = CourseStatus;

  view$: Observable<{
    loading: boolean;
    reAssignment: any;
  }>;

  currentSection = 1;
  totalBooking$: Observable<any>;
  openBookingModal$: Observable<boolean>;
  loadingTotalBooking: Observable<boolean>;

  constructor(private _store: Store<any>) {}

  onOpenBookingModal(id: number): void {
    const bookingType = 'subject';
    this._store.dispatch(
      fromCore.loadAdminStudentTotalBooking({ id, bookingType })
    );
    this._store.dispatch(fromAdminAction.openAdminStudentBookingModal());
  }

  onCloseBookingModal(): void {
    this._store.dispatch(fromAdminAction.closeAdminStudentBookingModal());
  }

  onChangeTab(tab: any): void {
    this.currentSection = tab;

    let status = 'not-available';
    switch (tab) {
      case 1:
        status = 'not-available';
        break;
      case 2:
        status = 'declined';
        break;
      case 3:
        status = 'cancelled';
        break;
      case 4:
        status = 'running';
        break;
    }

    this._store.dispatch(fromCore.loadAdminTutorReAssignment({ status }));
  }

  ngOnInit(): void {
    this._store.dispatch(
      fromCore.loadAdminTutorReAssignment({ status: 'not-available' })
    );

    this.openBookingModal$ = this._store.select(
      fromAdmin.selectAdminStudentBookingModal
    );

    this.loadingTotalBooking = this._store.select(
      fromCore.selectIsLoadingAdminBookingDetail
    );

    this.totalBooking$ = this._store.select(
      fromCore.selectAdminStudentTotalBooking
    );

    this.view$ = combineLatest([
      this._store.select(fromCore.selectAdminTutorReAssignment),
      this._store.select(fromCore.selectIsLoadingAdminTutorReAssignment),
    ]).pipe(
      map(([reAssignment, loading]) => ({
        reAssignment,
        loading,
      }))
    );
  }

  filterTutors(filters: ITutorFilters): void {
    // this.tutors$ = this._store.select(fromCore.selectFilteredPendingTutors, {
    //   ...filters,
    // });
  }

  onFilterTutors(): void {
    this.filterTutors({
      name: this.name,
    });
  }
}
