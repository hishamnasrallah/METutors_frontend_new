import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'metutors-change-course-schedule-modal',
  templateUrl: './change-course-schedule-modal.component.html',
  styleUrls: ['./change-course-schedule-modal.component.scss'],
})
export class ChangeCourseScheduleModalComponent implements OnInit {
  @Input() showModal = false;

  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();
  @Output() changeSchedule: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}
}
