import { DatePipe } from '@angular/common';
import { generalConstants } from '@metutor/config';
import { SubmitInterviewInput } from '@metutor/core/models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormValidationUtilsService } from '@metutor/core/validators';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

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
      this.submitted.emit({
        ...form.value,
        interviewTime: new Date(
          Date.parse(
            this._datePipe.transform(
              new Date(form?.value.interviewDate),
              'yyyy-MM-dd'
            ) +
              ' ' +
              form?.value.interviewTime
          )
        )?.toISOString(),
        interviewDate: new Date(
          Date.parse(
            this._datePipe.transform(
              new Date(form?.value.interviewDate),
              'yyyy-MM-dd'
            ) +
              ' ' +
              form?.value.interviewTime
          )
        )?.toISOString(),
      });
    }
  }
}
