import * as moment from 'moment';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import {
  FormGroup,
  Validators,
  FormBuilder,
  AbstractControl,
} from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'metutors-admin-schedule-interview-modal',
  templateUrl: './admin-schedule-interview-modal.component.html',
  styleUrls: ['./admin-schedule-interview-modal.component.scss'],
  providers: [DatePipe],
})
export class AdminScheduleInterviewModalComponent implements OnInit {
  @Input() showModal = false;
  @Input() isSchedulingRequest = false;
  @Input() data: { date: string; time: string };

  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();
  @Output() submitted: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  form: FormGroup;
  minDate = new Date();

  constructor(private _fb: FormBuilder, private _datePipe: DatePipe) {}

  get date(): AbstractControl | null {
    return this.form.get('date');
  }

  get startTime(): AbstractControl | null {
    return this.form.get('startTime');
  }

  get endTime(): AbstractControl | null {
    return this.form.get('endTime');
  }

  onSubmit(): void {
    const body = {
      ...this.form.value,
      start_time: new Date(
        Date.parse(
          this._datePipe.transform(new Date(this.date?.value), 'yyyy-MM-dd') +
            ' ' +
            this.startTime?.value
        )
      )?.toISOString(),
      end_time: new Date(
        Date.parse(
          this._datePipe.transform(new Date(this.date?.value), 'yyyy-MM-dd') +
            ' ' +
            this.endTime?.value
        )
      )?.toISOString(),
      date: new Date(this.date?.value)?.toISOString(),
    };

    this.submitted.emit(body);
  }

  ngOnInit(): void {
    this.form = this._fb.group({
      endTime: [null, [Validators.required]],
      date: [this.data?.date, [Validators.required]],
      startTime: [
        this._datePipe.transform(this.data?.time, 'h:mm a'),
        [Validators.required],
      ],
    });
  }
}
