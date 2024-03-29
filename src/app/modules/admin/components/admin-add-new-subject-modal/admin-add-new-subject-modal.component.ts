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
        name_ar: _subject.nameAr,
        program: _subject?.programId,
        country: _subject?.countryId,
        description: _subject.description,
        description_ar: _subject.descriptionAr,
        grade: _subject?.grade,
        field: _subject?.fieldId,
        price: _subject?.pricePerHour,
      });
    }
  }

  @Output() submitForm: EventEmitter<any> = new EventEmitter<any>();
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();
  @Output() changeProgram: EventEmitter<any> = new EventEmitter<any>();

  form: FormGroup;
  grades = GRADES;
  subject: ISubject;
  nationalId = generalConstants.nationalId;

  constructor(private _fb: FormBuilder) {
    this.form = this._fb.group({
      name: [null, Validators.required],
      name_ar: [null, Validators.required],
      description: [null, Validators.required],
      description_ar: [null, Validators.required],
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

  get field(): AbstractControl | null {
    return this.form.get('field');
  }

  onChangeProgram(): void {
    const programId = this.program?.value;

    this.field?.setValue(null);
    this.field?.updateValueAndValidity();

    if (programId.toString() === this.nationalId.toString()) {
      this.country?.setValidators([Validators.required]);
      this.grade?.setValidators([Validators.required]);

      if (!this.country?.value || !this.grade?.value) {
        return;
      }
    } else {
      this.country?.setValidators([]);
      this.grade?.setValidators([]);
      this.country?.setValue(null);
      this.grade?.setValue(null);
    }

    this.grade?.updateValueAndValidity();
    this.country?.updateValueAndValidity();

    this.changeProgram.emit({
      programId,
      countryId: this.country?.value,
      grade: this.grade?.value,
    });
  }

  onSubmit(form: FormGroup): void {
    if (form.valid) {
      this.submitForm.emit(form.value);
    }
  }
}
