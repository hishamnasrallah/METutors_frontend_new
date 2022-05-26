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
    booking: any;
    loading: boolean;
  }>;

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
    let status = 'running';
    switch (tab.index) {
      case 0:
        status = 'running';
        break;
      case 1:
        status = 'pending';
        break;
      case 2:
        status = 'reassigned';
        break;
      case 3:
        status = 'cancelled';
        break;
      case 4:
        status = 'completed';
        break;
    }

    this._store.dispatch(fromCore.loadAdminBookingPerCourse({ status }));
  }

  ngOnInit(): void {
    this._store.dispatch(
      fromCore.loadAdminBookingPerCourse({ status: 'running' })
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
      this._store.select(fromCore.selectBookingPerCourse),
      this._store.select(fromCore.selectIsLoadingBookingPerCourse),
    ]).pipe(
      map(([booking, loading]) => ({
        booking,
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
