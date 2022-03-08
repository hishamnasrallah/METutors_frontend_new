import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'metutors-tutor-attendance-modal',
  templateUrl: './tutor-attendance-modal.component.html',
  styleUrls: ['./tutor-attendance-modal.component.scss'],
})
export class TutorAttendanceModalComponent implements OnInit {
  @Input() showModal = false;

  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}
}
