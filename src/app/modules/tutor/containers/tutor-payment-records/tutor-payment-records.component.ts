import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { combineLatest, Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

import {
  group,
  state,
  style,
  trigger,
  animate,
  transition,
} from '@angular/animations';

import * as fromRoot from '@metutor/state';
import { IUser } from '@metutor/core/models';
import * as fromCore from '@metutor/core/state';
import * as fromTutor from '@metutor/modules/tutor/state';
import * as fromTutorAction from '@metutor/modules/tutor/state/actions';
import { selectTutorDisputeDetails } from '@metutor/core/state/reducers/tutor-payment.reducer';

@Component({
  selector: 'metutors-tutor-payment-records',
  templateUrl: './tutor-payment-records.component.html',
  styleUrls: ['./tutor-payment-records.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('in', style({ height: '*', opacity: 0 })),
      transition(':leave', [
        style({ height: '*', opacity: 1 }),

        group([
          animate(300, style({ height: 0 })),
          animate('200ms ease-in-out', style({ opacity: '0' })),
        ]),
      ]),
      transition(':enter', [
        style({ height: '0', opacity: 0 }),

        group([
          animate(300, style({ height: '*' })),
          animate('400ms ease-in-out', style({ opacity: '1' })),
        ]),
      ]),
    ]),
  ],
})
export class TutorPaymentRecordsComponent implements OnInit {
  layout$: any;
  user$: Observable<IUser | null>;
  isLoading$: Observable<boolean>;
  paymentDetails$: Observable<any>;
  disputeDetails$: Observable<any>;
  showDisputeModal$: Observable<boolean>;
  isAddingDisputeComment$: Observable<boolean>;
  showDisputePaymentModal$: Observable<boolean>;
  showConfirmPaymentModal$: Observable<boolean>;
  showPaymentSuccessModal$: Observable<boolean>;
  isLoadingPaymentDetails$: Observable<boolean>;
  view$: Observable<{ loading: boolean; payments: any }>;

  perPage = 10;
  paymentId = null;
  status = 'pending';
  showClasses = false;
  transactionId: string;
  disputeModalData: any;

  constructor(private _store: Store<any>) {}

  onChangeTab(tab: any): void {
    switch (tab.index) {
      case 0:
        this.status = 'pending';
        this._store.dispatch(
          fromCore.loadTutorPayments({
            params: { page: 1, search: '', payment: this.status },
          })
        );
        break;
      case 1:
        this.status = 'disputed';
        this._store.dispatch(
          fromCore.loadTutorPayments({
            params: { page: 1, search: '', payment: this.status },
          })
        );
        break;
      case 2:
        this.status = 'history';
        this._store.dispatch(
          fromCore.loadTutorPayments({
            params: { page: 1, search: '', payment: this.status },
          })
        );
        break;
    }
  }

  onOpenDisputePaymentModal(id: string): void {
    this._store.dispatch(fromCore.loadTutorDisputeDetails({ id }));
    this._store.dispatch(fromTutorAction.openDisputePaymentModal());
  }

  onCloseDisputePaymentModal(): void {
    this._store.dispatch(fromTutorAction.closeDisputePaymentModal());
  }

  onShowConfirmPaymentModal(id: string): void {
    this.transactionId = id;
    this._store.dispatch(fromCore.loadTutorPaymentDetails({ id }));
    this._store.dispatch(fromTutorAction.openConfirmPaymentModal());
  }

  onCloseDisputeModal(): void {
    this._store.dispatch(fromTutorAction.closeDisputeModal());
  }

  onClosePaymentModal(): void {
    this._store.dispatch(fromTutorAction.closeConfirmPaymentModal());
  }

  onCloseSuccessModal(): void {
    this._store.dispatch(fromTutorAction.closePaymentSuccessModal());
  }

  onOpenDisputeModal(data: any): void {
    this.disputeModalData = data;
    this._store.dispatch(fromTutorAction.openDisputeModal());
    this._store.dispatch(fromTutorAction.closeConfirmPaymentModal());
  }

  onSubmitDisputeReason({ reason }: any): void {
    const payload = {
      reason,
      transaction_id: this.transactionId,
      courses: this.disputeModalData.courses,
    };

    this._store.dispatch(fromCore.tutorCreateDispute({ payload }));
  }

  onRequestPayment(): void {
    this._store.dispatch(
      fromCore.tutorRequestPayment({ id: this.transactionId })
    );
  }

  onPageChange({ page }: any): void {
    this._store.dispatch(
      fromCore.loadTutorPayments({
        params: { page, search: '', payment: this.status },
      })
    );
  }

  onSubmitComment(body: any): void {
    this._store.dispatch(fromCore.tutorAddDisputeComment({ body }));
  }

  ngOnInit(): void {
    this.layout$ = this._store.select(fromRoot.selectLayout);
    this.user$ = this._store.select(fromCore.selectUser);

    this.showDisputeModal$ = this._store.select(fromTutor.selectDisputeModal);

    this.showDisputePaymentModal$ = this._store.select(
      fromTutor.selectDisputePaymentModal
    );

    this.showConfirmPaymentModal$ = this._store.select(
      fromTutor.selectConfirmPaymentModal
    );

    this.showPaymentSuccessModal$ = this._store.select(
      fromTutor.selectPaymentSuccessModal
    );

    this.paymentDetails$ = this._store.select(
      fromCore.selectTutorPaymentDetails
    );

    this.disputeDetails$ = this._store.select(
      fromCore.selectTutorDisputeDetails
    );

    this.isAddingDisputeComment$ = this._store.select(
      fromCore.selectTutorIsAddingDisputeComment
    );

    this.isLoadingPaymentDetails$ = this._store.select(
      fromCore.selectIsLoadingTutorPaymentDetails
    );

    this.isLoading$ = this._store.select(fromCore.selectTutorPaymentLoading);

    this._store.dispatch(
      fromCore.loadTutorPayments({
        params: { page: 1, search: '', payment: this.status },
      })
    );

    this.view$ = combineLatest([
      this._store.select(fromCore.selectTutorPayments),
      this._store.select(fromCore.selectIsLoadingTutorPayments),
    ]).pipe(map(([payments, loading]) => ({ loading, payments })));
  }

  logout(): void {
    this._store.dispatch(fromCore.logout());
  }
}
