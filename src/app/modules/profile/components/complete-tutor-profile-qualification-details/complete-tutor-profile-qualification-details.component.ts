import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { LANGUAGES_LEVELS_CONST } from 'src/app/config';
import { ILanguage } from 'src/app/core/models';

@Component({
  selector: 'metutors-complete-tutor-profile-qualification-details',
  templateUrl: './complete-tutor-profile-qualification-details.component.html',
  styleUrls: ['./complete-tutor-profile-qualification-details.component.scss'],
})
export class CompleteTutorProfileQualificationDetailsComponent
  implements OnInit
{
  @Input() loading?: boolean;
  @Input() languagesList: ILanguage[] | null;

  @Output() submitForm = new EventEmitter();

  form: FormGroup;
  levels = LANGUAGES_LEVELS_CONST;

  constructor(private _fb: FormBuilder) {
    this.form = this._fb.group({
      nameOfUniversity: [null, [Validators.required]],
      computerSkills: [null, [Validators.required]],
      degreeLevel: [null, [Validators.required]],
      teachingExperience: [null, [Validators.required]],
      degreeField: [null, [Validators.required]],
      languages: this._fb.array([]),
      teachingExperienceOnline: [null, [Validators.required]],
      currentEmployer: [null],
      currentTitle: [null],
    });

    this.addLanguage();
  }

  ngOnInit(): void {}

  get nameOfUniversity(): AbstractControl | null {
    return this.form.get('nameOfUniversity');
  }

  get computerSkills(): AbstractControl | null {
    return this.form.get('computerSkills');
  }

  get degreeLevel(): AbstractControl | null {
    return this.form.get('degreeLevel');
  }

  get teachingExperience(): AbstractControl | null {
    return this.form.get('teachingExperience');
  }

  get degreeField(): AbstractControl | null {
    return this.form.get('degreeField');
  }

  get teachingExperienceOnline(): AbstractControl | null {
    return this.form.get('teachingExperienceOnline');
  }

  get currentEmployer(): AbstractControl | null {
    return this.form.get('currentEmployer');
  }

  get currentTitle(): AbstractControl | null {
    return this.form.get('currentTitle');
  }

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
    this.languages.push(this.newLanguage());
  }

  submitFormData() {
    const data = {
      step: '3',
      name_of_university: this.nameOfUniversity?.value,
      computer_skills: this.computerSkills?.value,
      degree_level: this.degreeLevel?.value,
      teaching_experience: this.teachingExperience?.value,
      degree_field: this.degreeField?.value,
      current_employer: this.currentEmployer?.value,
      current_title: this.currentTitle?.value,
      teaching_experience_online: this.teachingExperienceOnline?.value,
      spoken_languages: this.form.value.languages.map((lang: any) => ({
        language_id: lang?.language?.id,
        level: lang?.level,
      })),
    };

    this.submitForm.emit(data);
  }
}
