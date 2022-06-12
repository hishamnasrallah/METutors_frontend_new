import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';

import { environment } from '@environment';
import * as fromCore from '@metutor/core/state';
import * as fromAdmin from '@metutor/modules/admin/state';
import * as fromAdminAction from '@metutor/modules/admin/state/actions';

@Component({
  selector: 'metutors-refund-orders',
  templateUrl: './admin-finance-refund-orders.component.html',
  styleUrls: ['./admin-finance-refund-orders.component.scss'],
})
export class AdminFinanceRefundOrdersComponent implements OnInit {
  courseId: number;
  feedbacks$: Observable<any>;
  reFundDetail$: Observable<any>;
  imageUrl = environment.imageURL;
  loadingRefund$: Observable<boolean>;
  loadingFeedback$: Observable<boolean>;
  showFeedbackModal$: Observable<boolean>;
  showRefundDetailModal: Observable<boolean>;
  view$: Observable<{ orders: any; loading: boolean }>;

  constructor(private _store: Store<any>) {}

  onCloseBookingModal(): void {
    this._store.dispatch(fromAdminAction.closeAdminStudentBookingModal());
  }

  onOpenRefundPaymentModal(): void {}

  onOpenRefundDetailModal(courseId: number): void {
    this._store.dispatch(fromCore.loadRefundDetail({ courseId }));
    this._store.dispatch(fromAdminAction.openRefundDetailModal());
  }

  onCloseRefundDetailModal(): void {
    this._store.dispatch(fromAdminAction.closeRefundDetailModal());
  }

  onOpenTeacherFeedbackModal(): void {
    this._store.dispatch(fromCore.loadAdminViewFeedback());
    this._store.dispatch(fromAdminAction.openAdminStudentViewFeedbackModal());
  }

  onCloseTeacherFeedbackModal(): void {
    this._store.dispatch(fromAdminAction.closeAdminStudentViewFeedbackModal());
  }

  onOpenRefundModal(): void {}

  ngOnInit(): void {
    this._store.dispatch(fromCore.loadRefundOrders());

    this.feedbacks$ = this._store.select(fromCore.selectAdminViewFeedback);

    this.reFundDetail$ = this._store.select(fromCore.selectFinanceRefundDetail);

    this.showFeedbackModal$ = this._store.select(
      fromAdmin.selectAdminStudentViewFeedbackModal
    );

    this.showRefundDetailModal = this._store.select(
      fromAdmin.selectShowRefundDetailModal
    );

    this.loadingFeedback$ = this._store.select(
      fromCore.selectIsLoadingViewFeedback
    );

    this.loadingRefund$ = this._store.select(
      fromCore.selectIsLoadingFinanceRefundDetail
    );

    this.view$ = combineLatest([
      this._store.select(fromCore.selectFinanceOrders),
      this._store.select(fromCore.selectIsLoadingFinance),
    ]).pipe(map(([orders, loading]) => ({ orders, loading })));
  }
}
