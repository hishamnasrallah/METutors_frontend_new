import { Pipe, PipeTransform } from '@angular/core';

import moment from 'moment';

@Pipe({
  name: 'metutorsTimeDiff',
})
export class TimeDifferencePipe implements PipeTransform {
  constructor() {}

  // todo make it dynamic to accept any time date and return different in days, hours and minutes
  transform(start: string, end: string): number {
    if (start && end) {
      const startTime = moment(start, 'HH:mm:ss a');
      const endTime = moment(end, 'HH:mm:ss a');

      const duration = moment.duration(endTime.diff(startTime));
      return duration.asHours();
    }

    return 0;
  }
}
