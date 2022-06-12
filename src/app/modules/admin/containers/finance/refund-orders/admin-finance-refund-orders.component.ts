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
  teacherId: number;
  feedbacks$: Observable<any>;
  reFundDetail$: Observable<any>;
  imageUrl = environment.imageURL;
  loadingRefund$: Observable<boolean>;
  loadingFeedback$: Observable<boolean>;
  showFeedbackModal$: Observable<boolean>;
  showRefundDetailModal: Observable<boolean>;
  showRefundPaymentModal: Observable<boolean>;
  view$: Observable<{ orders: any; loading: boolean }>;

  constructor(private _store: Store<any>) {}

  onOpenRefundPaymentModal(): void {
    this._store.dispatch(fromAdminAction.openRefundPaymentModal());
  }

  onOpenRefundDetailModal(courseId: number): void {
    this._store.dispatch(fromCore.loadRefundDetail({ courseId }));
    this._store.dispatch(fromAdminAction.openRefundDetailModal());
  }

  onOpenTeacherFeedbackModal(id: number, teacherId: number): void {
    this._store.dispatch(fromCore.loadAdminViewFeedback({ id, teacherId }));
    this._store.dispatch(fromAdminAction.openAdminStudentViewFeedbackModal());
  }

  onCloseModals(): void {
    this._store.dispatch(fromAdminAction.closeRefundDetailModal());
    this._store.dispatch(fromAdminAction.closeRefundPaymentModal());
    this._store.dispatch(fromAdminAction.closeAdminStudentViewFeedbackModal());
  }

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

    this.showRefundPaymentModal = this._store.select(
      fromAdmin.selectShowRefundPaymentModal
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
