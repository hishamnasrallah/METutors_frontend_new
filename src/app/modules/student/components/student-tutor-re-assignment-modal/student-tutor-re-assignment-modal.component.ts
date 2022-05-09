import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'metutors-student-tutor-re-assignment-modal',
  templateUrl: './student-tutor-re-assignment-modal.component.html',
  styleUrls: ['./student-tutor-re-assignment-modal.component.scss'],
})
export class StudentTutorReAssignmentModalComponent implements OnInit {
  @Input() showModal: boolean = false;

  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}
}
