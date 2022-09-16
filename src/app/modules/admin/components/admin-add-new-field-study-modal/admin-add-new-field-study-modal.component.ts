import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import {
  FormGroup,
  Validators,
  FormBuilder,
  AbstractControl,
} from '@angular/forms';

import { generalConstants, GRADES } from '@metutor/config';
import { ICountry, IField, IProgram } from '@metutor/core/models';

@Component({
  selector: 'metutors-admin-add-new-field-study-modal',
  templateUrl: './admin-add-new-field-study-modal.component.html',
  styleUrls: ['./admin-add-new-field-study-modal.component.scss'],
})
export class AdminAddNewFieldStudyModalComponent implements OnInit {
  @Input() isAdding: boolean;
  @Input() programs: IProgram[];
  @Input() countries: ICountry[];
  @Input() showModal: boolean = false;

  @Input() set selectedField(_field: IField) {
    if (_field) {
      this.field = _field;
      this.form?.patchValue({
        name: _field.name,
        program_id: _field?.programId,
        country_id: _field?.countryId,
      });

      this.image?.setValidators(null);
    }
  }

  @Output() submitForm: EventEmitter<any> = new EventEmitter<any>();
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  field: IField;
  form: FormGroup;
  grades = GRADES;
  nationalId = generalConstants.nationalId;

  constructor(private _fb: FormBuilder) {
    this.form = this._fb.group({
      country_id: [null],
      name: [null, Validators.required],
      image: [null, Validators.required],
      program_id: [null, Validators.required],
    });
  }

  ngOnInit(): void {}

  get name(): AbstractControl | null {
    return this.form.get('name');
  }

  get image(): AbstractControl | null {
    return this.form.get('image');
  }

  get program(): AbstractControl | null {
    return this.form.get('program_id');
  }

  get country(): AbstractControl | null {
    return this.form.get('country_id');
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

  onUploadImage(event: any): void {
    if (event.target && event.target.files && event.target.files.length) {
      const file = event.target.files[0];

      this.image?.setValue(file);
      this.image?.updateValueAndValidity();
      this.form?.markAsDirty();
    }
  }

  onSubmit(form: FormGroup): void {
    if (form.valid) {
      const formData = new FormData();
      formData.set('name', this.name?.value);
      formData.set('image', this.image?.value);
      formData.set('country_id', this.country?.value);
      formData.set('program_id', this.program?.value);

      this.submitForm.emit(formData);
    }
  }
}
