import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import {
  FormGroup,
  Validators,
  FormBuilder,
  AbstractControl,
} from '@angular/forms';

import { generalConstants } from '@config';
import * as fromCore from '@metutor/core/state';

@Component({
  selector: 'metutors-tutor-resources-upload-document-modal',
  templateUrl: './tutor-resources-upload-document-modal.component.html',
  styleUrls: ['./tutor-resources-upload-document-modal.component.scss'],
})
export class TutorResourcesUploadDocumentModalComponent implements OnInit {
  @Input() showModal: boolean = false;
  @Input() submitting: boolean = false;

  @Output() submitted: EventEmitter<any> = new EventEmitter<any>();
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  form: FormGroup;
  selectedURLs: any[] = [];

  uploadedFiles$: Observable<any>;
  fileUploadProgress$: Observable<any>;
  uploadComplete = generalConstants.uploadComplete;

  constructor(private _fb: FormBuilder, private _store: Store<any>) {}

  ngOnInit(): void {
    this.form = this._fb.group({
      documents: [null, Validators.required],
      title: [null, [Validators.required, Validators.maxLength(120)]],
    });

    this.fileUploadProgress$ = this._store
      .select(fromCore.selectFileUploadingProgress)
      .pipe(
        tap((progress) => {
          progress?.map((response: any) => {
            if (response.responseType === this.uploadComplete) {
              this.documents?.markAsDirty();
            }
          });
        })
      );

    this.uploadedFiles$ = this._store
      .select(fromCore.selectUploadedFiles)
      .pipe(tap((files) => this.documents?.setValue(files)));
  }

  get title(): AbstractControl | null {
    return this.form?.get('title');
  }

  get documents(): AbstractControl | null {
    return this.form?.get('documents');
  }

  removeFile(id: number): void {
    this._store.dispatch(fromCore.deleteUploadedFile({ id }));
  }

  onFileChange(event: any): void {
    if (event.target && event.target.files && event.target.files.length) {
      const file = [...event.target.files];
      this._store.dispatch(fromCore.uploadFile({ file }));
    }
  }

  onSubmit(): void {
    const data = {
      ...this.form.value,
      urls: this.selectedURLs,
    };

    this.submitted.emit(data);
  }
}
