import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { FormValidationUtilsService } from '@metutor/core/validators';

import {
  FormGroup,
  Validators,
  FormBuilder,
  AbstractControl,
} from '@angular/forms';

import { ICountry } from '@models';
import * as fromCore from '@metutor/core/state';
import { GENDERS, generalConstants } from '@config';

@Component({
  selector: 'metutors-student-settings-account',
  templateUrl: './student-settings-account.component.html',
  styleUrls: ['./student-settings-account.component.scss'],
})
export class StudentSettingsAccountComponent implements OnInit {
  form: FormGroup;
  genders = GENDERS;
  uploadedFiles$: Observable<any>;
  fileUploadProgress$: Observable<any>;
  countries$: Observable<ICountry[] | null>;
  uploadComplete = generalConstants.uploadComplete;

  constructor(
    private _fb: FormBuilder,
    private _store: Store<any>,
    private _fv: FormValidationUtilsService
  ) {}

  ngOnInit(): void {
    this.form = this._fb.group({
      picture: [null, Validators.required],
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

    this.fileUploadProgress$ = this._store.select(
      fromCore.selectFileUploadingProgress
    );

    this.uploadedFiles$ = this._store
      .select(fromCore.selectUploadedFiles)
      .pipe(tap((files) => this.picture?.setValue(files)));

    this._store.dispatch(fromCore.loadProgramCountries());
    this.countries$ = this._store.select(fromCore.selectProgramCountries);
  }

  get picture(): AbstractControl | null {
    return this.form?.get('picture');
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
    this._store.dispatch(fromCore.resetUploadedFiles());
    if (event.target && event.target.files && event.target.files.length) {
      const file = [...event.target.files];
      this._store.dispatch(fromCore.uploadFile({ file }));
    }
  }

  onSubmit(form: FormGroup) {
    const body = form.value;
    this._store.dispatch(fromCore.studentUpdateProfile({ body }));
  }
}
