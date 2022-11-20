import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'metutors-tutor-payment-success-modal',
  templateUrl: './tutor-payment-success-modal.component.html',
  styleUrls: ['./tutor-payment-success-modal.component.scss'],
})
export class TutorPaymentSuccessModalComponent implements OnInit {
  @Input() isDispute: boolean = false;
  @Input() showModal: boolean = false;

  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}
}
