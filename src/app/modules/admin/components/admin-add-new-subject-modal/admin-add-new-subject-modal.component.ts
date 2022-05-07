import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { generalConstants, GRADES } from '@metutor/config';
import { ICountry, ISubject, IProgram, IField } from '@metutor/core/models';

@Component({
  selector: 'metutors-admin-add-new-subject-modal',
  templateUrl: './admin-add-new-subject-modal.component.html',
  styleUrls: ['./admin-add-new-subject-modal.component.scss'],
})
export class AdminAddNewSubjectModalComponent implements OnInit {
  @Input() fields: IField[];
  @Input() isAdding: boolean;
  @Input() programs: IProgram[];
  @Input() countries: ICountry[];
  @Input() showModal: boolean = false;

  @Input() set selectedSubject(_subject: ISubject) {
    if (_subject) {
      this.subject = _subject;
      this.form?.patchValue({
        name: _subject.name,
        program: _subject?.programId,
        country: _subject?.countryId,
        description: _subject.description,
        grade: _subject?.grade,
        field: _subject?.fieldId,
        price: _subject?.pricePerHour,
      });
    }
  }

  @Output() submitForm: EventEmitter<any> = new EventEmitter<any>();
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  form: FormGroup;
  grades = GRADES;
  subject: ISubject;
  nationalId = generalConstants.nationalId;

  constructor(private _fb: FormBuilder) {
    this.form = this._fb.group({
      name: [null, Validators.required],
      description: [null, Validators.required],
      program: [null, Validators.required],
      country: [null],
      grade: [null],
      field: [null, Validators.required],
      price: [null, Validators.required],
    });
  }

  ngOnInit(): void {}

  get program(): AbstractControl | null {
    return this.form.get('program');
  }

  get country(): AbstractControl | null {
    return this.form.get('country');
  }

  get grade(): AbstractControl | null {
    return this.form.get('grade');
  }

  onChangeProgram(): void {
    if (this.program?.value.toString() === this.nationalId.toString()) {
      this.country?.setValidators([Validators.required]);
      this.country?.updateValueAndValidity();
      this.grade?.setValidators([Validators.required]);
      this.grade?.updateValueAndValidity();
    } else {
      this.country?.clearValidators();
      this.country?.updateValueAndValidity();
      this.grade?.clearValidators();
      this.grade?.updateValueAndValidity();
    }
  }

  onSubmit(form: FormGroup): void {
    if (form.valid) {
      this.submitForm.emit(form.value);
    }
  }
}
