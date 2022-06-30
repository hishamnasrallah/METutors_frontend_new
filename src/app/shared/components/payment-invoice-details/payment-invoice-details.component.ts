import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { IInvoiceDetails } from '@models';

@Component({
  selector: 'metutors-payment-invoice-details',
  templateUrl: './payment-invoice-details.component.html',
  styleUrls: ['./payment-invoice-details.component.scss'],
})
export class PaymentInvoiceDetailsComponent implements OnInit {
  @Input() invoiceDetails: IInvoiceDetails;

  @Output() applyCoupon: EventEmitter<any> = new EventEmitter<any>();

  dateNow = new Date();

  constructor() {}

  ngOnInit(): void {}
}
