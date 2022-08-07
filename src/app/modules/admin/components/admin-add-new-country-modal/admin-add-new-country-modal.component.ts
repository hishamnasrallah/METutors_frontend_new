import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICountry } from '@metutor/core/models';

@Component({
  selector: 'metutors-admin-add-new-country-modal',
  templateUrl: './admin-add-new-country-modal.component.html',
  styleUrls: ['./admin-add-new-country-modal.component.scss'],
})
export class AdminAddNewCountryModalComponent implements OnInit {
  @Input() isAdding: boolean;
  @Input() countries: ICountry[];
  @Input() showModal: boolean = false;

  @Input() set selectedCountry(_country: ICountry) {
    if (_country) {
      this.country = _country;
      this.form?.patchValue({ name: _country.name });
    }
  }

  @Output() submitForm: EventEmitter<any> = new EventEmitter<any>();
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  form: FormGroup;
  country: ICountry;

  constructor(private _fb: FormBuilder) {
    this.form = this._fb.group({
      name: [null, Validators.required],
    });
  }

  ngOnInit(): void {}

  onSubmit(form: FormGroup): void {
    if (form.valid) {
      this.submitForm.emit(form.value);
    }
  }
}
