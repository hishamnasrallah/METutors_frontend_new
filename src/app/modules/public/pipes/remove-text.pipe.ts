import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'metutorsRemoveText'
})
export class RemoveTextPipe implements PipeTransform {
  constructor() {}

  transform(text: string, replacedText: string): string {
    if (text) return text.replace(replacedText, '');

    return '';
  }
}
