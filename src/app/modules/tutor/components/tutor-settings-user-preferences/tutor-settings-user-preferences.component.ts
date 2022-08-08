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
  @Input() isSubmitting: boolean;
  @Input() languagesList: ILanguage[] | null;

  @Output() submitForm = new EventEmitter();

  form: FormGroup;
  invalid = 'INVALID';

  constructor(private _fb: FormBuilder) {}

  get languages(): FormArray {
    return this.form?.get('languages') as FormArray;
  }

  removeLanguage(i: number): void {
    (this.form?.get('languages') as FormArray).removeAt(i);

    if (this.form.value.languages.length === 0) {
      this.addLanguage();
    }
  }

  newLanguage(): FormGroup {
    return this._fb.group({
      language: [null, Validators.required],
      level: [null, Validators.required],
    });
  }

  addLanguage(): void {
    if (this.languages.status !== this.invalid) {
      this.languages.push(this.newLanguage());
    }
  }

  onSubmit(form: FormGroup) {
    if (form.valid) {
      this.submitForm.emit(form.value);
    }
  }

  ngOnInit(): void {
    this.form = this._fb.group({
      gender: [null, Validators.required],
      languages: this._fb.array([]),
    });
  }
}
