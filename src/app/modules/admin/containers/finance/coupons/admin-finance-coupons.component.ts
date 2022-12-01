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
  showEditModal$: Observable<boolean>;
  showDeleteModal$: Observable<boolean>;
  isAddingCoupon$: Observable<boolean>;
  view$: Observable<{ result: any; loading: boolean }>;

  perPage = 10;
  selectedCoupon = null;

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

  onShowDeleteCouponModal(): void {
    this._store.dispatch(fromAdminAction.openDeleteCouponModal());
  }

  onDeleteCoupon(coupon: any): void {
    this._store.dispatch(fromCore.adminDeleteCoupon({ id: coupon.id }));
  }

  onCloseModal(): void {
    this._store.dispatch(fromAdminAction.closeAddCouponModal());
    this._store.dispatch(fromAdminAction.closeDeleteCouponModal());
  }

  onSubmit(body: any): void {
    const { expiry_date, ...res } = body;

    const coupon = {
      ...res,
      expiry_date: new Date(expiry_date).toISOString(),
    };

    if (res.id) {
      this._store.dispatch(fromCore.adminEditCoupon({ coupon }));
    } else {
      this._store.dispatch(fromCore.adminAddCoupon({ coupon }));
    }
  }

  ngOnInit(): void {
    this._store.dispatch(
      fromCore.loadCoupons({
        params: { page: 1, search: '' },
      })
    );

    this.showEditModal$ = this._store.select(fromAdmin.selectShowModal);

    this.showDeleteModal$ = this._store.select(
      fromAdmin.selectShowDeleteCouponModal
    );

    this.isAddingCoupon$ = this._store.select(
      fromCore.selectIsLoadingFinanceAddCoupon
    );

    this.view$ = combineLatest([
      this._store.select(fromCore.selectFinanceCoupons),
      this._store.select(fromCore.selectIsLoadingFinance),
    ]).pipe(map(([result, loading]) => ({ result, loading })));
  }
}
