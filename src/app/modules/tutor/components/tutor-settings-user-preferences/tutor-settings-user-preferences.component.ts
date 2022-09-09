import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import {
  state,
  style,
  group,
  animate,
  trigger,
  transition,
} from '@angular/animations';

import { ILanguage } from '@models';
import { LANGUAGES_LEVELS_CONST } from '@config';

@Component({
  selector: 'metutors-tutor-settings-user-preferences',
  templateUrl: './tutor-settings-user-preferences.component.html',
  styleUrls: ['./tutor-settings-user-preferences.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('in', style({ height: '*', opacity: 0 })),
      transition(':leave', [
        style({ height: '*', opacity: 1 }),

        group([
          animate(300, style({ height: 0 })),
          animate('200ms ease-in-out', style({ opacity: '0' })),
        ]),
      ]),
      transition(':enter', [
        style({ height: '0', opacity: 0 }),

        group([
          animate(300, style({ height: '*' })),
          animate('400ms ease-in-out', style({ opacity: '1' })),
        ]),
      ]),
    ]),
  ],
})
export class TutorSettingsUserPreferencesComponent implements OnInit {
  @Input() preferences: any;
  @Input() isSubmitting: boolean;
  @Input() languagesList: ILanguage[] | null;

  @Output() submitForm = new EventEmitter();

  form: FormGroup;
  invalid = 'INVALID';
  levels = LANGUAGES_LEVELS_CONST;

  constructor(private _fb: FormBuilder) {}

  get gender(): FormArray {
    return this.form?.get('preferred_gender') as FormArray;
  }

  get languages(): FormArray {
    return this.form?.get('languages') as FormArray;
  }

  removeLanguage(i: number): void {
    (this.form?.get('languages') as FormArray).removeAt(i);
  }

  newLanguage(language?: any): FormGroup {
    return this._fb.group({
      language: [language?.language, Validators.required],
      level: [language?.efficiency, Validators.required],
    });
  }

  addLanguage(): void {
    if (this.languages.status !== this.invalid) {
      this.languages.push(this.newLanguage());
    }
  }

  onSubmit(form: FormGroup) {
    if (form.valid) {
      const formData = {
        ...form.value,
        spoken_languages: form.value.languages.map((language: any) => ({
          ...language,
          efficiency: language.level,
          language: language.language.id,
        })),
      };
      this.submitForm.emit(formData);
    }
  }

  ngOnInit(): void {
    this.form = this._fb.group({
      preferred_gender: [null, Validators.required],
      languages: this._fb.array([]),
    });

    this.gender.setValue(this.preferences?.preferred_gender || 'both');

    if (this.preferences?.spoken_languages?.length) {
      this.preferences.spoken_languages.forEach((language: any) => {
        this.languages.push(this.newLanguage(language));
      });
    }
  }
}
