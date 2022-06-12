import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'metutors-admin-finance-refund-payment-modal',
  templateUrl: './admin-finance-refund-payment-modal.component.html',
  styleUrls: ['./admin-finance-refund-payment-modal.component.scss'],
})
export class AdminFinanceRefundPaymentModalComponent implements OnInit {
  @Input() loading = false;
  @Input() showModal = false;
  @Input() reFundDetail: any;

  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();
  @Output() refundPayment: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}
}
