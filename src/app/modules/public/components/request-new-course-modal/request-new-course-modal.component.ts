import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { GENDERS, GRADES } from '@metutor/config';
import { ICountry, ILanguage, IProgram, ISubject } from '@metutor/core/models';

@Component({
  selector: 'metutors-request-new-course-modal',
  templateUrl: './request-new-course-modal.component.html',
  styleUrls: ['./request-new-course-modal.component.scss'],
})
export class RequestNewCourseModalComponent implements OnInit {
  @Input() programs: IProgram[];
  @Input() subjects: ISubject[];
  @Input() countries: ICountry[];
  @Input() isSubmitting: boolean;
  @Input() languages: ILanguage[];
  @Input() showModal: boolean = false;

  @Output() submitForm: EventEmitter<any> = new EventEmitter<any>();
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  form: FormGroup;
  grades = GRADES;
  genders = GENDERS;

  constructor(private _fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this._fb.group({
      program: [null, Validators.required],
      country: [null, Validators.required],
      grade: [null, Validators.required],
      subject: [null, Validators.required],
      gender: [null, Validators.required],
      language: [null, Validators.required],
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
}
