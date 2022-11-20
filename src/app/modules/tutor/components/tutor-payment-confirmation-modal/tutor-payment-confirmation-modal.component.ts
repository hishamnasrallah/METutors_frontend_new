import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'metutors-tutor-payment-confirmation-modal',
  templateUrl: './tutor-payment-confirmation-modal.component.html',
  styleUrls: ['./tutor-payment-confirmation-modal.component.scss'],
})
export class TutorPaymentConfirmationModalComponent implements OnInit {
  @Input() payments: any;
  @Input() loading: boolean = false;
  @Input() showModal: boolean = false;

  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  @Output() openDisputeModal: EventEmitter<any> = new EventEmitter<any>();

  disputedClasses: number[] = [];

  constructor() {}

  onSelectDispute(id: number): void {
    if (this.disputedClasses.includes(id)) {
      this.disputedClasses = this.disputedClasses.filter(
        (clsId) => clsId !== id
      );
    } else {
      this.disputedClasses.push(id);
    }
  }

  ngOnInit(): void {}
}
