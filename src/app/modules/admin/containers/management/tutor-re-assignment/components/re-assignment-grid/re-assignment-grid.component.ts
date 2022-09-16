import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { courseStatusLabel } from '@config';

@Component({
  selector: 'metutors-re-assignment-grid',
  templateUrl: './re-assignment-grid.component.html',
  styleUrls: ['./re-assignment-grid.component.scss'],
})
export class ReAssignmentGridComponent implements OnInit {
  @Input() isNew: boolean;
  @Input() isRunning: boolean;
  @Input() reassignments: any;
  @Input() isNotAvailable: boolean;

  @Output() openBookingModal: EventEmitter<number> = new EventEmitter<number>();

  @Output() openReassignTutorModal: EventEmitter<number> =
    new EventEmitter<number>();

  @Output() changeTutorStatus: EventEmitter<{ id: number; status: string }> =
    new EventEmitter<{ id: number; status: string }>();

  constructor() {}

  courseId: number;
  studentId: number;
  statusLabel = courseStatusLabel;

  ngOnInit(): void {}
}
