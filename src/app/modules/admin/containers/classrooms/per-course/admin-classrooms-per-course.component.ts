import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';

import * as fromCore from '@metutor/core/state';
import * as fromAdmin from '@metutor/modules/admin/state';
import * as fromAdminAction from '@metutor/modules/admin/state/actions';

@Component({
  selector: 'metutors-per-course',
  templateUrl: './admin-classrooms-per-course.component.html',
  styleUrls: ['./admin-classrooms-per-course.component.scss'],
})
export class AdminClassroomsPerCourseComponent implements OnInit {
  totalBooking$: Observable<any>;
  openBookingModal$: Observable<boolean>;
  loadingTotalBooking$: Observable<boolean>;

  perPage = 10;
  status = 'running';

  view$: Observable<{
    booking: any;
    loading: boolean;
  }>;

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
    switch (tab.index) {
      case 0:
        this.status = 'running';
        break;
      case 1:
        this.status = 'pending';
        break;
      case 2:
        this.status = 'reassigned';
        break;
      case 3:
        this.status = 'cancelled';
        break;
      case 4:
        this.status = 'completed';
        break;
    }

    this._store.dispatch(
      fromCore.loadAdminBookingPerCourse({
        params: { page: 1, search: '', status: this.status },
      })
    );
  }

  onSearch(search: string): void {
    this._store.dispatch(
      fromCore.loadAdminBookingPerCourse({
        params: { page: 1, search, status: this.status },
      })
    );
  }

  onPageChange({ page }: any): void {
    this._store.dispatch(
      fromCore.loadAdminBookingPerCourse({
        params: { page, search: '', status: this.status },
      })
    );
  }

  ngOnInit(): void {
    this._store.dispatch(
      fromCore.loadAdminBookingPerCourse({
        params: {
          page: 1,
          search: '',
          status: 'running',
        },
      })
    );

    this.openBookingModal$ = this._store.select(
      fromAdmin.selectAdminStudentBookingModal
    );

    this.loadingTotalBooking$ = this._store.select(
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
}
