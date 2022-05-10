import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ISubject } from '@metutor/core/models';

@Component({
  selector: 'metutors-admin-course-booking-list-modal',
  templateUrl: './admin-course-booking-list-modal.component.html',
  styleUrls: ['./admin-course-booking-list-modal.component.scss'],
})
export class AdminCourseBookingListModalComponent implements OnInit {
  @Input() showModal = false;
  @Input() isLoading: boolean;
  @Input() courseBooking: ISubject;

  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  week: string;
  year: string;
  date: string;
  month: string;
  teachers: string;

  constructor() {}

  ngOnInit(): void {}

  onChangeSelection(): void {}
}
