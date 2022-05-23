import { combineLatest, map, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';

import { CourseStatus } from '@config';
import { ITutorFilters } from '@models';
import * as fromCore from '@metutor/core/state';
import * as fromAdmin from '@metutor/modules/admin/state';
import * as fromAdminAction from '@metutor/modules/admin/state/actions';

@Component({
  selector: 'metutors-admin-classrooms-per-course',
  templateUrl: './admin-classrooms-per-course.component.html',
  styleUrls: ['./admin-classrooms-per-course.component.scss'],
})
export class AdminClassroomsPerCourseComponent implements OnInit {
  name: string;
  courseStatus = CourseStatus;

  view$: Observable<{
    pending: any;
    running: any;
    completed: any;
    cancelled: any;
    reassigned: any;
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
    switch (tab.index) {
      case 0:
        this._store.dispatch(
          fromCore.loadAdminBookingPerCourseRunning({ status: 'running' })
        );
        break;
      case 1:
        this._store.dispatch(
          fromCore.loadAdminBookingPerCoursePending({ status: 'pending' })
        );
        break;
      case 2:
        this._store.dispatch(
          fromCore.loadAdminBookingPerCourseReAssigned({ status: 'reassigned' })
        );
        break;
      case 3:
        this._store.dispatch(
          fromCore.loadAdminBookingPerCourseCancelled({ status: 'cancelled' })
        );
        break;
      case 4:
        this._store.dispatch(
          fromCore.loadAdminBookingPerCourseCompleted({ status: 'completed' })
        );
        break;
    }
  }

  ngOnInit(): void {
    this._store.dispatch(
      fromCore.loadAdminBookingPerCourseRunning({ status: 'running' })
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
      this._store.select(fromCore.selectBookingPerCourseRunning),
      this._store.select(fromCore.selectBookingPerCoursePending),
      this._store.select(fromCore.selectBookingPerCourseCancelled),
      this._store.select(fromCore.selectBookingPerCourseCompleted),
      this._store.select(fromCore.selectBookingPerCourseReAssigned),
      this._store.select(fromCore.selectIsLoadingBookingPerCourse),
    ]).pipe(
      map(([running, pending, cancelled, completed, reassigned, loading]) => ({
        running,
        pending,
        loading,
        cancelled,
        completed,
        reassigned,
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
