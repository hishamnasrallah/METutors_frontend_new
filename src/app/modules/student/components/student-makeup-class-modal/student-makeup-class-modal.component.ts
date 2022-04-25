import {
  FormGroup,
  Validators,
  FormBuilder,
  AbstractControl,
} from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'metutors-student-makeup-class-modal',
  templateUrl: './student-makeup-class-modal.component.html',
  styleUrls: ['./student-makeup-class-modal.component.scss'],
})
export class StudentMakeupClassModalComponent implements OnInit {
  @Input() timeSlots: any;
  @Input() isSubmitting: boolean;
  @Input() showModal: boolean = false;
  @Input() isLoadingTimeSlots: boolean;

  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();
  @Output() changeDate: EventEmitter<Date> = new EventEmitter<Date>();
  @Output() submitted: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  constructor(private _fb: FormBuilder) {}

  form: FormGroup;
  slotId: number | null;
  minDate = new Date();

  get startDate(): AbstractControl | null {
    return this.form.get('start_date');
  }

  get startTime(): AbstractControl | null {
    return this.form.get('start_time');
  }

  get endTime(): AbstractControl | null {
    return this.form.get('end_time');
  }

  onDateChange(): void {
    this.changeDate.emit(this.startDate?.value);
  }

  onTimeSlotSelect(slot: any, index: number): void {
    this.slotId = index;
    this.endTime?.setValue(slot.timeTo);
    this.startTime?.setValue(slot.timeFrom);
  }

  ngOnInit(): void {
    this.form = this._fb.group({
      end_time: [null, Validators.required],
      start_time: [null, Validators.required],
      start_date: [null, Validators.required],
    });
  }
}
