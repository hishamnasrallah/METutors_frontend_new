import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'metutors-admin-student-total-booking-modal',
  templateUrl: './admin-student-total-booking-modal.component.html',
  styleUrls: ['./admin-student-total-booking-modal.component.scss'],
})
export class AdminStudentTotalBookingModalComponent implements OnInit {
  @Input() bookings: any;
  @Input() loading = false;
  @Input() showModal = false;

  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  rate = 4;

  constructor() {}

  ngOnInit(): void {}
}
