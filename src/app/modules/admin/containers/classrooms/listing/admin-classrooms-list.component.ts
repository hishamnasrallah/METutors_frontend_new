import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';

import { courseStatusLabel } from '@config';
import { ICourse, ITutorFilters } from '@models';
import * as fromCore from '@metutor/core/state';

@Component({
  selector: 'metutors-listing',
  templateUrl: './admin-classrooms-list.component.html',
  styleUrls: ['./admin-classrooms-list.component.scss'],
})
export class AdminClassroomsListComponent implements OnInit {
  status = '';
  perPage = 10;
  statusLabel = courseStatusLabel;

  view$: Observable<{
    loading: boolean;
    bookingCounts: any;
    bookings: ICourse[] | null;
  }>;

  constructor(private _store: Store<any>) {}

  ngOnInit(): void {
    this._prepareBookings();
  }

  onSearch(search: string): void {
    this._store.dispatch(
      fromCore.loadBookings({
        params: { page: 1, search, status: this.status },
      })
    );
  }

  onPageChange({ page }: any): void {
    this._store.dispatch(
      fromCore.loadBookings({
        params: { page, search: '', status: this.status },
      })
    );
  }

  onChangeTab(tab: any): void {
    this.status = '';
    switch (tab.index) {
      case 0:
        this.status = '';
        break;
      case 1:
        this.status = 'running';
        break;
      case 2:
        this.status = 'completed';
        break;
    }

    this._store.dispatch(
      fromCore.loadBookings({
        params: { page: 1, search: '', status: this.status },
      })
    );
  }

  private _prepareBookings(): void {
    this._store.dispatch(
      fromCore.loadBookings({
        params: { page: 1, search: '', status: '' },
      })
    );

    this.view$ = combineLatest([
      this._store.select(fromCore.selectBookings),
      this._store.select(fromCore.selectBookingCounts),
      this._store.select(fromCore.selectIsLoadingBookings),
    ]).pipe(
      map(([bookings, bookingCounts, loading]) => ({
        loading,
        bookings,
        bookingCounts,
      }))
    );
  }
}
