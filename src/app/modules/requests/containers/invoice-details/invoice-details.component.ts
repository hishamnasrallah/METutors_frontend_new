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
  isCreatingCourse$: Observable<boolean>;
  isGetInvoiceEmail$: Observable<boolean>;
  classroom$: Observable<IClassroom | null>;
  showConfirmPaymentModal$: Observable<boolean>;
  isCalculateInvoiceDetails$: Observable<boolean>;
  invoiceDetails$: Observable<IInvoiceDetails | null>;

  showModal = false;
  baseURL = environment.clientUrl;

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

    this.isGetInvoiceEmail$ = this._store.select(
      fromCore.selectIsGetInvoiceEmail
    );

    this.showConfirmPaymentModal$ = this._store.select(
      fromRequests.selectIsConfirmPaymentModal
    );
  }

  saveCourse(user: IUser, classroom: IClassroom): void {
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

  getInvoiceEmail(user: IUser, invoiceDetails: IInvoiceDetails): void {
    if (user) {
      this._store.dispatch(
        fromCore.getInvoiceEmail({
          info: {
            email: user.email,
            noOfClasses: invoiceDetails.noOfClasses,
            pricePerHour: invoiceDetails.pricePerHour,
            totalHours: invoiceDetails.totalHours,
            totalAmount: invoiceDetails.totalAmount,
            invoiceNumber: '#IN37738',
            date: new Date(),
          },
        })
      );
    } else {
      this._router.navigate(['/signin'], {
        queryParams: {
          returnUrl: this._router.url,
        },
      });
    }
  }

  printToCart(printSectionId: string): void {
    const innerContents: string =
      document.getElementById(printSectionId)?.innerHTML || '';

    const popupWinindow = window.open(
      '',
      '_blank',
      'toolbar=yes, scrollbars=yes, resizable=yes, top=500, left=500, width=4000, height=4000'
    );

    popupWinindow?.document.open();
    popupWinindow?.document.write(
      `
      <html>
        <head>
          <title>Invoice Details</title>
          <link href="https://fonts.googleapis.com/css2?family=Proxima+Nova" rel="stylesheet">
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
          <style>
          *{font-family: "Proxima Nova", sans-serif;} body{padding:20px}
          .invoice-header {margin-bottom: 35px;} .invoice-header span { margin-right: 5px; } .invoice-header .invoice-email, .invoice-header .print, ul li.coupon, .pay-now { display:none !important } ul li { margin-bottom: 15px; } ul li span { color: #696969; font-size: 16px; } ul li strong { color: #000; font-size: 16px; } ul li.promocode span, ul li.promocode strong { color: #ff554b; } ul li.total-payment { padding: 15px 0; border-top: 1px solid #e2e2e2; } ul li.coupon span, ul li.total-payment span, ul li.coupon strong, ul li.total-payment strong { font-size: 18px; } .have-coupon input { border-radius: 4px 0 0 4px; } .have-coupon button { border-radius: 0 4px 4px 0; background-color: #2a2a2a; color: #fff; }
          .class-details h2 { color: #2a2a2a; font-size: 20px; height: 50px; } .class-details .card { border-radius: 12px; border: solid 1px #e2e2e2; background-color: #fff; box-shadow: none; margin-bottom: 20px; } .class-details .card h3 { color: #696969; font-size: 16px; } .class-details .card h4 { white-space: nowrap; width: 100%; overflow: hidden; text-overflow: ellipsis; color: #2a2a2a; font-size: 16px; font-weight: bold; } .class-details .card h5 { color: #2a2a2a; font-size: 13px; margin: 10px 0 0; } .class-details .card .count { color: #ff8300; font-weight: bold; margin-right: 5px; } .class-details .card .review { color: #7d7d7d; font-size: 14px; } .class-details .card ul li { margin: 5px 0; } .class-details .card ul li span { margin-left: 15px; color: #2a2a2a; font-size: 15px; } .class-details .card .informations span { color: #696969 !important; } .class-details .card .informations strong { color: #2a2a2a; font-size: 14px; } .class-details .card .b-border { padding-bottom: 1rem; border-bottom: 1px solid #e2e2e2; } .class-details .card .info img { width: 40px; height: 40px; border-radius: 50%; } .class-details .card .info h2 { color: #2a2a2a; font-size: 14px; height: auto; font-weight: bold; } .class-details .card .info h3 { color: #696969; font-size: 12px; margin: 0; } .class-details .card .info h6 { color: #696969; font-size: 16px; margin-bottom: 15px; }
          </style>
        </head>
        <body onload="window.print()">
          ${innerContents}
        </body>
      </html>`
    );
    popupWinindow?.document.close();
  }
}
