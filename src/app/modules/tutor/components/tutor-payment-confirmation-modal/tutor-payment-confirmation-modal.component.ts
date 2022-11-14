import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'metutors-tutor-payment-confirmation-modal',
  templateUrl: './tutor-payment-confirmation-modal.component.html',
  styleUrls: ['./tutor-payment-confirmation-modal.component.scss'],
})
export class TutorPaymentConfirmationModalComponent implements OnInit {
  @Input() showModal: boolean = false;
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();
  @Output() openDisputeModal: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}
}
