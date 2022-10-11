import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import { isNil, omitBy } from 'lodash';
import { generalConstants } from '@config';
import { ITutor } from '@metutor/core/models';
import * as fromCore from '@metutor/core/state';
import { TranslateService } from '@ngx-translate/core';
import { AlertNotificationService } from 'src/app/core/components';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import {
  FormGroup,
  Validators,
  FormBuilder,
  AbstractControl,
} from '@angular/forms';

@Component({
  selector: 'metutors-complete-tutor-profile-profile-picture',
  templateUrl: './complete-tutor-profile-profile-picture.component.html',
  styleUrls: ['./complete-tutor-profile-profile-picture.component.scss'],
})
export class CompleteTutorProfileProfilePictureComponent implements OnInit {
  @Input() loading: boolean | null;
  @Input() set tutor(_tutor: ITutor) {
    if (_tutor) {
      this.form.setValue({
        avatar:
          _tutor?.avatar === generalConstants.defaultAvatarPath
            ? null
            : _tutor?.avatar,
        cover:
          _tutor?.cover === generalConstants.defaultCoverPath
            ? null
            : _tutor?.cover,
      });

      this.form?.markAsDirty();
      this.form?.updateValueAndValidity();
    }
  }

  @Output() changeStep = new EventEmitter();
  @Output() submitForm = new EventEmitter();

  form: FormGroup;
  picType: string;
  uploadingFile: boolean;

  fileUploadProgress$: Observable<any>;
  uploadComplete = generalConstants.uploadComplete;

  constructor(
    private _fb: FormBuilder,
    private _store: Store<any>,
    private _translate: TranslateService,
    private _alertNotificationService: AlertNotificationService
  ) {
    this.form = this._fb.group({
      cover: [null],
      avatar: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.fileUploadProgress$ = this._store
      .select(fromCore.selectFileUploadingProgress)
      .pipe(
        tap((progress) => {
          progress?.map((response: any) => {
            if (response.responseType === this.uploadComplete) {
              this.uploadingFile = false;

              if (this.picType === 'avatar') {
                this.avatar?.setValue(response?.url);
                this.avatar?.markAsDirty();
              } else if (this.picType === 'cover') {
                this.cover?.setValue(response?.url);
                this.cover?.markAsDirty();
              }

              this.form.markAsDirty();
              this.form.markAsTouched();
              this._store.dispatch(fromCore.resetUploadFileProgress());
            }
          });
        })
      );
  }

  get avatar(): AbstractControl | null {
    return this.form.get('avatar');
  }

  get cover(): AbstractControl | null {
    return this.form.get('cover');
  }

  onChangeAvatar(event: any): void {
    if (event.target && event.target.files && event.target.files.length) {
      const file = event.target?.files[0];
      const mimeType = event.target.files[0].type;

      if (mimeType.match(/image\/*/) == null) {
        this._translate.get('ONLY_IMAGES_ALLOWED').subscribe((res: string) => {
          this._alertNotificationService.error(res);
        });

        return;
      }

      if (file.size > 2 * 1024 * 1024) {
        this._translate.get('ALLOWED_SIZE_2MB').subscribe((res: string) => {
          this._alertNotificationService.error(res);
        });

        return;
      }

      this.picType = 'avatar';
      this.uploadingFile = true;
      this._store.dispatch(
        fromCore.uploadFile({ file: [...event.target.files] })
      );
    }
  }

  onChangeCover(event: any): void {
    if (event.target && event.target.files && event.target.files.length) {
      const file = event.target?.files[0];
      const mimeType = event.target.files[0].type;

      if (mimeType.match(/image\/*/) == null) {
        this._translate.get('ONLY_IMAGES_ALLOWED').subscribe((res: string) => {
          this._alertNotificationService.error(res);
        });

        return;
      }

      if (file.size > 2 * 1024 * 1024) {
        this._translate.get('ALLOWED_SIZE_2MB').subscribe((res: string) => {
          this._alertNotificationService.error(res);
        });

        return;
      }

      this.picType = 'cover';
      this.uploadingFile = true;
      this._store.dispatch(
        fromCore.uploadFile({ file: [...event.target.files] })
      );
    }
  }

  deleteCover(): void {
    this.cover?.setValue(null);
    this.cover?.markAsDirty();
    this.form.markAsDirty();
    this.form.markAsTouched();
    this._store.dispatch(fromCore.resetUploadFileProgress());
  }

  submitFormData(): void {
    if (this.form.touched) {
      const data = {
        step: '2',
        avatar: this.avatar?.value,
        cover_img: this.cover?.value ? this.cover?.value : null,
      };

      this.submitForm.emit(omitBy(data, isNil));
    } else {
      this.changeStep.emit(3);
    }
  }
}
