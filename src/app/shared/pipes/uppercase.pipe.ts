import moment from 'moment';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'metutorsUppercase',
})
export class UppercasePipe implements PipeTransform {
  constructor() {}

  // todo make it dynamic to accept any time date and return different in days, hours and minutes
  transform(text: string): string {
    if (text) {
      return text.toUpperCase().trim().replace(' ', '_');
    }

    return '';
  }
}
