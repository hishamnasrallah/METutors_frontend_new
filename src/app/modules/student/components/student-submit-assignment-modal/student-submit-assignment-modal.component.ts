import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'metutors-student-submit-assignment-modal',
  templateUrl: './student-submit-assignment-modal.component.html',
  styleUrls: ['./student-submit-assignment-modal.component.scss'],
})
export class StudentSubmitAssignmentModalComponent implements OnInit {
  @Input() showModal: boolean = false;

  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}
}
