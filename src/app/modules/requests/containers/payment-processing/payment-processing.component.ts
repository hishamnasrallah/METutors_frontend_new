import { Store } from '@ngrx/store';
import { environment } from '@environment';
import * as fromCore from '@metutor/core/state';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';
import * as fromRequests from '@metutor/modules/requests/state';

@Component({
  selector: 'metutors-payment-processing',
  templateUrl: './payment-processing.component.html',
  styleUrls: ['./payment-processing.component.scss'],
})
export class PaymentProcessingComponent implements OnInit {
  paymentInfo$: Observable<any>;
  isRetryingPayment$: Observable<any>;
  showConfirmPaymentModal$: Observable<boolean>;
  view$: Observable<{ loading: boolean; paymentInfo: any }>;

  baseURL = environment.clientUrl;
  constructor(private _store: Store<any>, private _route: ActivatedRoute) {}

  retryPayment(): void {
    const { course_id } = this._route.snapshot.queryParams;
    const redirectUrl = this.baseURL + '/requests/payment-processing';
    this._store.dispatch(
      fromCore.reTryPayment({ courseId: course_id, redirectUrl })
    );
  }

  ngOnInit(): void {
    const { id, course_id, resourcePath } = this._route.snapshot.queryParams;

    this._store.dispatch(
      fromCore.verifyCoursePayment({ id, courseId: course_id, resourcePath })
    );

    this.paymentInfo$ = this._store.select(fromCore.selectFinancePaymentInfo);

    this.isRetryingPayment$ = this._store.select(
      fromCore.selectIsRetryingPayment
    );

    this.showConfirmPaymentModal$ = this._store.select(
      fromRequests.selectIsConfirmPaymentModal
    );

    this.view$ = combineLatest([
      this._store.select(fromCore.selectIsLoadingFinance),
      this._store.select(fromCore.selectFinanceCoursePaymentStatus),
    ]).pipe(map(([loading, paymentInfo]) => ({ loading, paymentInfo })));
  }
}
