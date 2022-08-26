import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import { ITutor } from '@metutor/core/models';
import { AlertNotificationService } from 'src/app/core/components';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import {
  FormGroup,
  Validators,
  FormBuilder,
  AbstractControl,
} from '@angular/forms';

import { Observable } from 'rxjs';
import { generalConstants } from '@config';
import * as fromCore from '@metutor/core/state';

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
        avatar: _tutor?.avatar,
        cover: _tutor?.cover,
      });

      this.form?.updateValueAndValidity();
    }
  }

  @Output() backBtn = new EventEmitter();
  @Output() submitForm = new EventEmitter();

  form: FormGroup;
  picType: string;
  uploadingFile: boolean;

  fileUploadProgress$: Observable<any>;
  uploadComplete = generalConstants.uploadComplete;

  constructor(
    private _fb: FormBuilder,
    private _store: Store<any>,
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
        this._alertNotificationService.error('Only images are allowed');

        return;
      }

      if (file.size > 2 * 1024 * 1024) {
        this._alertNotificationService.error('Allowed file size is 2MB');

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
        this._alertNotificationService.error('Only images are allowed');

        return;
      }

      if (file.size > 2 * 1024 * 1024) {
        this._alertNotificationService.error('Allowed file size is 2MB');

        return;
      }

      this.picType = 'cover';
      this.uploadingFile = true;
      this._store.dispatch(
        fromCore.uploadFile({ file: [...event.target.files] })
      );
    }
  }

  submitFormData(): void {
    const formData = new FormData();

    formData.append('step', '2');
    formData.append('avatar', this.avatar?.value);
    formData.append('cover_img', this.cover?.value);

    this.submitForm.emit(formData);
  }
}
