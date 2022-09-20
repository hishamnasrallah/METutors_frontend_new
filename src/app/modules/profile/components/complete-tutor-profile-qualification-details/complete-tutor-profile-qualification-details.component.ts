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

      if (_tutor?.userDocuments && _tutor?.userDocuments?.length) {
        this._store.dispatch(fromCore.resetUploadedFiles());
        this._store.dispatch(
          fromCore.setFiles({ files: _tutor.userDocuments })
        );
      }

      if (_tutor.languages && _tutor.languages.length) {
        this.languages.clear();
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
  fileId: number;
  uploadType: string;
  invalid = 'INVALID';
  filterDegree: string;
  uploadingVideo: boolean;
  skills = COMPUTER_SKILLS;
  degreeLevels = DEGREE_LEVELS;
  uploadedFiles$: Observable<any>;
  experiences = TEACHING_EXPERIENCE;
  fileUploadProgress$: Observable<any>;
  uploadComplete = generalConstants.uploadComplete;

  constructor(
    private _fb: FormBuilder,
    private _store: Store<any>,
    private _alertNotificationService: AlertNotificationService
  ) {
    this.form = this._fb.group({
      nameOfUniversity: [
        null,
        [Validators.required, Validators.maxLength(120)],
      ],
      computerSkills: [null, [Validators.required]],
      degreeLevel: [null, [Validators.required]],
      teachingExperience: [null, [Validators.required]],
      degreeField: [null, [Validators.required]],
      languages: this._fb.array([]),
      teachingExperienceOnline: [null, [Validators.required]],
      currentEmployer: [null, Validators.maxLength(80)],
      currentTitle: [null, Validators.maxLength(80)],
      video: [null, Validators.required],
      documents: [null, Validators.required],
    });

    this.addLanguage();
  }

  ngOnInit(): void {
    this.uploadedFiles$ = this._store
      .select(fromCore.selectUploadedFiles)
      .pipe(tap((files) => this.documents?.setValue(files)));

    this.fileUploadProgress$ = this._store
      .select(fromCore.selectFileUploadingProgress)
      .pipe(
        tap((progress) => {
          progress?.map((response: any) => {
            if (response.responseType === this.uploadComplete) {
              if (this.uploadType === 'video') {
                this.uploadingVideo = false;
                this.video?.setValue(response?.url);
                this.video?.markAsDirty();
              }

              this.form.markAsDirty();
              this.form.markAsTouched();
              // this._store.dispatch(fromCore.resetUploadFileProgress());
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

  get documents(): AbstractControl | null {
    return this.form.get('documents');
  }

  removeLanguage(i: number): void {
    (this.form?.get('languages') as FormArray).removeAt(i);

    if (this.form.value.languages.length === 0) {
      this.addLanguage();
    }

    this.form?.markAsTouched();
    this.form?.updateValueAndValidity();
    this.languages?.updateValueAndValidity();
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
      this.uploadType = 'video';
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

      const files: any = [];
      Array.from(event.target.files).forEach((file: any) => {
        file.skip = true;
        files.push(file);
      });

      this.uploadingVideo = true;
      this._store.dispatch(fromCore.uploadFile({ file: [...files] }));
    }
  }

  onCancelUpload() {
    this.uploadingVideo = false;
    this._store.dispatch(fromCore.cancelUpload());
  }

  onFileChange(event: any): void {
    if (event.target && event.target.files && event.target.files.length) {
      const file = event.target?.files[0];
      if (file.size > 5 * 1024 * 1024) {
        this._alertNotificationService.error('Allowed file size is 5MB');

        return;
      }

      this.uploadType = 'docs';

      this._store.dispatch(
        fromCore.uploadFile({ file: [...event.target.files] })
      );
    }
  }

  removeFile(index: number, id: number): void {
    this.fileId = id;
    this._store.dispatch(fromCore.deleteUploadedFile({ id }));
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
        documents: this.documents?.value,
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
