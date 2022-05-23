import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { environment } from '@environment';

@Component({
  selector: 'metutors-admin-student-total-booking-modal',
  templateUrl: './admin-student-total-booking-modal.component.html',
  styleUrls: ['./admin-student-total-booking-modal.component.scss'],
})
export class AdminStudentTotalBookingModalComponent implements OnInit {
  @Input() type: string;
  @Input() loading = false;
  @Input() showModal = false;

  @Input() set detail(value: any) {
    if (this.type === 'subject') {
      this.heading = value.subject?.name;
      this.data = {
        totalBookings: value.subject?.totalBookings,
        bookings: [...value.subject?.courses],
      };
    } else {
      this.data = value;
    }
  }

  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  data: any;
  heading = 'Booking Details';
  imageUrl = environment.imageURL;

  constructor() {}

  ngOnInit(): void {}
}
