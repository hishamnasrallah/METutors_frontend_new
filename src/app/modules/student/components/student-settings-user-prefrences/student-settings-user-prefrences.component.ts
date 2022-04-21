import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
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
  isSavingProfile: Observable<boolean>;
  languages$: Observable<ILanguage[] | null>;

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
    this.languages$ = this._store.select(fromCore.selectLanguages);

    this.isSavingProfile = this._store.select(
      fromCore.selectIsUpdatingStudentProfile
    );

    this.form = this._fb.group({
      teacher_language: [null],
      preferred_gender: [null, Validators.required],
      preferred_language: [null, Validators.required],
    });
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
