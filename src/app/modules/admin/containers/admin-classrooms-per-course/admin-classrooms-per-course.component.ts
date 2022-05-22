import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';

import { CourseStatus } from '@config';
import * as fromCore from '@metutor/core/state';
import { ICourse, ITutorFilters } from '@models';

@Component({
  selector: 'metutors-admin-classrooms-per-course',
  templateUrl: './admin-classrooms-per-course.component.html',
  styleUrls: ['./admin-classrooms-per-course.component.scss'],
})
export class AdminClassroomsPerCourseComponent implements OnInit {
  bookingsCounts$: Observable<any>;
  isLoadingAllBookings$: Observable<boolean>;
  allBookings$: Observable<ICourse[] | null>;
  isLoadingRunningBookings$: Observable<boolean>;
  runningBookings$: Observable<ICourse[] | null>;
  isLoadingCompletedBookings$: Observable<boolean>;
  completedBookings$: Observable<ICourse[] | null>;

  name: string;
  courseStatus = CourseStatus;

  constructor(private _store: Store<any>) {}

  ngOnInit(): void {
    this._prepareBookings();
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

  private _prepareBookings(): void {
    this._store.dispatch(fromCore.loadAllBookings());
    this._store.dispatch(fromCore.loadRunningBookings());
    this._store.dispatch(fromCore.loadCompletedBookings());

    this.bookingsCounts$ = this._store.select(fromCore.selectBookingsCounts);

    this.allBookings$ = this._store.select(fromCore.selectAllBookings);
    this.runningBookings$ = this._store.select(fromCore.selectRunningBookings);
    this.completedBookings$ = this._store.select(
      fromCore.selectCompletedBookings
    );

    this.isLoadingAllBookings$ = this._store.select(
      fromCore.selectIsLoadingAllBookings
    );
    this.isLoadingRunningBookings$ = this._store.select(
      fromCore.selectIsLoadingRunningBookings
    );
    this.isLoadingCompletedBookings$ = this._store.select(
      fromCore.selectIsLoadingCompletedBookings
    );
  }
}
