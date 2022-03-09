import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'metutors-student-feedback-modal',
  templateUrl: './student-feedback-modal.component.html',
  styleUrls: ['./student-feedback-modal.component.scss'],
})
export class StudentFeedbackModalComponent implements OnInit {
  @Input() showModal = false;

  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  isSendFeedback = false; // loading
  tutorFeedbackForm!: FormGroup;
  courseFeedbackForm!: FormGroup;

  constructor(private _formBuilder: FormBuilder) {}

  onSubmitTutorFeedback(form: FormGroup) {
    console.log(form.value);
  }

  onSubmitCourseFeedback(form: FormGroup) {
    console.log(form.value);
  }

  ngOnInit(): void {
    this.tutorFeedbackForm = this._formBuilder.group({
      expertSubject: [null, Validators.required],
      presentTopics: [null, Validators.required],
      skillfulStudents: [null, Validators.required],
      alwaysTime: [null, Validators.required],
      feedback: [null, Validators.required],
    });

    this.courseFeedbackForm = this._formBuilder.group({
      rate: [null, Validators.required],
      feedback: [null, Validators.required],
    });
  }
}
