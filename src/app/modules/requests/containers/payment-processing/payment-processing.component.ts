import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';

import * as fromCore from '@metutor/core/state';

@Component({
  selector: 'metutors-payment-processing',
  templateUrl: './payment-processing.component.html',
  styleUrls: ['./payment-processing.component.scss'],
})
export class PaymentProcessingComponent implements OnInit {
  view$: Observable<{ loading: boolean; paymentInfo: any }>;

  constructor(private _store: Store<any>, private _route: ActivatedRoute) {}

  ngOnInit(): void {
    const { id, course_id, resourcePath } = this._route.snapshot.queryParams;

    this._store.dispatch(
      fromCore.verifyCoursePayment({ id, courseId: course_id, resourcePath })
    );

    this.view$ = combineLatest([
      this._store.select(fromCore.selectIsLoadingFinance),
      this._store.select(fromCore.selectFinanceCoursePaymentStatus),
    ]).pipe(map(([loading, paymentInfo]) => ({ loading, paymentInfo })));
  }
}
