import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { HttpEventType } from '@angular/common/http';

import {
  Input,
  OnInit,
  Output,
  Component,
  OnDestroy,
  EventEmitter,
} from '@angular/core';

import { UploadService } from '@services';
import * as fromCore from '@metutor/core/state';
import { ILanguage, ITutor } from 'src/app/core/models';
import { AlertNotificationService } from '@metutor/core/components';

import {
  FormArray,
  FormGroup,
  Validators,
  FormBuilder,
  AbstractControl,
} from '@angular/forms';

import {
  formatBytes,
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
  implements OnInit, OnDestroy
{
  @Input() loading: boolean | null;
  @Input() languagesList: ILanguage[] | null;
  @Input() set tutor(_tutor: ITutor) {
    this._store.dispatch(fromCore.resetUploadedFiles());
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
        resume: _tutor?.userResume,
      });

      if (_tutor.userDegrees && _tutor.userDegrees.length) {
        _tutor.userDegrees.forEach((degree) => {
          this.degrees.push(this._fb.group(degree));
        });
      }

      if (_tutor.userCertificates && _tutor.userCertificates.length) {
        _tutor.userCertificates.forEach((certificate) => {
          this.certificates.push(this._fb.group(certificate));
        });
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
  invalid = 'INVALID';
  filterDegree: string;
  uploadingVideo: boolean;
  skills = COMPUTER_SKILLS;
  degreeLevels = DEGREE_LEVELS;
  experiences = TEACHING_EXPERIENCE;
  fileUploadProgress$: Observable<any>;
  // showViewDocumentModal$: Observable<any>;
  uploadComplete = generalConstants.uploadComplete;

  //Resume
  resumeUploadProgress: any[] = [];
  uploadResumeStream$: Subscription;

  // Degrees
  degreeUploadProgress: any[] = [];
  uploadDegreeStream$: Subscription;

  // Other certificates
  certificateUploadProgress: any[] = [];
  uploadCertificateStream$: Subscription;

  constructor(
    private _fb: FormBuilder,
    private _store: Store<any>,
    private _uploadService: UploadService,
    private _alertNotificationService: AlertNotificationService
  ) {
    this.form = this._fb.group({
      nameOfUniversity: [
        null,
        [Validators.required, Validators.maxLength(120)],
      ],
      resume: [[], Validators.required],
      video: [null, Validators.required],
      languages: this._fb.array([]),
      degreeLevel: [null, [Validators.required]],
      degreeField: [null, [Validators.required]],
      certificates: this._fb.array([]),
      computerSkills: [null, [Validators.required]],
      teachingExperience: [null, [Validators.required]],
      teachingExperienceOnline: [null, [Validators.required]],
      currentTitle: [null, Validators.maxLength(80)],
      currentEmployer: [null, Validators.maxLength(80)],
      degrees: this._fb.array([], [Validators.required]),
    });

    this.addLanguage();
  }

  ngOnInit(): void {
    /*    this.showViewDocumentModal$ = this._store.select(
      fromProfile.selectShowViewDocumentModal
    );*/

    this.fileUploadProgress$ = this._store
      .select(fromCore.selectFileUploadingProgress)
      .pipe(
        tap((progress) => {
          progress?.map((response: any) => {
            if (response.responseType === this.uploadComplete) {
              this.uploadingVideo = false;
              this.video?.setValue(response?.url);
              this.video?.markAsDirty();

              this._store.dispatch(fromCore.resetUploadFileProgress());
            }
          });
        })
      );
  }

  /*  onOpenViewDocumentModal(document: ITeacherDocument): void {
    this.document = document;
    this._store.dispatch(fromProfileActions.openViewDocumentModal());
  }

  onCloseViewDocumentModal(): void {
    this._store.dispatch(fromProfileActions.closeViewDocumentModal());
  }*/

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

  get resume(): AbstractControl | null {
    return this.form.get('resume');
  }

  get degrees(): FormArray {
    return this.form?.get('degrees') as FormArray;
  }

  get certificates(): FormArray {
    return this.form?.get('certificates') as FormArray;
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
        files.push(file);
      });

      this.uploadingVideo = true;
      this._store.dispatch(fromCore.uploadFile({ file: [...files] }));
    }
  }

  onCancelVideoUpload() {
    this.uploadingVideo = false;
    this._store.dispatch(fromCore.cancelFileUpload());
  }

  onUploadResume(event: any): void {
    let files = [];
    if (event.target && event.target.files && event.target.files.length) {
      files = [...event.target.files];

      if (this.resume?.value?.length + files.length > 1) {
        this._alertNotificationService.error('You can only upload one resume');

        return;
      }

      files.forEach((file: any, index: number) => {
        if (file.size > 5 * 1024 * 1024) {
          this._alertNotificationService.error('Allowed file size is 5MB');

          return;
        }

        this.resumeUploadProgress[index] = {
          url: '',
          id: null,
          progress: 0,
          responseType: 0,
          fileSize: file.size,
          fileName: file.name,
        };

        const formData = new FormData();
        formData.append('file', file);
        formData.append('size', formatBytes(file.size));

        this.uploadResumeStream$ = this._uploadService
          .onUploadFile(formData)
          .subscribe((event) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.resumeUploadProgress[index] = {
                ...this.resumeUploadProgress[index],
                progress: Math.round((100 * event.loaded) / event.total),
              };
            } else if (event.type === HttpEventType.Response) {
              const file = event?.body?.file;
              file[0].document = 'resume';
              this.resume?.setValue([file[0]]);
              this.resumeUploadProgress[index] = {
                ...this.resumeUploadProgress[index],
                responseType: event.type,
                id: file?.length ? file[0]?.id : null,
                url: file?.length ? file[0]?.url : '',
              };
            }
          });
      });
    }
  }

  onDeleteResume(): void {
    this.resume?.setValue(null);
  }

  onUploadDegree(event: any): void {
    let files = [];
    if (event.target && event.target.files && event.target.files.length) {
      files = [...event.target.files];

      if (this.degrees?.value?.length + files.length > 10) {
        this._alertNotificationService.error('Maximum allowed files are 10');

        return;
      }

      files.forEach((file: any, index: number) => {
        if (file.size > 5 * 1024 * 1024) {
          this._alertNotificationService.error('Allowed file size is 5MB');

          return;
        }

        this.degreeUploadProgress[index] = {
          url: '',
          id: null,
          progress: 0,
          responseType: 0,
          fileSize: file.size,
          fileName: file.name,
        };

        const formData = new FormData();
        formData.append('file', file);
        formData.append('size', formatBytes(file.size));

        this.uploadDegreeStream$ = this._uploadService
          .onUploadFile(formData)
          .subscribe((event) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.degreeUploadProgress[index] = {
                ...this.degreeUploadProgress[index],
                progress: Math.round((100 * event.loaded) / event.total),
              };
            } else if (event.type === HttpEventType.Response) {
              const file = event?.body?.file;
              file[0].document = 'degree';
              this.degrees?.push(this._fb.group(file[0]));
              this.degreeUploadProgress[index] = {
                ...this.degreeUploadProgress[index],
                responseType: event.type,
                id: file?.length ? file[0]?.id : null,
                url: file?.length ? file[0]?.url : '',
              };
            }
          });
      });
    }
  }

  onDeleteDegree(index: number): void {
    this.degrees.removeAt(index);
  }

  onUploadCertificate(event: any): void {
    let files = [];
    if (event.target && event.target.files && event.target.files.length) {
      files = [...event.target.files];

      if (this.certificates?.value?.length + files.length > 10) {
        this._alertNotificationService.error('Maximum allowed files are 10');

        return;
      }

      files.forEach((file: any, index: number) => {
        if (file.size > 5 * 1024 * 1024) {
          this._alertNotificationService.error('Allowed file size is 5MB');

          return;
        }

        this.certificateUploadProgress[index] = {
          url: '',
          id: null,
          progress: 0,
          responseType: 0,
          fileSize: file.size,
          fileName: file.name,
        };

        const formData = new FormData();
        formData.append('file', file);
        formData.append('size', formatBytes(file.size));

        this.uploadCertificateStream$ = this._uploadService
          .onUploadFile(formData)
          .subscribe((event) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.certificateUploadProgress[index] = {
                ...this.certificateUploadProgress[index],
                progress: Math.round((100 * event.loaded) / event.total),
              };
            } else if (event.type === HttpEventType.Response) {
              const file = event?.body?.file;
              file[0].document = 'certificate';
              this.certificates?.push(this._fb.group(file[0]));

              this.certificateUploadProgress[index] = {
                ...this.certificateUploadProgress[index],
                responseType: event.type,
                id: file?.length ? file[0]?.id : null,
                url: file?.length ? file[0]?.url : '',
              };
            }
          });
      });
    }
  }

  onDeleteCertificate(index: number): void {
    this.certificates.removeAt(index);
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
        resume: this.resume?.value,
        degrees: this.degrees?.value,
        degree_field: this.degreeField?.value,
        degree_level: this.degreeLevel?.value,
        certificates: this.certificates?.value,
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

  ngOnDestroy() {
    this.uploadDegreeStream$?.unsubscribe();
    this.uploadResumeStream$?.unsubscribe();
    this.uploadCertificateStream$?.unsubscribe();
  }
}
