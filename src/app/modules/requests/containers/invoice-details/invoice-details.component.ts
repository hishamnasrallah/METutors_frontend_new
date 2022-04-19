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

@Component({
  selector: 'metutors-invoice-details',
  templateUrl: './invoice-details.component.html',
  styleUrls: ['./invoice-details.component.scss'],
})
export class InvoiceDetailsComponent implements OnInit {
  user$: Observable<IUser | null>;
  classroom$: Observable<IClassroom | null>;
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
  }

  payNow(user: IUser, classroom: IClassroom): void {
    if (user) {
      const dialogRef = this._dialog.open(DialogConfirmPayment, {
        width: '800px',
        data: classroom,
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {}
      });

      const dialogSubmitSubscription =
        dialogRef.componentInstance.payNow.subscribe((data) => {
          console.log(data);
          if (data) {
            this._store.dispatch(fromCore.createPaidClass({ data }));
            dialogSubmitSubscription.unsubscribe();
          }
        });
    } else {
      this._router.navigate(['/signin'], {
        queryParams: {
          returnUrl: this._router.url,
        },
      });
    }
  }
}
@Component({
  selector: 'dialog-confirm-payment',
  templateUrl: 'dialog-confirm-payment.component.html',
  styleUrls: ['./invoice-details.component.scss'],
})
export class DialogConfirmPayment implements OnInit {
  @Output() payNow = new EventEmitter();

  classroom: IClassroom;

  constructor(
    public dialogRef: MatDialogRef<DialogConfirmPayment>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data) {
      this.classroom = data;
    }
  }

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
