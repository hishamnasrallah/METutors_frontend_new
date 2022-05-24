import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { environment } from '@environment';
import { courseStatusLabel } from '@config';

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
    } else if (this.type === 'teacher') {
      this.data = {
        ...value,
        name: `${value?.teacher?.firstName} ${value?.teacher?.lastName}`,
      };
    } else {
      this.data = {
        ...value,
        name: `${value?.student?.firstName} ${value?.student?.lastName}`,
      };
    }
  }

  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  data: any;
  heading = 'Booking Details';
  imageUrl = environment.imageURL;
  statusLabel = courseStatusLabel;

  constructor() {}

  ngOnInit(): void {}
}
