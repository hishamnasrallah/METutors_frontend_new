import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'metutors-student-attendance-modal',
  templateUrl: './student-attendance-modal.component.html',
  styleUrls: ['./student-attendance-modal.component.scss'],
})
export class StudentAttendanceModalComponent implements OnInit {
  @Input() showModal = false;

  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}
}
