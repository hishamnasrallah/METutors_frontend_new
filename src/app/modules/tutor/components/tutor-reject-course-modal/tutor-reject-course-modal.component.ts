import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'metutors-tutor-reject-course-modal',
  templateUrl: './tutor-reject-course-modal.component.html',
  styleUrls: ['./tutor-reject-course-modal.component.scss'],
})
export class TutorRejectCourseModalComponent implements OnInit {
  @Input() showModal: boolean = false;
  @Input() submitting: boolean = false;

  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();
  @Output() submitted: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  form: FormGroup;

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      rejectReason: [null, [Validators.required, Validators.minLength(10)]],
    });
  }
}
