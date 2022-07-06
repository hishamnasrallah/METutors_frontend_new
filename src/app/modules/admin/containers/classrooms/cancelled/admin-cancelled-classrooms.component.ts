import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';

import { environment } from '@environment';
import * as fromCore from '@metutor/core/state';
import { CourseStatus, courseStatusLabel } from '@config';

@Component({
  selector: 'metutors-cancelled',
  templateUrl: './admin-cancelled-classrooms.component.html',
  styleUrls: ['./admin-cancelled-classrooms.component.scss'],
})
export class AdminCancelledClassroomsComponent implements OnInit {
  view$: Observable<{
    all: any;
    admin: any;
    tutor: any;
    student: any;
    loading: boolean;
    bookingCounts: any;
  }>;

  perPage = 10;
  courseStatus = CourseStatus;
  imageUrl = environment.imageURL;
  statusLabel = courseStatusLabel;

  constructor(private _store: Store<any>) {}

  onSearch(search: string): void {
    this._store.dispatch(
      fromCore.loadCancelledBookings({
        params: { page: 1, search },
      })
    );
  }

  onPageChange({ page }: any): void {
    this._store.dispatch(
      fromCore.loadCancelledBookings({
        params: { page, search: '' },
      })
    );
  }

  ngOnInit(): void {
    this._store.dispatch(
      fromCore.loadCancelledBookings({ params: { page: 1, search: '' } })
    );

    this.view$ = combineLatest([
      this._store.select(fromCore.selectBookingCounts),
      this._store.select(fromCore.selectCancelledBookings),
      this._store.select(fromCore.selectAdminCancelledBookings),
      this._store.select(fromCore.selectTeacherCancelledBookings),
      this._store.select(fromCore.selectStudentCancelledBookings),
      this._store.select(fromCore.selectIsLoadingCancelledBookings),
    ]).pipe(
      map(([bookingCounts, all, admin, tutor, student, loading]) => ({
        all,
        admin,
        tutor,
        student,
        loading,
        bookingCounts,
      }))
    );
  }
}
