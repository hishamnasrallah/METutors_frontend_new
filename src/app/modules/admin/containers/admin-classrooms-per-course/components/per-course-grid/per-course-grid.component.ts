import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CourseStatus } from '@config';

@Component({
  selector: 'metutors-per-course-grid',
  templateUrl: './per-course-grid.component.html',
  styleUrls: ['./per-course-grid.component.scss'],
})
export class PerCourseGridComponent implements OnInit {
  @Input() bookings: any;

  @Output() openBookingModal: EventEmitter<number> = new EventEmitter<number>();

  constructor() {}

  subjectId: number;
  courseStatus = CourseStatus;

  ngOnInit(): void {}
}
