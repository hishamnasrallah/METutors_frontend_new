import moment from 'moment';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'metutorsTimeDiff',
})
export class TimeDifferencePipe implements PipeTransform {
  constructor() {}

  // todo make it dynamic to accept any time date and return different in days, hours and minutes
  transform(start: string, end: string): number {
    if (start && end) {
      const startTimeFormat = moment(start).format('hh:mm');
      const endTimeFormat = moment(end).format('hh:mm');

      const endTime = moment(endTimeFormat, 'HH:mm a');
      const startTime = moment(startTimeFormat, 'HH:mm a');

      const duration = moment.duration(endTime.diff(startTime));

      return duration.asHours();
    }

    return 0;
  }
}
