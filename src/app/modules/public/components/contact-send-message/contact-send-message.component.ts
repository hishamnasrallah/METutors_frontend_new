import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { formatBytes } from 'src/app/config';
import { AlertNotificationService } from 'src/app/core/components';

@Component({
  selector: 'metutors-contact-send-message',
  templateUrl: './contact-send-message.component.html',
  styleUrls: ['./contact-send-message.component.scss'],
})
export class ContactSendMessageComponent implements OnInit {
  @Input() loading?: boolean;

  @Output() submitContact = new EventEmitter();

  options: any;
  filePreview: any;
  contactForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _alertNotificationService: AlertNotificationService
  ) {
    this.contactForm = this._fb.group({
      name: [null, Validators.required],
      email: [
        null,
        [
          Validators.required,
          Validators.email,
          Validators.pattern(
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          ),
        ],
      ],
      companyName: [null],
      subject: [null, Validators.required],
      message: [null, Validators.required],
      file: [null],
    });
  }

  ngOnInit(): void {
    this.options = {
      center: { lat: 36.890257, lng: 30.707417 },
      zoom: 12,
    };
  }

  get name(): AbstractControl | null {
    return this.contactForm.get('name');
  }

  get email(): AbstractControl | null {
    return this.contactForm.get('email');
  }

  get subject(): AbstractControl | null {
    return this.contactForm.get('subject');
  }

  get message(): AbstractControl | null {
    return this.contactForm.get('message');
  }

  onFileUpload(event: any): void {
    if (event.target && event.target.files && event.target.files.length) {
      const file = event.target.files[0];

      if (file.size > 10 * 1024 * 1024) {
        this._alertNotificationService.error('The File size can\'t be more then 10MB');

        return;
      }

      this.contactForm.patchValue({ file });
      this.contactForm.get('file')?.updateValueAndValidity();
      this.filePreview = {
        name: file.name,
        size: formatBytes(file.size),
      };
    }
  }

  onSubmit({ valid, value }: any) {
    if (valid) {
      this.submitContact.emit(value);
      this.contactForm.reset();
      this.filePreview = null;
    }
  }
}
