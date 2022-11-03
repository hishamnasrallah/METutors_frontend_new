import { generalConstants } from 'src/app/config';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'metutors-free-classroom-info-form',
  templateUrl: './free-classroom-info-form.component.html',
  styleUrls: ['./free-classroom-info-form.component.scss']
})
export class FreeClassroomInfoFormComponent implements OnInit {
  @Input() form!: FormGroup;
  @Input() selectedCourse!: any;

  @Output() onBack = new EventEmitter();
  @Output() submitForm = new EventEmitter<FormGroup>();

  minDate = new Date();
  startingHoursLimit = generalConstants.startingHoursLimit;
  classroomTimeDuration = generalConstants.classroomTimeDuration;

  constructor() {}

  ngOnInit(): void {
    this.minDate.setHours(this.minDate.getHours() + 24);
  }

  get startTime(): AbstractControl | null {
    return this.form.get('startTime');
  }

  get startDate(): AbstractControl | null {
    return this.form.get('startDate');
  }

  get duration(): AbstractControl | null {
    return this.form.get('duration');
  }

  get tempDuration(): AbstractControl | null {
    return this.form.get('tempDuration');
  }

  get totalClasses(): AbstractControl | null {
    return this.form.get('totalClasses');
  }

  get tempTotalClasses(): AbstractControl | null {
    return this.form.get('tempTotalClasses');
  }

  get hours(): AbstractControl | null {
    return this.form.get('hours');
  }

  get tempHours(): AbstractControl | null {
    return this.form.get('tempHours');
  }

  get type(): AbstractControl | null {
    return this.form.get('type');
  }

  onSubmit(form: FormGroup): void {
    this.submitForm.emit(form);
  }

  returnZero(): number {
    return 0;
  }

  onChangeDateTimePicker(): void {
    if (this.startTime?.value) {
      const duration = '0.50';
      this.duration?.setValue(duration);
      this.tempDuration?.setValue(duration);
      this.hours?.setValue(duration);
      this.tempHours?.setValue(duration);
    } else {
      this.duration?.setValue(0);
      this.tempDuration?.setValue(0);
      this.hours?.setValue(0);
      this.tempHours?.setValue(0);
    }

    if (this.startDate?.value) {
      this.totalClasses?.setValue(1);
      this.tempTotalClasses?.setValue(1);
    } else {
      this.totalClasses?.setValue(0);
      this.tempTotalClasses?.setValue(0);
    }
  }
}
