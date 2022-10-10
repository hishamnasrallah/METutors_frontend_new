import { Store } from '@ngrx/store';
import { map, tap } from 'rxjs/operators';
import { ICountry, IStudent } from '@models';
import * as fromCore from '@metutor/core/state';
import { Observable, combineLatest } from 'rxjs';
import { GENDERS, generalConstants } from '@config';
import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit, Input } from '@angular/core';
import { AlertNotificationService } from '@metutor/core/components';
import { FormValidationUtilsService } from '@metutor/core/validators';

import {
  FormGroup,
  Validators,
  FormBuilder,
  AbstractControl,
} from '@angular/forms';

@Component({
  selector: 'metutors-student-settings-account',
  templateUrl: './student-settings-account.component.html',
  styleUrls: ['./student-settings-account.component.scss'],
})
export class StudentSettingsAccountComponent implements OnInit {
  @Input() countries: ICountry[] | null;

  form: FormGroup;
  genders = GENDERS;
  filterCountry: string;
  fileUploadProgress$: Observable<any>;
  isChangeAvatar$: Observable<boolean>;
  isSavingProfile: Observable<boolean>;
  uploadComplete = generalConstants.uploadComplete;
  view$: Observable<{ student: IStudent | null; loading: boolean }>;

  constructor(
    private _fb: FormBuilder,
    private _store: Store<any>,
    private _translate: TranslateService,
    private _fv: FormValidationUtilsService,
    private _alertNotificationService: AlertNotificationService
  ) {}

  ngOnInit(): void {
    this._store.dispatch(fromCore.loadStudent());

    this.isChangeAvatar$ = this._store.select(fromCore.selectIsUploadingAvatar);
    this.isSavingProfile = this._store.select(
      fromCore.selectIsUpdatingStudentProfile
    );

    this.fileUploadProgress$ = this._store
      .select(fromCore.selectFileUploadingProgress)
      .pipe(
        tap((progress) => {
          progress?.map((response: any) => {
            if (response.responseType === this.uploadComplete) {
              this._store.dispatch(
                fromCore.changeAvatar({ file: response.url })
              );
            }
          });
        })
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

  uploadProfilePic(event: any): void {
    if (event.target && event.target.files && event.target.files.length) {
      const file = event.target?.files;
      const mimeType = event.target.files[0].type;

      if (mimeType.match(/image\/*/) == null) {
        this._translate.get('ONLY_IMAGES_ALLOWED').subscribe((res: string) => {
          this._alertNotificationService.error(res);
        });

        return;
      }

      if (file[0].size > 1024 * 1024) {
        this._translate.get('ALLOWED_SIZE_1MB').subscribe((res: string) => {
          this._alertNotificationService.error(res);
        });

        return;
      }

      this._store.dispatch(fromCore.uploadFile({ file: [...file] }));
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
