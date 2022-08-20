import { ILanguage } from 'src/app/core/models';
import { AlertNotificationService } from '@metutor/core/components';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormArray,
  FormGroup,
  Validators,
  FormBuilder,
  AbstractControl,
} from '@angular/forms';
import {
  DEGREE_LEVELS,
  DEGREE_FIELDS,
  COMPUTER_SKILLS,
  TEACHING_EXPERIENCE,
} from 'src/app/config';

@Component({
  selector: 'metutors-complete-tutor-profile-qualification-details',
  templateUrl: './complete-tutor-profile-qualification-details.component.html',
  styleUrls: ['./complete-tutor-profile-qualification-details.component.scss'],
})
export class CompleteTutorProfileQualificationDetailsComponent
  implements OnInit
{
  @Input() loading: boolean | null;
  @Input() languagesList: ILanguage[] | null;

  @Output() submitForm = new EventEmitter();

  videoDemo: any;
  form: FormGroup;
  invalid = 'INVALID';
  filterDegree: string;
  skills = COMPUTER_SKILLS;
  degreeLevels = DEGREE_LEVELS;
  experiences = TEACHING_EXPERIENCE;

  constructor(
    private _fb: FormBuilder,
    private _alertNotificationService: AlertNotificationService
  ) {
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
      video: [null, Validators.required],
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

  get video(): AbstractControl | null {
    return this.form.get('video');
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
    if (this.languages.status !== this.invalid) {
      this.languages.push(this.newLanguage());
    }
  }

  get filteredDegreeFields(): string[] {
    if (this.filterDegree) {
      return (
        DEGREE_FIELDS?.filter((degree) =>
          degree?.toLowerCase().includes(this.filterDegree.toLowerCase())
        ) || []
      );
    } else {
      return DEGREE_FIELDS;
    }
  }

  onChangeVideo(event: any): void {
    if (event.target && event.target.files && event.target.files.length) {
      const file = event.target?.files[0];
      const mimeType = event.target.files[0].type;

      if (mimeType.match(/video\/*/) == null) {
        this._alertNotificationService.error('Only Videos are allowed');

        return;
      }

      if (file.size > 50 * 1024 * 1024) {
        this._alertNotificationService.error('Allowed file size is 50MB');

        return;
      }

      this.form.patchValue({ video: file });
      this.form.get('video')?.updateValueAndValidity();
      this.form?.markAsDirty();

      const reader = new FileReader();
      reader.onload = () => {
        this.videoDemo = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  submitFormData() {
    const formData = new FormData();
    const spokenLanguages = this.form.value.languages.map((lang: any) => ({
      language_id: lang?.language?.id,
      level: lang?.level,
    }));

    formData.append('step', '3');
    formData.append('name_of_university', this.nameOfUniversity?.value);
    formData.append('computer_skills', this.computerSkills?.value);
    formData.append('degree_level', this.degreeLevel?.value);
    formData.append('teaching_experience', this.teachingExperience?.value);
    formData.append(
      'teaching_experience_online',
      this.teachingExperienceOnline?.value
    );
    formData.append('degree_field', this.degreeField?.value);
    formData.append('current_employer', this.currentEmployer?.value);
    formData.append('current_title', this.currentTitle?.value);
    formData.append('video', this.video?.value);
    formData.append('spoken_languages', JSON.stringify(spokenLanguages));

    this.submitForm.emit(formData);
  }
}
