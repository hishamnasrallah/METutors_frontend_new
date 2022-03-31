import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AlertNotificationService } from 'src/app/core/components';

@Component({
  selector: 'metutors-complete-tutor-profile-profile-picture',
  templateUrl: './complete-tutor-profile-profile-picture.component.html',
  styleUrls: ['./complete-tutor-profile-profile-picture.component.scss'],
})
export class CompleteTutorProfileProfilePictureComponent implements OnInit {
  @Input() loading: boolean | null;

  @Output() submitForm = new EventEmitter();

  coverPic: any;
  profilePic: any;
  form: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _alertNotificationService: AlertNotificationService
  ) {
    this.form = this._fb.group({
      avatar: [null, Validators.required],
      cover: [null, Validators.required],
    });
  }

  ngOnInit(): void {}

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

      if (file.size > 1 * 1024 * 1024) {
        this._alertNotificationService.error('Allowed file size is 1MB');

        return;
      }

      this.form.patchValue({ avatar: file });
      this.form.get('avatar')?.updateValueAndValidity();
      this.form?.markAsDirty();

      const reader = new FileReader();
      reader.onload = () => {
        this.profilePic = reader.result;
      };
      reader.readAsDataURL(file);
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

      if (file.size > 1 * 1024 * 1024) {
        this._alertNotificationService.error('Allowed file size is 1MB');

        return;
      }

      this.form.patchValue({ cover: file });
      this.form.get('cover')?.updateValueAndValidity();
      this.form?.markAsDirty();

      const reader = new FileReader();
      reader.onload = () => {
        this.coverPic = reader.result;
      };
      reader.readAsDataURL(file);
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
