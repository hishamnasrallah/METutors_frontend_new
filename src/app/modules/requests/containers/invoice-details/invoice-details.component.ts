import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { environment } from '@environment';
import * as fromCore from '@metutor/core/state';
import * as fromRequests from '@metutor/modules/requests/state';
import { IClassroom, IInvoiceDetails, IUser } from '@metutor/core/models';

@Component({
  selector: 'metutors-invoice-details',
  templateUrl: './invoice-details.component.html',
  styleUrls: ['./invoice-details.component.scss'],
})
export class InvoiceDetailsComponent implements OnInit {
  paymentInfo$: Observable<any>;
  user$: Observable<IUser | null>;
  baseURL = environment.clientUrl;
  isCreatingCourse$: Observable<boolean>;
  classroom$: Observable<IClassroom | null>;
  showConfirmPaymentModal$: Observable<boolean>;
  isCalculateInvoiceDetails$: Observable<boolean>;
  invoiceDetails$: Observable<IInvoiceDetails | null>;

  showModal = false;
  constructor(private _router: Router, private _store: Store<any>) {}

  ngOnInit(): void {
    this._store.dispatch(fromCore.enterInvoiceDetails());
    this._store.dispatch(fromCore.calculateFinalInvoice({}));
    this.user$ = this._store.select(fromCore.selectUser);
    this.classroom$ = this._store.select(fromCore.selectCreatedClass);
    this.invoiceDetails$ = this._store.select(fromCore.selectInvoiceDetails);
    this.isCalculateInvoiceDetails$ = this._store.select(
      fromCore.selectIsCalculateFinalInvoice
    );

    this.paymentInfo$ = this._store.select(fromCore.selectRequestPaymentInfo);

    this.isCreatingCourse$ = this._store.select(
      fromCore.selectRequestedIsCreatingCourse
    );

    this.showConfirmPaymentModal$ = this._store.select(
      fromRequests.selectIsConfirmPaymentModal
    );
  }

  saveCourse(user: IUser, classroom: IClassroom): void {
    console.log('its here');
    this.showModal = true;
    return;

    if (user) {
      const data = {
        redirect_url: this.baseURL + '/requests/payment-processing',
        ...classroom,
        classrooms: classroom.classrooms.map((classroom: any) => ({
          ...classroom,
          day: +classroom.day + 1,
        })),
      };

      this._store.dispatch(fromCore.createCourse({ data }));
    } else {
      this._router.navigate(['/signin'], {
        queryParams: {
          returnUrl: this._router.url,
        },
      });
    }
  }
}
