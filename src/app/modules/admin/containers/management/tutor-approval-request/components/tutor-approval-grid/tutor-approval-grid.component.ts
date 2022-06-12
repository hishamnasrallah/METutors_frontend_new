import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { courseStatusLabel } from '@config';

@Component({
  selector: 'metutors-tutor-approval-grid',
  templateUrl: './tutor-approval-grid.component.html',
  styleUrls: ['./tutor-approval-grid.component.scss'],
})
export class TutorApprovalGridComponent implements OnInit {
  @Input() courses: any;

  @Output() openBookingModal: EventEmitter<number> = new EventEmitter<number>();

  courseId: number;
  studentId: number;
  statusLabel = courseStatusLabel;

  constructor() {}

  ngOnInit(): void {}
}
