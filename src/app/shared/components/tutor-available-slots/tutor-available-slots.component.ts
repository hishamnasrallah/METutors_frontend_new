import groupBy from 'lodash/groupBy';
import { WEEK_DAYS, WEEK_FULL_DAYS } from '@config';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'metutors-tutor-available-slots',
  templateUrl: './tutor-available-slots.component.html',
  styleUrls: ['./tutor-available-slots.component.scss'],
})
export class TutorAvailableSlotsComponent implements OnInit {
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

  timeSlot: any;
  availabilities: any;
  weekDays: any[] = [];
  objectKeys = Object.keys;
  weekDayName = WEEK_FULL_DAYS;

  constructor() {}

  ngOnInit(): void {}
}
