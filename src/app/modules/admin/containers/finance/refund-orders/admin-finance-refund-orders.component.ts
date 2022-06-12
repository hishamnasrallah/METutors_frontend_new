import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';

import { environment } from '@environment';
import * as fromCore from '@metutor/core/state';
import * as fromAdminAction from '@metutor/modules/admin/state/actions';
import * as fromAdmin from '@metutor/modules/admin/state';

@Component({
  selector: 'metutors-refund-orders',
  templateUrl: './admin-finance-refund-orders.component.html',
  styleUrls: ['./admin-finance-refund-orders.component.scss'],
})
export class AdminFinanceRefundOrdersComponent implements OnInit {
  feedbacks$: Observable<any>;
  imageUrl = environment.imageURL;
  loadingFeedback$: Observable<boolean>;
  showFeedbackModal$: Observable<boolean>;
  view$: Observable<{ orders: any; loading: boolean }>;

  constructor(private _store: Store<any>) {}

  onCloseBookingModal(): void {
    this._store.dispatch(fromAdminAction.closeAdminStudentBookingModal());
  }

  onOpenRefundPaymentModal(): void {}
  onOpenViewCancelledDetailModal(): void {}

  onOpenTeacherFeedbackModal(): void {
    this._store.dispatch(fromCore.loadAdminViewFeedback());
    this._store.dispatch(fromAdminAction.openAdminStudentViewFeedbackModal());
  }

  onCloseTeacherFeedbackModal(): void {
    this._store.dispatch(fromAdminAction.closeAdminStudentViewFeedbackModal());
  }

  ngOnInit(): void {
    this._store.dispatch(fromCore.loadRefundOrders());

    this.feedbacks$ = this._store.select(fromCore.selectAdminViewFeedback);

    this.showFeedbackModal$ = this._store.select(
      fromAdmin.selectAdminStudentViewFeedbackModal
    );

    this.loadingFeedback$ = this._store.select(
      fromCore.selectIsLoadingViewFeedback
    );

    this.view$ = combineLatest([
      this._store.select(fromCore.selectFinanceOrders),
      this._store.select(fromCore.selectIsLoadingIFinance),
    ]).pipe(map(([orders, loading]) => ({ orders, loading })));
  }
}
