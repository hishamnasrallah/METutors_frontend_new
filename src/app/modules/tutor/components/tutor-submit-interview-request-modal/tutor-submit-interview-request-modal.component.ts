import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'metutors-tutor-submit-interview-request-modal',
  templateUrl: './tutor-submit-interview-request-modal.component.html',
  styleUrls: ['./tutor-submit-interview-request-modal.component.scss'],
})
export class TutorSubmitInterviewRequestModalComponent implements OnInit {
  @Input() showModal: boolean = false;

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
