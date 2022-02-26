import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { LONG_DAYS_WEEK } from 'src/app/config';
import { FormValidationUtilsService } from 'src/app/core/validators';

@Component({
  selector: 'metutors-complete-tutor-profile-teaching-specifications',
  templateUrl:
    './complete-tutor-profile-teaching-specifications.component.html',
  styleUrls: [
    './complete-tutor-profile-teaching-specifications.component.scss',
  ],
  providers: [DatePipe],
})
export class CompleteTutorProfileTeachingSpecificationsComponent
  implements OnInit
{
  @Input() loading?: boolean;

  @Output() submitForm = new EventEmitter();

  form: FormGroup;
  minDate = new Date();
  days = LONG_DAYS_WEEK;

  constructor(
    private _fb: FormBuilder,
    private _datePipe: DatePipe,
    private _fv: FormValidationUtilsService
  ) {
    this.form = this._fb.group({
      levelOfEducation: [null, [Validators.required]],
      salaryPerHour: [
        null,
        [
          Validators.required,
          Validators.min(5),
          Validators.max(999),
          this._fv.numbersOnlyValidation,
        ],
      ],
      fieldOfStudy: [null, [Validators.required]],
      startDate: [null, [Validators.required]],
      subject: [null, [Validators.required]],
      endDate: [null, [Validators.required]],
      typeOfTutoring: [null, [Validators.required]],
      teachingDays: [null, [Validators.required]],
      teachingHours: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {}

  get levelOfEducation(): AbstractControl | null {
    return this.form.get('levelOfEducation');
  }

  get salaryPerHour(): AbstractControl | null {
    return this.form.get('salaryPerHour');
  }

  get fieldOfStudy(): AbstractControl | null {
    return this.form.get('fieldOfStudy');
  }

  get startDate(): AbstractControl | null {
    return this.form.get('startDate');
  }

  get subject(): AbstractControl | null {
    return this.form.get('subject');
  }

  get endDate(): AbstractControl | null {
    return this.form.get('endDate');
  }

  get typeOfTutoring(): AbstractControl | null {
    return this.form.get('typeOfTutoring');
  }

  get teachingDays(): AbstractControl | null {
    return this.form.get('teachingDays');
  }

  get teachingHours(): AbstractControl | null {
    return this.form.get('teachingHours');
  }

  submitFormData() {
    const data = {
      step: '4',
      level_of_education: this.levelOfEducation?.value,
      expected_salary_per_hour: this.salaryPerHour?.value,
      field_of_study: this.fieldOfStudy?.value,
      availability_start_date: this._datePipe.transform(
        this.startDate?.value,
        'dd/MM/yyyy'
      ),
      subject: this.subject?.value,
      availability_end_date: this._datePipe.transform(
        this.endDate?.value,
        'dd/MM/yyyy'
      ),
      type_of_tutoring: this.typeOfTutoring?.value,
      teaching_days: this.teachingDays?.value,
      teaching_hours: this.teachingHours?.value,
    };

    this.submitForm.emit(data);
  }
}
