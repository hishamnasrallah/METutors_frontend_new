import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';

import { environment } from '@environment';
import * as fromCore from '@metutor/core/state';
import * as fromAdminAction from '@metutor/modules/admin/state/actions';

@Component({
  selector: 'metutors-refund-orders',
  templateUrl: './admin-finance-refund-orders.component.html',
  styleUrls: ['./admin-finance-refund-orders.component.scss'],
})
export class AdminFinanceRefundOrdersComponent implements OnInit {
  imageUrl = environment.imageURL;
  view$: Observable<{ orders: any; loading: boolean }>;

  constructor(private _store: Store<any>) {}

  onCloseBookingModal(): void {
    this._store.dispatch(fromAdminAction.closeAdminStudentBookingModal());
  }

  ngOnInit(): void {
    this._store.dispatch(fromCore.loadRefundOrders());

    this.view$ = combineLatest([
      this._store.select(fromCore.selectFinanceOrders),
      this._store.select(fromCore.selectIsLoadingIFinance),
    ]).pipe(map(([orders, loading]) => ({ orders, loading })));
  }
}
