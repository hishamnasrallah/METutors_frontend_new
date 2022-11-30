import { GENDERS } from '@config';
import { ILanguage } from '@models';
import { Store } from '@ngrx/store';
import { map, tap } from 'rxjs/operators';
import * as fromCore from '@metutor/core/state';
import { Observable, combineLatest } from 'rxjs';
import { Component, OnInit } from '@angular/core';

import {
  FormGroup,
  Validators,
  FormBuilder,
  AbstractControl,
} from '@angular/forms';

@Component({
  selector: 'metutors-student-settings-user-prefrences',
  templateUrl: './student-settings-user-prefrences.component.html',
  styleUrls: ['./student-settings-user-prefrences.component.scss'],
})
export class StudentSettingsUserPrefrencesComponent implements OnInit {
  form: FormGroup;
  genders = GENDERS;
  showLanguages = false;
  isSavingPreferences$: Observable<boolean>;

  view$: Observable<{
    preferences: any;
    loading: boolean;
    languages: ILanguage[] | null;
  }>;

  constructor(private _store: Store<any>, private _fb: FormBuilder) {}

  get teacherLanguage(): AbstractControl | null {
    return this.form.get('teacher_language');
  }

  get preferredGender(): AbstractControl | null {
    return this.form.get('preferred_gender');
  }

  get preferredLanguage(): AbstractControl | null {
    return this.form.get('preferred_language');
  }

  onSubmit(form: FormGroup): void {
    let body = form.value;

    if (!this.showLanguages) {
      const { teacher_language, ...rest } = form.value;
      body = rest;
    }

    this._store.dispatch(fromCore.studentUpdatePreferences({ body }));
  }

  ngOnInit(): void {
    this._store.dispatch(fromCore.loadLanguages());
    this._store.dispatch(fromCore.loadStudentPreference());

    this.form = this._fb.group({
      teacher_language: [null],
      preferred_gender: [null, Validators.required],
      preferred_language: [null, Validators.required],
    });

    this.view$ = combineLatest([
      this._store.select(fromCore.selectLanguages),
      this._store.select(fromCore.selectStudentPreferences).pipe(
        tap((preferences) => {
          if (preferences) {
            this.showLanguages = !!preferences?.teacherLanguage;
            this.teacherLanguage?.setValue(preferences?.teacherLanguage);
            this.preferredGender?.setValue(preferences?.preferredGender);
            this.preferredLanguage?.setValue(preferences?.preferredLanguage);
          }
        })
      ),
      this._store.select(fromCore.selectIsLoadingStudentPreferences),
    ]).pipe(
      map(([languages, preferences, loading]) => ({
        loading,
        languages,
        preferences,
      }))
    );

    this.isSavingPreferences$ = this._store.select(
      fromCore.selectIsUpdatingStudentProfile
    );
  }

  onChange(event: any): void {
    this.showLanguages = event.value === '-1';

    if (this.showLanguages) {
      this.teacherLanguage?.addValidators(Validators.required);
    } else {
      this.teacherLanguage?.clearValidators();
    }

    this.teacherLanguage?.updateValueAndValidity();
  }
}
