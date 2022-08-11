import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubmitInterviewInput } from '@metutor/core/models';

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

  constructor(private _formBuilder: FormBuilder, private _datePipe: DatePipe) {}

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      interviewDate: [null, [Validators.required]],
      interviewTime: [null, Validators.required],
      notes: [null, [Validators.minLength(10)]],
    });
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
        interviewDate: new Date(form?.value.interviewDate)?.toISOString(),
      });
    }
  }
}
