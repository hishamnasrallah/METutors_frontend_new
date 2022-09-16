import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { formatBytes } from '@metutor/config';

@Component({
  selector: 'metutors-signup-upload-documents',
  templateUrl: './signup-upload-documents.component.html',
  styleUrls: ['./signup-upload-documents.component.scss'],
})
export class SignupUploadDocumentsComponent implements OnInit {
  @Input() loading?: boolean;

  @Output() submitForm = new EventEmitter();

  form: FormGroup;
  files: any[] = [];
  filesPreview: any[] = [];

  constructor(private _fb: FormBuilder) {
    this.form = this._fb.group({
      files: [null, Validators.required],
    });
  }

  ngOnInit(): void {}

  removeFile(index: number): void {
    this.files.splice(index, 1);
    this.filesPreview.splice(index, 1);

    this.form.patchValue({ files: this.files });
    this.form.get('files')?.updateValueAndValidity();
    this.form?.markAsDirty();
  }

  onFileChange(event: any): void {
    if (event.target && event.target.files && event.target.files.length) {
      Array.from(event.target.files).forEach((file: any) => {
        this.files.push(file);
        this.filesPreview.push({
          name: file.name,
          size: formatBytes(file.size),
        });
      });

      this.form.patchValue({ files: this.files });
      this.form.get('files')?.updateValueAndValidity();
      this.form?.markAsDirty();
    }
  }

  onSubmit(): void {
    this.submitForm.emit(this.form.value.files);
  }
}
