import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';

import * as fromRoot from '@metutor/state';
import { IUser } from '@metutor/core/models';
import * as fromCore from '@metutor/core/state';
import * as fromTutor from '@metutor/modules/tutor/state';
import * as fromTutorAction from '@metutor/modules/tutor/state/actions';

@Component({
  selector: 'metutors-tutor-payment-records',
  templateUrl: './tutor-payment-records.component.html',
  styleUrls: ['./tutor-payment-records.component.scss'],
})
export class TutorPaymentRecordsComponent implements OnInit {
  layout$: any;
  user$: Observable<IUser | null>;
  showDisputeReasonModal$: Observable<boolean>;
  showDisputePaymentModal$: Observable<boolean>;
  showConfirmPaymentModal$: Observable<boolean>;

  constructor(private _store: Store<any>) {}

  onChangeTab(event: any): void {}

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
  }

  logout(): void {
    this._store.dispatch(fromCore.logout());
  }
}
