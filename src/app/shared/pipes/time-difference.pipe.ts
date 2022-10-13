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
      const duration = moment.duration(moment(end).diff(moment(start)));

      return duration.asHours();
    }

    return 0;
  }
}
