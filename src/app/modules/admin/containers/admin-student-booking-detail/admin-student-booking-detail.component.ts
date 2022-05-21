import { Store } from '@ngrx/store';
import { combineLatest, map, Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

import * as fromCore from '@metutor/core/state';

@Component({
  selector: 'metutors-admin-student-booking-detail',
  templateUrl: './admin-student-booking-detail.component.html',
  styleUrls: ['./admin-student-booking-detail.component.scss'],
})
export class AdminStudentBookingDetailComponent implements OnInit {
  view$: Observable<{ detail: any; loading: boolean }>;

  constructor(private _store: Store<any>) {}

  ngOnInit(): void {
    // this._store.dispatch(fromCore.loadAdminStudentBookingDetail());
    this.view$ = combineLatest([
      this._store.select(fromCore.selectAdminStudentBookingDetail),
      this._store.select(fromCore.selectIsLoadingAdminBookingDetail),
    ]).pipe(map(([detail, loading]) => ({ detail, loading })));
  }
}
