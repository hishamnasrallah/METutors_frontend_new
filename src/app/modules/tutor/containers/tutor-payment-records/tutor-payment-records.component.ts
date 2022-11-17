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
  showDisputeReasonModal$: Observable<boolean>;
  showDisputePaymentModal$: Observable<boolean>;
  showConfirmPaymentModal$: Observable<boolean>;
  view$: Observable<{ loading: boolean; payments: any }>;

  paymentId = null;
  showClasses = false;

  constructor(private _store: Store<any>) {}

  onChangeTab(tab: any): void {
    switch (tab.index) {
      case 0:
        this._store.dispatch(fromCore.loadTutorPayments({ status: 'pending' }));
        break;
      case 1:
        this._store.dispatch(
          fromCore.loadTutorPayments({ status: 'disputed' })
        );
        break;
      case 2:
        this._store.dispatch(fromCore.loadTutorPayments({ status: 'history' }));
        break;
    }
  }

  onOpenDisputePaymentModal(): void {
    this._store.dispatch(fromTutorAction.openDisputePaymentModal());
  }

  onOpenDisputeReasonModal(): void {
    this._store.dispatch(fromTutorAction.openDisputeReasonModal());
  }

  onShowConfirmPaymentModal(): void {
    this._store.dispatch(fromTutorAction.openConfirmPaymentModal());
  }

  onCloseModals(): void {
    this._store.dispatch(fromTutorAction.closeDisputeReasonModal());
    this._store.dispatch(fromTutorAction.closeDisputePaymentModal());
    this._store.dispatch(fromTutorAction.closeConfirmPaymentModal());
  }

  ngOnInit(): void {
    this.layout$ = this._store.select(fromRoot.selectLayout);
    this.user$ = this._store.select(fromCore.selectUser);

    this.showDisputeReasonModal$ = this._store.select(
      fromTutor.selectDisputeReasonModal
    );
    this.showDisputePaymentModal$ = this._store.select(
      fromTutor.selectDisputePaymentModal
    );
    this.showConfirmPaymentModal$ = this._store.select(
      fromTutor.selectConfirmPaymentModal
    );

    this._store.dispatch(fromCore.loadTutorPayments({ status: 'pending' }));

    this.view$ = combineLatest([
      this._store.select(fromCore.selectTutorPayments),
      this._store.select(fromCore.selectIsLoadingTutorPayments),
    ]).pipe(map(([payments, loading]) => ({ loading, payments })));
  }

  logout(): void {
    this._store.dispatch(fromCore.logout());
  }
}
