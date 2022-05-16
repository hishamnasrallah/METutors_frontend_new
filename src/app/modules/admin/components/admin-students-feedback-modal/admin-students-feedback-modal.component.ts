import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'metutors-admin-students-feedback-modal',
  templateUrl: './admin-students-feedback-modal.component.html',
  styleUrls: ['./admin-students-feedback-modal.component.scss'],
})
export class AdminStudentsFeedbackModalComponent implements OnInit {
  @Input() feedback: [];
  @Input() loading = false;
  @Input() showModal = false;

  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  rate = 3;

  constructor() {}

  ngOnInit(): void {}
}
