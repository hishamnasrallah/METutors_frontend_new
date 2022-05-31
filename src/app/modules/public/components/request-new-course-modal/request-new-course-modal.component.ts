import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder,
  AbstractControl,
} from '@angular/forms';
import { GENDERS, generalConstants, GRADES } from '@metutor/config';
import { ICountry, ILanguage, IProgram } from '@metutor/core/models';

@Component({
  selector: 'metutors-request-new-course-modal',
  templateUrl: './request-new-course-modal.component.html',
  styleUrls: ['./request-new-course-modal.component.scss'],
})
export class RequestNewCourseModalComponent implements OnInit {
  @Input() programs: IProgram[];
  @Input() countries: ICountry[];
  @Input() isSubmitting: boolean;
  @Input() languages: ILanguage[];
  @Input() showModal: boolean = false;

  @Output() submitForm: EventEmitter<any> = new EventEmitter<any>();
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  form: FormGroup;
  grades = GRADES;
  genders = GENDERS;
  nationalId = generalConstants.nationalId;

  constructor(private _fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this._fb.group({
      program: [null, Validators.required],
      country: [null],
      grade: [null, Validators.required],
      subject: [null, Validators.required],
      gender: [null, Validators.required],
      language: [null, Validators.required],
      description: [null, Validators.required],
      name: [null, Validators.required],
      email: [
        null,
        [
          Validators.required,
          Validators.email,
          Validators.pattern(
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          ),
        ],
      ],
    });
  }

  get email(): AbstractControl | null {
    return this.form.get('email');
  }

  get program(): AbstractControl | null {
    return this.form.get('program');
  }

  get country(): AbstractControl | null {
    return this.form.get('country');
  }

  get name(): AbstractControl | null {
    return this.form.get('name');
  }

  onChangeProgram(): void {
    const programId = this.program?.value;

    if (programId.toString() === generalConstants.nationalId.toString()) {
      this.country?.setValidators([Validators.required]);
    } else {
      this.country?.setValidators([]);
      this.country?.setValue(null);
    }

    this.country?.updateValueAndValidity();
  }

  onSubmit(form: FormGroup): void {
    if (form.valid) {
      this.submitForm.emit(form.value);
    }
  }
}
