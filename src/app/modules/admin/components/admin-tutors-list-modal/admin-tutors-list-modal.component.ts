import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { ITutor } from '@models';
import groupBy from 'lodash/groupBy';
import { WEEK_DAYS, WEEK_FULL_DAYS } from '@config';

@Component({
  selector: 'metutors-admin-tutors-list-modal',
  templateUrl: './admin-tutors-list-modal.component.html',
  styleUrls: ['./admin-tutors-list-modal.component.scss'],
})
export class AdminTutorsListModalComponent implements OnInit {
  @Input() showModal: boolean = false;
  @Input() heading = '';
  @Input() subHeading = '';
  @Input() tutors: ITutor[];
  @Input() loading: boolean;

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
  availabilities: any;
  weekDays: any[] = [];
  objectKeys = Object.keys;
  showAvailability = false;
  weekDayName = WEEK_FULL_DAYS;

  constructor() {}

  ngOnInit(): void {}
}
