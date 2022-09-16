import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'metutors-admin-finance-refund-detail-modal',
  templateUrl: './admin-finance-refund-detail-modal.component.html',
  styleUrls: ['./admin-finance-refund-detail-modal.component.scss'],
})
export class AdminFinanceRefundDetailModalComponent implements OnInit {
  @Input() loading = false;
  @Input() showModal = false;
  @Input() reFundDetail: any;

  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();
  @Output() refundClicked: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}
}
