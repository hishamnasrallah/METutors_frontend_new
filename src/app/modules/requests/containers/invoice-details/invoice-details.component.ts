import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromCore from '@metutor/core/state';
import { IClassroom, IInvoiceDetails, IUser } from '@metutor/core/models';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import * as fromRequests from '@metutor/modules/requests/state';
import * as fromRequestsActions from '@metutor/modules/requests/state/actions';

@Component({
  selector: 'metutors-invoice-details',
  templateUrl: './invoice-details.component.html',
  styleUrls: ['./invoice-details.component.scss'],
})
export class InvoiceDetailsComponent implements OnInit {
  user$: Observable<IUser | null>;
  classroom$: Observable<IClassroom | null>;
  showConfirmPaymentModal$: Observable<boolean>;
  isCalculateInvoiceDetails$: Observable<boolean>;
  invoiceDetails$: Observable<IInvoiceDetails | null>;

  constructor(
    private _router: Router,
    private _store: Store<any>,
    private _dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this._store.dispatch(fromCore.enterInvoiceDetails());
    this._store.dispatch(fromCore.calculateFinalInvoice());
    this.user$ = this._store.select(fromCore.selectUser);
    this.classroom$ = this._store.select(fromCore.selectCreatedClass);
    this.invoiceDetails$ = this._store.select(fromCore.selectInvoiceDetails);
    this.isCalculateInvoiceDetails$ = this._store.select(
      fromCore.selectIsCalculateFinalInvoice
    );

    this.showConfirmPaymentModal$ = this._store.select(
      fromRequests.selectIsConfirmPaymentModal
    );
  }

  openRequestsConfirmPaymentModal(user: IUser): void {
    if (user) {
      this._store.dispatch(
        fromRequestsActions.openRequestsConfirmPaymentModal()
      );
    } else {
      this._router.navigate(['/signin'], {
        queryParams: {
          returnUrl: this._router.url,
        },
      });
    }
  }

  closeRequestsConfirmPaymentModal(): void {
    this._store.dispatch(
      fromRequestsActions.closeRequestsConfirmPaymentModal()
    );
  }

  payNow(classroom: IClassroom): void {
    this._store.dispatch(fromCore.createPaidClass({ data: classroom }));
  }
}
