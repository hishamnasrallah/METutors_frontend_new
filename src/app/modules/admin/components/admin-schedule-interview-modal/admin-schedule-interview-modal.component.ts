import * as moment from 'moment';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import {
  FormGroup,
  Validators,
  FormBuilder,
  AbstractControl,
} from '@angular/forms';

@Component({
  selector: 'metutors-admin-schedule-interview-modal',
  templateUrl: './admin-schedule-interview-modal.component.html',
  styleUrls: ['./admin-schedule-interview-modal.component.scss'],
})
export class AdminScheduleInterviewModalComponent implements OnInit {
  @Input() showModal = false;
  @Input() isSchedulingRequest = false;
  @Input() data: { date: string; time: string };

  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();
  @Output() submitted: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  form: FormGroup;
  minDate = new Date();

  constructor(private _fb: FormBuilder) {}

  get date(): AbstractControl | null {
    return this.form.get('date');
  }

  onSubmit(): void {
    const body = {
      ...this.form.value,
      date: moment(this.date?.value).format('Y-MM-DD'),
    };

    this.submitted.emit(body);
  }

  ngOnInit(): void {
    this.form = this._fb.group({
      end_time: [null, [Validators.required]],
      date: [this.data?.date, [Validators.required]],
      start_time: [this.data?.time, [Validators.required]],
    });
  }
}
