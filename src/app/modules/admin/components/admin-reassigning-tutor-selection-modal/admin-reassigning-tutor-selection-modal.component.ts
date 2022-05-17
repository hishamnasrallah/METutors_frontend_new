import groupBy from 'lodash/groupBy';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { WEEK_DAYS, WEEK_FULL_DAYS } from '@config';

@Component({
  selector: 'metutors-admin-reassigning-tutor-selection-modal',
  templateUrl: './admin-reassigning-tutor-selection-modal.component.html',
  styleUrls: ['./admin-reassigning-tutor-selection-modal.component.scss'],
})
export class AdminReassigningTutorSelectionModalComponent implements OnInit {
  @Input() tutors: any;
  @Input() loading = false;
  @Input() showModal = false;
  @Input() isLoadingTimeSlots: boolean;

  @Input() set timeSlots(slots: any) {
    if (slots) {
      this.timeSlot = slots;
      this.availabilities = groupBy(slots.availabilites, 'day');

      if (slots?.weekdays?.length) {
        slots.weekdays.forEach((day: any) =>
          this.weekDays.push(WEEK_DAYS[day])
        );
      }
    }
  }

  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();
  @Output() tutorAvailability: EventEmitter<number> =
    new EventEmitter<number>();

  timeSlot: any;
  tutorId: null;
  availabilities: any;
  weekDays: any[] = [];
  showAvailability = false;
  objectKeys = Object.keys;
  weekDayName = WEEK_FULL_DAYS;
  heading = "Re-Assigning Tutor's Selection";
  subHeading = 'Please select a replacement tutor from the list below';

  constructor() {}

  goBack(): void {
    this.tutorId = null;
    this.showAvailability = false;
    this.heading = "Re-Assigning Tutor's Selection";
    this.subHeading = 'Please select a replacement tutor from the list below';
  }

  onChange(event: any): void {
    this.tutorId = event.value;
  }

  onViewAvailability(id: number): void {
    this.subHeading = '';
    this.showAvailability = true;
    this.tutorAvailability.emit(id);
    this.heading = 'Tutor Availability';
  }

  ngOnInit(): void {}
}
