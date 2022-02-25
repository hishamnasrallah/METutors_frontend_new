import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'metutors-complete-tutor-profile-teaching-specifications',
  templateUrl:
    './complete-tutor-profile-teaching-specifications.component.html',
  styleUrls: [
    './complete-tutor-profile-teaching-specifications.component.scss',
  ],
})
export class CompleteTutorProfileTeachingSpecificationsComponent
  implements OnInit
{
  @Input() loading?: boolean;

  @Output() submitForm = new EventEmitter();

  form: FormGroup;
  startDate!: string | null;
  endDate!: string | null;

  constructor(private _fb: FormBuilder) {
    this.form = this._fb.group({
      level_of_education: [null, [Validators.required]],
      expected_salary_per_hour: [
        null,
        [Validators.required, this.numbersOnlyValidation],
      ],
      field_of_study: [null, [Validators.required]],
      availability_start_date: [null, [Validators.required]],
      subject: [null, [Validators.required]],
      availability_end_date: [null, [Validators.required]],
      type_of_tutoring: [null, [Validators.required]],
      teaching_days: [null, [Validators.required]],
      teaching_hours: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {}

  numbersOnlyValidation(control: FormControl): any {
    let value = (control.value || '').trim();
    let isNotANumber = isNaN(value);

    return isNotANumber ? { NotANumber: true } : null;
  }

  get level_of_education(): AbstractControl | null {
    return this.form.get('level_of_education');
  }

  get expected_salary_per_hour(): AbstractControl | null {
    return this.form.get('expected_salary_per_hour');
  }

  get field_of_study(): AbstractControl | null {
    return this.form.get('field_of_study');
  }

  get availability_start_date(): AbstractControl | null {
    return this.form.get('availability_start_date');
  }

  get subject(): AbstractControl | null {
    return this.form.get('subject');
  }

  get availability_end_date(): AbstractControl | null {
    return this.form.get('availability_end_date');
  }

  get type_of_tutoring(): AbstractControl | null {
    return this.form.get('type_of_tutoring');
  }

  get teaching_days(): AbstractControl | null {
    return this.form.get('teaching_days');
  }

  get teaching_hours(): AbstractControl | null {
    return this.form.get('teaching_hours');
  }

  submitFormData() {
    // this.loading4 = true;
    let data = {
      step: '4',
      level_of_education: this.level_of_education?.value,
      expected_salary_per_hour: this.expected_salary_per_hour?.value,
      field_of_study: this.field_of_study?.value,
      availability_start_date: this.startDate,
      subject: this.subject?.value,
      availability_end_date: this.endDate,
      type_of_tutoring: this.type_of_tutoring?.value,
      teaching_days: this.teaching_days?.value,
      teaching_hours: this.teaching_days?.value,
    };

    // this._tutorsService.sendTeacherAccount(data).subscribe((response) => {
    //   if (response.status === true) {
    //     this._alertNotificationService.success(response.message);
    //     // this.completeAccount.emit('true');
    //     // this._router.navigate(['/profile/tutor-profile', response?.]);
    //   } else {
    //     this._alertNotificationService.error(response.errors[0]);
    //   }

    //   this.loading4 = false;
    //   this.form.reset();
    // });
  }
}
