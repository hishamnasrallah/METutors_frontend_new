import * as moment from 'moment';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import {
  FormGroup,
  Validators,
  FormBuilder,
  AbstractControl,
} from '@angular/forms';

import { calculateDurationTime, CLASSROOM_TYPES_CONST } from '@config';

@Component({
  selector: 'metutors-tutor-reschedule-class-modal',
  templateUrl: './tutor-reschedule-class-modal.component.html',
  styleUrls: ['./tutor-reschedule-class-modal.component.scss'],
})
export class TutorRescheduleClassModalComponent implements OnInit {
  @Input() classId: number;
  @Input() submitting: boolean;
  @Input() showModal: boolean = false;

  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();
  @Output() submitted: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  form: FormGroup;
  minDate = new Date();
  types = CLASSROOM_TYPES_CONST;

  constructor(private _fb: FormBuilder) {}

  get classDay(): AbstractControl | null {
    return this.form.get('day');
  }

  get startTime(): AbstractControl | null {
    return this.form.get('start_time');
  }

  get endTime(): AbstractControl | null {
    return this.form.get('end_time');
  }

  get startDate(): AbstractControl | null {
    return this.form.get('start_date');
  }

  get duration(): AbstractControl | null {
    return this.form.get('duration');
  }

  returnZero(): number {
    return 0;
  }

  onDateChange(): void {
    const classDay = moment(this.startDate?.value).format('dddd');
    this.classDay?.setValue(classDay);
  }

  onChangeTimePicker(): void {
    if (this.startTime?.value && this.endTime?.value) {
      const duration = calculateDurationTime(
        this.startTime?.value,
        this.endTime?.value
      );

      this.duration?.setValue(duration);
    }
  }

  ngOnInit(): void {
    this.form = this._fb.group({
      day: [null],
      duration: [null],
      academic_class_id: [this.classId],
      end_time: [null, Validators.required],
      start_time: [null, Validators.required],
      start_date: [null, Validators.required],
      class_type: [null, Validators.required],
    });
  }
}
