import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'metutors-admin-view-feedback-modal',
  templateUrl: './admin-view-feedback-modal.component.html',
  styleUrls: ['./admin-view-feedback-modal.component.scss'],
})
export class AdminViewFeedbackModalComponent implements OnInit {
  @Input() feedbacks: any;
  @Input() loading = false;
  @Input() showModal = false;
  @Input() heading = "Student's Feedback";
  @Input() subHeading = "View Student's Feedback";

  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  rate = 4;

  constructor() {}

  ngOnInit(): void {}
}
