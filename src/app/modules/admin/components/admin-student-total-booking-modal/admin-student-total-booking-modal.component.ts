import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { environment } from '@environment';

@Component({
  selector: 'metutors-admin-student-total-booking-modal',
  templateUrl: './admin-student-total-booking-modal.component.html',
  styleUrls: ['./admin-student-total-booking-modal.component.scss'],
})
export class AdminStudentTotalBookingModalComponent implements OnInit {
  @Input() detail: any;
  @Input() loading = false;
  @Input() showModal = false;

  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  imageUrl = environment.imageURL;

  constructor() {}

  ngOnInit(): void {}
}
