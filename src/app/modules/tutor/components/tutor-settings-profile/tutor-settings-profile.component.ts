import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
} from '@angular/forms';
import {
  COMPUTER_SKILLS,
  DEGREE_FIELDS,
  DEGREE_LEVELS,
  GENDERS,
  LANGUAGES_LEVELS_CONST,
  TEACHING_EXPERIENCE,
} from '@metutor/config';
import { ICity, ICountry, ITutor } from '@metutor/core/models';

@Component({
  selector: 'metutors-tutor-settings-profile',
  templateUrl: './tutor-settings-profile.component.html',
  styleUrls: ['./tutor-settings-profile.component.scss'],
})
export class TutorSettingsProfileComponent implements OnInit {
  @Input() tutor?: ITutor;
  @Input() cities: ICity[] | null;
  @Input() loading: boolean | null;
  @Input() countries: ICountry[] | null;

  @Output() submitForm = new EventEmitter();
  @Output() submitInterview = new EventEmitter();
  @Output() loadCities = new EventEmitter<string>();

  genders = GENDERS;
  maxDate = new Date();
  skills = COMPUTER_SKILLS;
  personalInfoForm: FormGroup;
  qualificationForm: FormGroup;
  degreeLevels = DEGREE_LEVELS;
  degreeFields = DEGREE_FIELDS;
  levels = LANGUAGES_LEVELS_CONST;
  experiences = TEACHING_EXPERIENCE;

  constructor(private _fb: FormBuilder) {}

  ngOnInit(): void {
    this.personalInfoForm = this._fb.group({
      middleName: [null, [Validators.required]],
      nationality: [null, [Validators.required]],
      dateOfBirth: [null, [Validators.required]],
      address: [null, [Validators.required]],
      address2: [null],
      gender: [null, [Validators.required]],
      country: [null, [Validators.required]],
      city: [null, [Validators.required]],
      bio: [null, [Validators.required]],
      postalCode: [null, [Validators.required]],
    });

    this.qualificationForm = this._fb.group({
      nameOfUniversity: [null, [Validators.required]],
      computerSkills: [null, [Validators.required]],
      degreeLevel: [null, [Validators.required]],
      teachingExperience: [null, [Validators.required]],
      degreeField: [null, [Validators.required]],
      // languages: this._fb.array([]),
      teachingExperienceOnline: [null, [Validators.required]],
      currentEmployer: [null],
      currentTitle: [null],
      // video: [null, Validators.required],
    });
  }

  get middleName(): AbstractControl | null {
    return this.personalInfoForm.get('middleName');
  }

  get nationality(): AbstractControl | null {
    return this.personalInfoForm.get('nationality');
  }

  get dateOfBirth(): AbstractControl | null {
    return this.personalInfoForm.get('dateOfBirth');
  }

  get address(): AbstractControl | null {
    return this.personalInfoForm.get('address');
  }

  get gender(): AbstractControl | null {
    return this.personalInfoForm.get('gender');
  }

  get country(): AbstractControl | null {
    return this.personalInfoForm.get('country');
  }

  get city(): AbstractControl | null {
    return this.personalInfoForm.get('city');
  }

  get bio(): AbstractControl | null {
    return this.personalInfoForm.get('bio');
  }
  get postalCode(): AbstractControl | null {
    return this.personalInfoForm.get('postalCode');
  }

  get nameOfUniversity(): AbstractControl | null {
    return this.qualificationForm.get('nameOfUniversity');
  }

  get computerSkills(): AbstractControl | null {
    return this.qualificationForm.get('computerSkills');
  }

  get degreeLevel(): AbstractControl | null {
    return this.qualificationForm.get('degreeLevel');
  }

  get teachingExperience(): AbstractControl | null {
    return this.qualificationForm.get('teachingExperience');
  }

  get degreeField(): AbstractControl | null {
    return this.qualificationForm.get('degreeField');
  }

  get teachingExperienceOnline(): AbstractControl | null {
    return this.qualificationForm.get('teachingExperienceOnline');
  }

  get currentEmployer(): AbstractControl | null {
    return this.qualificationForm.get('currentEmployer');
  }

  get currentTitle(): AbstractControl | null {
    return this.qualificationForm.get('currentTitle');
  }

  get video(): AbstractControl | null {
    return this.qualificationForm.get('video');
  }

  get languages(): FormArray {
    return this.qualificationForm?.get('languages') as FormArray;
  }
}
