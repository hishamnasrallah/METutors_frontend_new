import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
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
        program: _field?.programId,
        country: _field?.countryId,
        grade: _field?.grade,
      });
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
      name: [null, Validators.required],
      program: [null, Validators.required],
      country: [null],
      grade: [null],
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
