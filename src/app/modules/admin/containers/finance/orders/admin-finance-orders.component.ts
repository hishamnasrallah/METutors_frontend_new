import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';

import { environment } from '@environment';
import * as fromCore from '@metutor/core/state';
import * as fromAdminAction from '@metutor/modules/admin/state/actions';
import * as fromAdmin from '@metutor/modules/admin/state';

@Component({
  selector: 'metutors-orders',
  templateUrl: './admin-finance-orders.component.html',
  styleUrls: ['./admin-finance-orders.component.scss'],
})
export class AdminFinanceOrdersComponent implements OnInit {
  bookingType = 'teacher';
  totalBooking$: Observable<any>;
  imageUrl = environment.imageURL;
  openBookingModal$: Observable<boolean>;
  loadingTotalBooking$: Observable<boolean>;
  view$: Observable<{ orders: any; loading: boolean }>;

  constructor(private _store: Store<any>) {}

  onOpenBookingModal(id: number): void {
    const bookingType = this.bookingType;
    this._store.dispatch(
      fromCore.loadAdminStudentTotalBooking({ id, bookingType })
    );
    this._store.dispatch(fromAdminAction.openAdminStudentBookingModal());
  }

  onCloseBookingModal(): void {
    this._store.dispatch(fromAdminAction.closeAdminStudentBookingModal());
  }

  ngOnInit(): void {
    this._store.dispatch(fromCore.loadOrders());

    this.openBookingModal$ = this._store.select(
      fromAdmin.selectAdminStudentBookingModal
    );

    this.totalBooking$ = this._store.select(
      fromCore.selectAdminStudentTotalBooking
    );

    this.loadingTotalBooking$ = this._store.select(
      fromCore.selectIsLoadingAdminBookingDetail
    );

    this.view$ = combineLatest([
      this._store.select(fromCore.selectFinanceOrders),
      this._store.select(fromCore.selectIsLoadingIFinance),
    ]).pipe(map(([orders, loading]) => ({ orders, loading })));
  }
}
