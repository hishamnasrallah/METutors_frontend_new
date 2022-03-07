import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromCore from '@metutor/core/state';
import { IClassroom, IInvoiceDetails, IUser } from '@metutor/core/models';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

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

  constructor(private _store: Store<any>, private _router: Router) {}

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

  payNow(user: IUser): void {
    if (user) {
    } else {
      this._router.navigate(['/signin'], {
        queryParams: {
          returnUrl: this._router.url,
        },
      });
    }
  }
}
