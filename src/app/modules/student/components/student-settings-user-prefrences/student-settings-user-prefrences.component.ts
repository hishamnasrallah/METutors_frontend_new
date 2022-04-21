import { Store } from '@ngrx/store';
import { map, tap } from 'rxjs/operators';
import { Observable, combineLatest } from 'rxjs';
import { Component, OnInit } from '@angular/core';

import {
  FormGroup,
  Validators,
  FormBuilder,
  AbstractControl,
} from '@angular/forms';

import { GENDERS } from '@config';
import { ILanguage } from '@models';
import * as fromCore from '@metutor/core/state';

@Component({
  selector: 'metutors-student-settings-user-prefrences',
  templateUrl: './student-settings-user-prefrences.component.html',
  styleUrls: ['./student-settings-user-prefrences.component.scss'],
})
export class StudentSettingsUserPrefrencesComponent implements OnInit {
  form: FormGroup;
  genders = GENDERS;
  showLanguages = false;
  isSavingPreferences: Observable<boolean>;

  view$: Observable<{
    preferences: any;
    loading: boolean;
    languages: ILanguage[] | null;
  }>;

  constructor(private _store: Store<any>, private _fb: FormBuilder) {}

  get teacherLanguage(): AbstractControl | null {
    return this.form.get('teacher_language');
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

    this.view$ = combineLatest([
      this._store.select(fromCore.selectLanguages),
      this._store.select(fromCore.selectStudentPreferences).pipe(
        tap((preferences) => {
          if (preferences) {
            this._form(preferences);
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

    this.isSavingPreferences = this._store.select(
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

  private _form(preference: any): void {
    this.form = this._fb.group({
      teacher_language: [preference?.teacherLanguage?.id || null],
      preferred_gender: [
        preference?.preferredGender || null,
        Validators.required,
      ],
      preferred_language: [
        preference?.preferredLanguage?.id || null,
        Validators.required,
      ],
    });
  }
}
