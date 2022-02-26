import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'metutors-complete-tutor-profile-qualification-details',
  templateUrl: './complete-tutor-profile-qualification-details.component.html',
  styleUrls: ['./complete-tutor-profile-qualification-details.component.scss'],
})
export class CompleteTutorProfileQualificationDetailsComponent
  implements OnInit
{
  @Input() loading?: boolean;

  @Output() submitForm = new EventEmitter();

  form: FormGroup;
  language: FormGroup;

  constructor(private _fb: FormBuilder) {
    this.form = this._fb.group({
      nameOfUniversity: [null, [Validators.required]],
      computerSkills: [null, [Validators.required]],
      degreeLevel: [null, [Validators.required]],
      teachingExperience: [null, [Validators.required]],
      degreeField: [null, [Validators.required]],
      teachingExperienceOnline: [null, [Validators.required]],
      currentEmployer: [null],
      currentTitle: [null],
    });

    this.language = this._fb.group({
      spoken_language: [null, [Validators.required]],
      spoken_language_level: [null, [Validators.required]],
    });
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
  get spoken_language(): AbstractControl | null {
    return this.language.get('spoken_language');
  }

  get spoken_language_level(): AbstractControl | null {
    return this.language.get('spoken_language_level');
  }

  addLanguage() {
    // let data = {
    //   language: this.spoken_language?.value,
    //   level: this.spoken_language_level?.value,
    // };
    // this._lookupsService.addLanguage(data).subscribe((response) => {
    //   if (response.status === 'true') {
    //     this._alertNotificationService.success(response.message);
    //     this.spokenLanguages = response.language;
    //     this.languageAdded++;
    //   } else {
    //     this._alertNotificationService.error(response.errors[0]);
    //   }
    //   this.language.reset();
    // });
  }

  removeLanguage(lang: any) {
    let data = {
      id: lang.id,
    };

    // this._lookupsService.removeLanguage(data).subscribe((response) => {
    //   if (response.status === 'true') {
    //     this._alertNotificationService.success(response.message);
    //     this.spokenLanguages = response.language;
    //     this.languageAdded--;
    //   } else {
    //     this._alertNotificationService.error(response.errors[0]);
    //   }
    // });
  }

  submitFormData() {
    // let languages = [];
    // for (let i = 0; i < this.spokenLanguages.length; i++) {
    //   let data: any = {
    //     language: this.spokenLanguages[i]?.language,
    //     level: this.spokenLanguages[i]?.level,
    //   };

    //   languages.push(data);
    // }

    // let spokenLanguages = [
    //   {
    //     name: id,
    //     level: 'Native'
    //   },
    //   {
    //     name: 'Arabic',
    //     level: 'Basic'
    //   }
    // ]

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
      // spoken_languages: this.spokenLanguages?.value
    };

    this.submitForm.emit(data);
  }
}
