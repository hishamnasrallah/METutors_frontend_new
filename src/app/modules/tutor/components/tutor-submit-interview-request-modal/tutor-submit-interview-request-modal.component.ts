import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormValidationUtilsService } from '@metutor/core/validators';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { SubmitInterviewInput } from '@metutor/core/models';
import { dateToISOString, generalConstants } from '@metutor/config';

@Component({
  selector: 'metutors-tutor-submit-interview-request-modal',
  templateUrl: './tutor-submit-interview-request-modal.component.html',
  styleUrls: ['./tutor-submit-interview-request-modal.component.scss'],
  providers: [DatePipe],
})
export class TutorSubmitInterviewRequestModalComponent implements OnInit {
  @Input() submitting: boolean;
  @Input() showModal: boolean = false;

  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();
  @Output() submitted: EventEmitter<SubmitInterviewInput> =
    new EventEmitter<SubmitInterviewInput>();

  form: FormGroup;
  minDate = new Date();
  startingHoursLimit = generalConstants.startingHoursLimit;

  constructor(
    private _datePipe: DatePipe,
    private _formBuilder: FormBuilder,
    private _fv: FormValidationUtilsService
  ) {}

  ngOnInit(): void {
    this.minDate.setHours(this.minDate.getHours() + 24);

    this.form = this._formBuilder.group(
      {
        interviewDate: [null, [Validators.required]],
        interviewTime: [null, Validators.required],
        notes: [null, [Validators.minLength(10)]],
      },
      {
        validators: [
          this._fv.timeAfter24Validator('interviewDate', 'interviewTime'),
        ],
      }
    );
  }

  onSubmit(form: FormGroup): void {
    if (form.valid) {
      const body = {
        ...form.value,
        interviewTime: dateToISOString(
          form?.value.interviewDate,
          form?.value.interviewTime
        ),
        interviewDate: dateToISOString(
          form?.value.interviewDate,
          form?.value.interviewTime
        ),
      };

      this.submitted.emit(body);
    }
  }
}
