import {
  FormGroup,
  Validators,
  FormBuilder,
  AbstractControl,
} from '@angular/forms';

import { Store } from '@ngrx/store';
import { map, tap } from 'rxjs/operators';
import { Observable, combineLatest } from 'rxjs';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import * as fromCore from '@metutor/core/state';
import { generalConstants } from '@metutor/config';

@Component({
  selector: 'metutors-tutor-add-class-resource-modal',
  templateUrl: './tutor-add-class-resource-modal.component.html',
  styleUrls: ['./tutor-add-class-resource-modal.component.scss'],
})
export class TutorAddClassResourceModalComponent implements OnInit {
  @Input() heading: string;
  @Input() showModal: boolean = false;
  @Input() submitting: boolean = false;

  @Output() submitted: EventEmitter<any> = new EventEmitter<any>();
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();
  @Output() deleted: EventEmitter<number> = new EventEmitter<number>();

  form: FormGroup;
  selectedURLs: any[] = [];

  uploadedFiles$: Observable<any>;
  fileUploadProgress$: Observable<any>;
  uploadComplete = generalConstants.uploadComplete;
  view$: Observable<{ loading: boolean; resource: any }>;

  constructor(private _fb: FormBuilder, private _store: Store<any>) {}

  ngOnInit(): void {
    this.form = this._fb.group({
      resourceId: [null],
      files: [null, Validators.required],
      description: [null, [Validators.required, Validators.minLength(10)]],
      urls: this._fb.group(
        {
          url: [null],
          title: [null],
        },
        { validators: this._urlValidation.bind(this) }
      ),
    });

    this.view$ = combineLatest([
      this._store.select(fromCore.selectTutorResource).pipe(
        tap((data: any) => {
          if (data) {
            if (data?.resource?.urls?.length) {
              this.selectedURLs = [...data.resource?.urls];
            }

            if (data?.resource?.files?.length) {
              this.files?.setValue(data.resource.files);
              this._store.dispatch(
                fromCore.setFiles({ files: data.resource.files })
              );
            }

            this.description?.setValue(data?.resource?.description);
            this.resourceId?.setValue(data?.resource?.class?.resourceId);
          }
        })
      ),
      this._store.select(fromCore.selectIsLoadingTutorResource),
    ]).pipe(map(([resource, loading]) => ({ loading, resource })));

    this.fileUploadProgress$ = this._store
      .select(fromCore.selectFileUploadingProgress)
      .pipe(
        tap((progress) => {
          progress?.map((response: any) => {
            if (response.responseType === this.uploadComplete) {
              this.files?.markAsDirty();
            }
          });
        })
      );

    this.uploadedFiles$ = this._store
      .select(fromCore.selectUploadedFiles)
      .pipe(tap((files) => this.files?.setValue(files)));
  }

  get resourceId(): AbstractControl | null {
    return this.form?.get('resourceId');
  }

  get description(): AbstractControl | null {
    return this.form?.get('description');
  }

  get urls(): FormGroup {
    return this.form?.get('urls') as FormGroup;
  }

  get files(): AbstractControl | null {
    return this.form?.get('files');
  }

  removeFile(id: number): void {
    this._store.dispatch(fromCore.deleteUploadedFile({ id }));
  }

  addURL(): void {
    this.selectedURLs.push(this.urls.value);
    this.urls.get('url')?.setValue(null);
    this.urls.get('title')?.setValue(null);
  }

  removeURL(i: number): void {
    this.selectedURLs.splice(i, 1);
    this.form.get('urls')?.updateValueAndValidity();
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
