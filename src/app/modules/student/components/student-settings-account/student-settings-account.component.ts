import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { FormValidationUtilsService } from '@metutor/core/validators';

import {
  FormGroup,
  Validators,
  FormBuilder,
  AbstractControl,
} from '@angular/forms';

import { GENDERS } from '@config';
import { ICountry } from '@models';
import * as fromCore from '@metutor/core/state';
import { AlertNotificationService } from '@metutor/core/components';

@Component({
  selector: 'metutors-student-settings-account',
  templateUrl: './student-settings-account.component.html',
  styleUrls: ['./student-settings-account.component.scss'],
})
export class StudentSettingsAccountComponent implements OnInit {
  form: FormGroup;
  genders = GENDERS;
  countries$: Observable<ICountry[] | null>;

  constructor(
    private _fb: FormBuilder,
    private _store: Store<any>,
    private _fv: FormValidationUtilsService,
    private _alertNotificationService: AlertNotificationService
  ) {}

  ngOnInit(): void {
    this.form = this._fb.group({
      first_name: [
        null,
        [
          Validators.required,
          Validators.pattern("^[a-zA-Z -']+"),
          this._fv.minCharacterValidator,
          this._fv.maxCharacterValidator,
        ],
      ],
      last_name: [
        null,
        [
          Validators.required,
          this._fv.minCharacterValidator,
          this._fv.maxCharacterValidator,
          Validators.pattern("^[a-zA-Z -']+"),
        ],
      ],
      email: [
        null,
        [Validators.required, Validators.email, this._fv.maxCharacterValidator],
      ],
      gender: [null],
      country: [null],
      headline: [null],
    });

    this._store.dispatch(fromCore.loadProgramCountries());
    this.countries$ = this._store.select(fromCore.selectProgramCountries);
  }

  get firstName(): AbstractControl | null {
    return this.form.get('first_name');
  }

  get lastName(): AbstractControl | null {
    return this.form.get('last_name');
  }

  get email(): AbstractControl | null {
    return this.form.get('email');
  }

  uploadProfilePic(event: any): void {
    if (event.target && event.target.files && event.target.files.length) {
      const file = event.target?.files[0];
      const mimeType = event.target.files[0].type;

      if (mimeType.match(/image\/*/) == null) {
        this._alertNotificationService.error('Only images are allowed');

        return;
      }

      if (file.size > 1024 * 1024) {
        this._alertNotificationService.error('Allowed file size is 1MB');

        return;
      }

      this._store.dispatch(fromCore.changeAvatar({ file }));
    }
  }

  onSubmit(form: FormGroup) {
    const body = form.value;
    this._store.dispatch(fromCore.studentUpdateProfile({ body }));
  }
}
