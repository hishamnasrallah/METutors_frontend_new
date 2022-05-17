import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromCore from '@metutor/core/state';
import { Component, OnInit } from '@angular/core';
import { CourseStatus } from '@metutor/config';
import { ICourse, ITutorFilters } from '@metutor/core/models';

@Component({
  selector: 'metutors-admin-cancelled-classrooms',
  templateUrl: './admin-cancelled-classrooms.component.html',
  styleUrls: ['./admin-cancelled-classrooms.component.scss'],
})
export class AdminCancelledClassroomsComponent implements OnInit {
  bookingsCounts$: Observable<any>;
  isLoading$: Observable<boolean>;
  cancelledBookings$: Observable<ICourse[] | null>;

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
    this._store.dispatch(fromCore.loadCancelledBookings());
    this.bookingsCounts$ = this._store.select(fromCore.selectBookingsCounts);
    this.cancelledBookings$ = this._store.select(
      fromCore.selectCancelledBookings
    );
    this.isLoading$ = this._store.select(
      fromCore.selectIsLoadingCancelledBookings
    );
  }
}
