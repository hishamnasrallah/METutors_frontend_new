import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'metutors-admin-student-view-feedback-modal',
  templateUrl: './admin-student-view-feedback-modal.component.html',
  styleUrls: ['./admin-student-view-feedback-modal.component.scss'],
})
export class AdminStudentViewFeedbackModalComponent implements OnInit {
  @Input() feedbacks: any;
  @Input() loading = false;
  @Input() showModal = false;

  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  rate = 4;

  constructor() {}

  ngOnInit(): void {}
}
