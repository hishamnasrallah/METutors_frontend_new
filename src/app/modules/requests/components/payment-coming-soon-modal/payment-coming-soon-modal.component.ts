import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'metutors-payment-coming-soon-modal',
  templateUrl: './payment-coming-soon-modal.component.html',
  styleUrls: ['./payment-coming-soon-modal.component.scss'],
})
export class PaymentComingSoonModalComponent implements OnInit {
  @Input() showModal = false;

  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}
}
