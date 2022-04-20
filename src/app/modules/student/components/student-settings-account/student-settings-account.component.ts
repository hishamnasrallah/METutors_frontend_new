import { Store } from '@ngrx/store';
import { map, tap } from 'rxjs/operators';
import { environment } from '@environment';
import { Observable, combineLatest } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormValidationUtilsService } from '@metutor/core/validators';

import {
  FormGroup,
  Validators,
  FormBuilder,
  AbstractControl,
} from '@angular/forms';

import { GENDERS } from '@config';
import { ICountry, IStudent } from '@models';
import * as fromCore from '@metutor/core/state';
import { AlertNotificationService } from '@metutor/core/components';
import { selectIsUpdatingStudentProfile } from '@metutor/core/state/reducers/student.reducer';

@Component({
  selector: 'metutors-student-settings-account',
  templateUrl: './student-settings-account.component.html',
  styleUrls: ['./student-settings-account.component.scss'],
})
export class StudentSettingsAccountComponent implements OnInit {
  form: FormGroup;
  genders = GENDERS;
  imageUrl = environment.imageURL;
  isChangeAvatar$: Observable<boolean>;
  isSavingProfile: Observable<boolean>;
  countries$: Observable<ICountry[] | null>;
  view$: Observable<{ student: IStudent | null; loading: boolean }>;

  constructor(
    private _fb: FormBuilder,
    private _store: Store<any>,
    private _fv: FormValidationUtilsService,
    private _alertNotificationService: AlertNotificationService
  ) {}

  ngOnInit(): void {
    this._store.dispatch(fromCore.loadStudent());
    this._store.dispatch(fromCore.loadProgramCountries());
    this.countries$ = this._store.select(fromCore.selectProgramCountries);
    this.isChangeAvatar$ = this._store.select(fromCore.selectIsUploadingAvatar);
    this.isSavingProfile = this._store.select(
      fromCore.selectIsUpdatingStudentProfile
    );

    this.view$ = combineLatest([
      this._store.select(fromCore.selectStudent).pipe(
        tap((student) => {
          if (student) {
            this._form(student);
          }
        })
      ),
      this._store.select(fromCore.selectIsLoadingStudents),
    ]).pipe(
      map(([student, loading]) => ({
        loading,
        student,
      }))
    );
  }

  get firstName(): AbstractControl | null {
    return this.form.get('first_name');
  }

  get lastName(): AbstractControl | null {
    return this.form.get('last_name');
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

  private _form(student: IStudent): void {
    this.form = this._fb.group({
      first_name: [
        student.firstName || null,
        [
          Validators.required,
          Validators.pattern("^[a-zA-Z -']+"),
          this._fv.minCharacterValidator,
          this._fv.maxCharacterValidator,
        ],
      ],
      last_name: [
        student.lastName || null,
        [
          Validators.required,
          this._fv.minCharacterValidator,
          this._fv.maxCharacterValidator,
          Validators.pattern("^[a-zA-Z -']+"),
        ],
      ],
      email: [student.email || null],
      gender: [student.gender || null],
      country: [student.country || null],
      headline: [student.headline || null],
    });
  }
}
