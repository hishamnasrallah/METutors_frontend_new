import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';

import * as fromCore from '@metutor/core/state';
import * as fromAdmin from '@metutor/modules/admin/state';
import * as fromAdminAction from '@metutor/modules/admin/state/actions';

@Component({
  selector: 'metutors-admin-finance-coupons',
  templateUrl: './admin-finance-coupons.component.html',
  styleUrls: ['./admin-finance-coupons.component.scss'],
})
export class AdminFinanceCouponsComponent implements OnInit {
  showModal$: Observable<boolean>;
  view$: Observable<{ result: any; loading: boolean }>;

  perPage = 10;

  constructor(private _store: Store<any>) {}

  onSearch(search: string): void {
    this._store.dispatch(
      fromCore.loadCoupons({
        params: { page: 1, search },
      })
    );
  }

  onPageChange({ page }: any): void {
    this._store.dispatch(
      fromCore.loadCoupons({
        params: { page, search: '' },
      })
    );
  }

  onAddCoupon(): void {
    this._store.dispatch(fromAdminAction.openAddCouponModal());
  }

  onCloseModal(): void {
    this._store.dispatch(fromAdminAction.closeAddCouponModal());
  }

  ngOnInit(): void {
    this._store.dispatch(
      fromCore.loadCoupons({
        params: { page: 1, search: '' },
      })
    );

    this.showModal$ = this._store.select(fromAdmin.selectShowModal);

    this.view$ = combineLatest([
      this._store.select(fromCore.selectFinanceCoupons),
      this._store.select(fromCore.selectIsLoadingFinance),
    ]).pipe(map(([result, loading]) => ({ result, loading })));
  }
}
