import { Pipe, PipeTransform } from '@angular/core';

import { WEEK_DAYS, WEEK_FULL_DAYS } from '@config';

@Pipe({
  name: 'metutorsDays',
})
export class DaysPipe implements PipeTransform {
  constructor() {}

  transform(days: any, type: 'short' | 'long' = 'short'): string {
    let list: any = [];
    const _days = days && !Array.isArray(days) ? days.split(',') : days;

    if (_days?.length) {
      const weekDays = type === 'short' ? WEEK_DAYS : WEEK_FULL_DAYS;
      _days.forEach((day: any) => {
        list.push(weekDays[day]);
      });
    }

    return list.join(',');
  }
}
