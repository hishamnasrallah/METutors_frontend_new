import {
  FormGroup,
  Validators,
  FormBuilder,
  AbstractControl,
} from '@angular/forms';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { generalConstants } from '@config';
import * as fromCore from '@metutor/core/state';

@Component({
  selector: 'metutors-tutor-add-assignment-modal',
  templateUrl: './tutor-add-assignment-modal.component.html',
  styleUrls: ['./tutor-add-assignment-modal.component.scss'],
})
export class TutorAddAssignmentModalComponent implements OnInit {
  @Input() showModal: boolean = false;
  @Input() submitting: boolean = false;

  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();
  @Output() submitted: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  form: FormGroup;
  minDate = new Date();
  selectedURLs: any[] = [];
  filesPreview: any[] = [];

  uploadedFiles$: Observable<any>;
  fileUploadProgress$: Observable<any>;
  uploadComplete = generalConstants.uploadComplete;

  constructor(private _fb: FormBuilder, private _store: Store<any>) {}

  ngOnInit(): void {
    this.form = this._fb.group({
      files: [null, Validators.required],
      endDate: [null, Validators.required],
      assignee: [null, Validators.required],
      startDate: [null, Validators.required],
      title: [null, [Validators.required, Validators.minLength(3)]],
      description: [null, [Validators.required, Validators.minLength(10)]],
      urls: this._fb.group(
        {
          url: [null],
          title: [null],
        },
        { validators: this._urlValidation.bind(this) }
      ),
    });

    this.fileUploadProgress$ = this._store.select(
      fromCore.selectFileUploadingProgress
    );

    this.uploadedFiles$ = this._store
      .select(fromCore.selectUploadedFiles)
      .pipe(tap((files) => this.files?.setValue(files)));
  }

  get files(): AbstractControl | null {
    return this.form?.get('files');
  }

  get urls(): FormGroup {
    return this.form?.get('urls') as FormGroup;
  }

  get startDate(): AbstractControl | null {
    return this.form.get('startDate');
  }

  get endDate(): AbstractControl | null {
    return this.form.get('endDate');
  }

  onChangeDateDay(): void {
    if (this.startDate?.value && this.endDate?.value) {
      if (this.endDate.value < this.startDate.value) {
        this.endDate.setValue(null);
      }
    }
  }

  removeURL(i: number): void {
    this.selectedURLs.splice(i, 1);
    this.form.get('urls')?.updateValueAndValidity();
  }

  addURL(): void {
    this.selectedURLs.push(this.urls.value);
    this.urls.get('url')?.setValue(null);
    this.urls.get('title')?.setValue(null);
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
      endDate: moment(this.startDate?.value).format('Y-MM-DD'),
      startDate: moment(this.endDate?.value).format('Y-MM-DD'),
    };

    this.submitted.emit(data);
  }

  private _urlValidation(control: AbstractControl): any {
    const url = control.get('url');
    const title = control.get('title');

    if (!this.selectedURLs.length) {
      return { required: true };
    }

    if (url?.value && !title?.value) {
      return { required: true };
    }

    if (!url?.value && title?.value) {
      return { required: true };
    }

    return null;
  }
}
