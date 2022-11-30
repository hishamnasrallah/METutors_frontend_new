import { IClassroom, IInvoiceDetails } from '@models';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'metutors-payment-invoice-details',
  templateUrl: './payment-invoice-details.component.html',
  styleUrls: ['./payment-invoice-details.component.scss'],
})
export class PaymentInvoiceDetailsComponent implements OnInit {
  @Input() classroom: IClassroom;
  @Input() isGetInvoiceEmail: boolean;
  @Input() isApplyingCoupon: boolean;
  @Input() invoiceDetails: IInvoiceDetails;

  @Output() print: EventEmitter<void> = new EventEmitter<void>();
  @Output() applyCoupon: EventEmitter<string> = new EventEmitter<string>();
  @Output() getInvoiceEmail: EventEmitter<void> = new EventEmitter<void>();

  coupon: string = '';
  dateNow = new Date();

  constructor() {}

  ngOnInit(): void {}
}
