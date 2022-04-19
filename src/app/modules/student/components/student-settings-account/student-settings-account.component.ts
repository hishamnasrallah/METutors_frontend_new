import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CountryISO } from 'ngx-intl-tel-input';
import { AlertNotificationService } from 'src/app/core/components';
import { AuthService, UsersService } from 'src/app/core/services';
import { FormValidationUtilsService } from '@metutor/core/validators';
import * as fromCore from '@metutor/core/state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { GENDERS, generalConstants } from '@config';
import { ICountry } from '@models';

@Component({
  selector: 'metutors-student-settings-account',
  templateUrl: './student-settings-account.component.html',
  styleUrls: ['./student-settings-account.component.scss'],
})
export class StudentSettingsAccountComponent implements OnInit {
  form: FormGroup;
  genders = GENDERS;
  preferredCountries: CountryISO[] = [
    CountryISO.UnitedStates,
    CountryISO.UnitedKingdom,
  ];

  uploadedFiles$: Observable<any>;
  fileUploadProgress$: Observable<any>;
  countries$: Observable<ICountry[] | null>;
  uploadComplete = generalConstants.uploadComplete;

  constructor(
    private _fb: FormBuilder,
    private _store: Store<any>,
    private _authService: AuthService,
    private _userService: UsersService,
    private _fv: FormValidationUtilsService,
    private _alertNotificationService: AlertNotificationService
  ) {}

  ngOnInit(): void {
    this.form = this._fb.group({
      picture: [null, Validators.required],
      firstName: [
        null,
        [
          Validators.required,
          Validators.pattern("^[a-zA-Z -']+"),
          this._fv.minCharacterValidator,
          this._fv.maxCharacterValidator,
        ],
      ],
      lastName: [
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
    return this.form.get('firstName');
  }

  get lastName(): AbstractControl | null {
    return this.form.get('lastName');
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
    if (form) {
      console.log(form.value);
      return;
    }
    const formData = new FormData();

    this._authService.updateStudentProfile(formData).subscribe((response) => {
      if (response.status === true) {
        this.form.reset();

        this._alertNotificationService.success(response.message);
      } else {
        this._alertNotificationService.error(response.errors[0]);
      }
    });
  }
}
