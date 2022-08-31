import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import * as fromCore from '@metutor/core/state';
import { ILanguage, ITutor } from 'src/app/core/models';
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
  generalConstants,
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
  @Input() set tutor(_tutor: ITutor) {
    if (_tutor) {
      this.form.patchValue({
        nameOfUniversity: _tutor?.qualifications?.nameOfUniversity,
        computerSkills: _tutor?.qualifications?.computerSkills,
        degreeLevel: _tutor?.qualifications?.degreeLevel,
        teachingExperience: _tutor?.qualifications?.teachingExperience,
        degreeField: _tutor?.qualifications?.degreeField,
        teachingExperienceOnline:
          _tutor?.qualifications?.teachingExperienceOnline,
        currentEmployer: _tutor?.qualifications?.currentEmployer,
        currentTitle: _tutor?.qualifications?.currentTitle,
        video: _tutor?.qualifications?.video,
      });

      if (_tutor.languages && _tutor.languages.length) {
        _tutor.languages.forEach((language, index) => {
          this.languages.push(this.newLanguage());

          this.languages.at(index).patchValue({
            language: language,
            level: language.level,
          });
        });

        this.removeLanguage(_tutor.languages.length);
      }

      this.form?.markAsDirty();
      this.form?.updateValueAndValidity();
    }
  }

  @Output() changeStep = new EventEmitter();
  @Output() submitForm = new EventEmitter();

  form: FormGroup;
  invalid = 'INVALID';
  filterDegree: string;
  uploadingVideo: boolean;
  skills = COMPUTER_SKILLS;
  degreeLevels = DEGREE_LEVELS;
  experiences = TEACHING_EXPERIENCE;
  fileUploadProgress$: Observable<any>;
  uploadComplete = generalConstants.uploadComplete;

  constructor(
    private _fb: FormBuilder,
    private _store: Store<any>,
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

  ngOnInit(): void {
    this._store.dispatch(fromCore.resetUploadFileProgress());
    this.fileUploadProgress$ = this._store
      .select(fromCore.selectFileUploadingProgress)
      .pipe(
        tap((progress) => {
          progress?.map((response: any) => {
            if (response.responseType === this.uploadComplete) {
              this.uploadingVideo = false;
              this.video?.setValue(response?.url);
              this.video?.markAsDirty();
            }
          });
        })
      );
  }

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
    if (this.degreeLevel?.value) {
      if (this.filterDegree) {
        return DEGREE_FIELDS.filter((degree) =>
          degree
            ?.toLowerCase()
            .includes(
              this.degreeLevel?.value
                ?.toLowerCase()
                ?.split(' ')
                ?.shift()
                ?.slice(0, 6)
            )
        )?.filter((deg) =>
          deg?.toLowerCase().includes(this.filterDegree.toLowerCase())
        );
      } else {
        return DEGREE_FIELDS.filter((degree) =>
          degree
            ?.toLowerCase()
            .includes(
              this.degreeLevel?.value
                ?.toLowerCase()
                ?.split(' ')
                ?.shift()
                ?.slice(0, 6)
            )
        );
      }
    } else {
      return DEGREE_FIELDS;
    }
  }

  resetDegreeField(): void {
    this.degreeField?.setValue(null);
    this.degreeField?.updateValueAndValidity();
  }

  onChangeVideo(event: any): void {
    if (event.target && event.target.files && event.target.files.length) {
      const file = event.target?.files[0];
      const mimeType = event.target.files[0].type;

      if (mimeType.match(/video\/*/) == null) {
        this._alertNotificationService.error('Only Videos are allowed');

        return;
      }

      if (file.size > 120 * 1024 * 1024) {
        this._alertNotificationService.error('Allowed file size is 120MB');

        return;
      }

      this.uploadingVideo = true;
      this._store.dispatch(
        fromCore.uploadFile({ file: [...event.target.files] })
      );
    }
  }

  submitFormData() {
    if (this.form.touched) {
      const spokenLanguages = this.form.value.languages.map((lang: any) => ({
        language_id: lang?.language?.id,
        level: lang?.level,
      }));

      const body = {
        step: 3,
        video: this.video?.value,
        degree_field: this.degreeField?.value,
        degree_level: this.degreeLevel?.value,
        current_title: this.currentTitle?.value,
        computer_skills: this.computerSkills?.value,
        current_employer: this.currentEmployer?.value,
        name_of_university: this.nameOfUniversity?.value,
        spoken_languages: JSON.stringify(spokenLanguages),
        teaching_experience: this.teachingExperience?.value,
        teaching_experience_online: this.teachingExperienceOnline?.value,
      };

      this.submitForm.emit(body);
    } else {
      this.changeStep.emit(4);
    }
  }
}
