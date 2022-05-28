import { Pipe, PipeTransform } from '@angular/core';
import { courseStatusLabel } from '@metutor/config';

@Pipe({ name: 'ReassignmentStatus' })
export class ReassignmentStatusPipe implements PipeTransform {
  transform(value?: string, ...args: any[]): any {
    if (!value) return value;

    if (value === courseStatusLabel.cancelled_by_teacher) {
      return `<span class="custom-tooltip">On Hold
          <span class="custom-tooltip-text">${courseStatusLabel.cancelled_by_teacher}</span>
       </span>`;
    }

    if (value === courseStatusLabel.requested_to_metutors) {
      return `<span class="custom-tooltip">MEtutors
          <span class="custom-tooltip-text">${courseStatusLabel.requested_to_metutors}</span>
       </span>`;
    }

    return value;
  }
}
