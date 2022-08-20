import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { GENDERS } from '@metutor/config';
import { ICity, ICountry } from 'src/app/core/models';

@Component({
  selector: 'metutors-complete-tutor-profile-personal-information',
  templateUrl: './complete-tutor-profile-personal-information.component.html',
  styleUrls: ['./complete-tutor-profile-personal-information.component.scss'],
  providers: [DatePipe],
})
export class CompleteTutorProfilePersonalInformationComponent
  implements OnInit
{
  @Input() cities: ICity[] | null;
  @Input() loading: boolean | null;
  @Input() countries: ICountry[] | null;

  @Output() submitForm = new EventEmitter();
  @Output() loadCities = new EventEmitter<string>();

  form: FormGroup;
  genders = GENDERS;
  filterCity: string;
  maxDate = new Date();
  filterCountry: string;
  filterNationality: string;

  constructor(private _fb: FormBuilder, private _datePipe: DatePipe) {
    this.form = this._fb.group({
      middleName: [null, [Validators.minLength(3), Validators.maxLength(15)]],
      nationality: [null, [Validators.required]],
      dateOfBirth: [null, [Validators.required]],
      address: [
        null,
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(120),
        ],
      ],
      address2: [null, [Validators.minLength(1), Validators.maxLength(120)]],
      gender: [null, [Validators.required]],
      country: [null, [Validators.required]],
      city: [null, [Validators.required]],
      bio: [
        null,
        [
          Validators.required,
          Validators.minLength(200),
          Validators.maxLength(400),
        ],
      ],
      postalCode: [
        null,
        [Validators.required, Validators.minLength(3), Validators.maxLength(6)],
      ],
    });
  }

  ngOnInit(): void {
    this.maxDate.setFullYear(new Date().getFullYear() - 18);
  }

  get middleName(): AbstractControl | null {
    return this.form.get('middleName');
  }

  get nationality(): AbstractControl | null {
    return this.form.get('nationality');
  }

  get dateOfBirth(): AbstractControl | null {
    return this.form.get('dateOfBirth');
  }

  get address(): AbstractControl | null {
    return this.form.get('address');
  }

  get address2(): AbstractControl | null {
    return this.form.get('address2');
  }

  get gender(): AbstractControl | null {
    return this.form.get('gender');
  }

  get country(): AbstractControl | null {
    return this.form.get('country');
  }

  get city(): AbstractControl | null {
    return this.form.get('city');
  }

  get bio(): AbstractControl | null {
    return this.form.get('bio');
  }

  get postalCode(): AbstractControl | null {
    return this.form.get('postalCode');
  }

  get filteredNationalities(): ICountry[] {
    if (this.filterNationality) {
      return (
        this.countries?.filter((country) =>
          country?.name
            .toLowerCase()
            .includes(this.filterNationality.toLowerCase())
        ) || []
      );
    } else {
      return this.countries || [];
    }
  }

  get filteredCountries(): ICountry[] {
    if (this.filterCountry) {
      return (
        this.countries?.filter((country) =>
          country?.name.toLowerCase().includes(this.filterCountry.toLowerCase())
        ) || []
      );
    } else {
      return this.countries || [];
    }
  }

  get filteredCities(): ICity[] {
    if (this.filterCity) {
      return (
        this.cities?.filter((city) =>
          city?.name.toLowerCase().includes(this.filterCity.toLowerCase())
        ) || []
      );
    } else {
      return this.cities || [];
    }
  }

  resetCity(): void {
    this.city?.setValue(null);
    this.city?.updateValueAndValidity();
  }

  submitFormData(): void {
    const data = {
      step: '1',
      middle_name: this.middleName?.value,
      gender: this.gender?.value,
      nationality: this.nationality?.value,
      date_of_birth: this._datePipe.transform(
        this.dateOfBirth?.value,
        'dd/MM/yyyy'
      ),
      address: this.address?.value,
      address2: this.address2?.value || '',
      bio: this.bio?.value,
      country: this.country?.value,
      city: this.city?.value,
      postal_code: this.postalCode?.value,
    };

    this.submitForm.emit(data);
  }
}
