import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'metutors-admin-finance-refund-modal',
  templateUrl: './admin-finance-refund-modal.component.html',
  styleUrls: ['./admin-finance-refund-modal.component.scss'],
})
export class AdminFinanceRefundModalComponent implements OnInit {
  @Input() loading = false;
  @Input() showModal = false;
  @Input() reFundDetail: any;

  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();
  @Output() refundPayment: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}
}
