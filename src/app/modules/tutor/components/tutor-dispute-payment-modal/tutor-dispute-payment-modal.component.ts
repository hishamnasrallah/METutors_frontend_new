import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'metutors-tutor-dispute-payment-modal',
  templateUrl: './tutor-dispute-payment-modal.component.html',
  styleUrls: ['./tutor-dispute-payment-modal.component.scss'],
})
export class TutorDisputePaymentModalComponent implements OnInit {
  @Input() showModal: boolean = false;
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}
}
