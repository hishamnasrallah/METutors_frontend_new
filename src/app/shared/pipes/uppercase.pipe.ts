import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'metutorsUppercase',
})
export class UppercasePipe implements PipeTransform {
  constructor() {}

  transform(text: string): string {
    if (text) {
      return text.toUpperCase().trim().replace(' ', '_').replace('’', '');
    }

    return '';
  }
}
