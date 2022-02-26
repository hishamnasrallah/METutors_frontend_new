import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'metutors-signup-upload-documents',
  templateUrl: './signup-upload-documents.component.html',
  styleUrls: ['./signup-upload-documents.component.scss'],
})
export class SignupUploadDocumentsComponent implements OnInit {
  @Input() loading?: boolean;

  @Output() submitForm = new EventEmitter();

  form: FormGroup;

  constructor(private _fb: FormBuilder) {
    this.form = this._fb.group({
      files: [null, Validators.required],
    });
  }

  ngOnInit(): void {}

  onFileChange(event: any): void {
    if (event.target && event.target.files && event.target.files.length) {
      this.form.patchValue({ files: event.target.files });
      this.form.get('files')?.updateValueAndValidity();
      this.form?.markAsDirty();
    }
  }

  onSubmit(): void {
    this.submitForm.emit(this.form.value.files);
  }
}
