import {
  FormArray,
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
import { formatBytes, urlRegEx } from '@metutor/config';

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

  form: FormGroup;
  selectedURLs: any[] = [];
  filesPreview: any[] = [];

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
              this.filesPreview = [...data.resource?.files];
              this.files.setValue(data.resource.files);
            }

            this.description?.setValue(data?.resource?.description);
            this.resourceId?.setValue(data?.resource?.class?.resourceId);
          }
        })
      ),
      this._store.select(fromCore.selectIsLoadingTutorResource),
    ]).pipe(map(([resource, loading]) => ({ loading, resource })));
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

  get files(): FormArray {
    return this.form?.get('files') as FormArray;
  }

  removeFile(i: number): void {
    console.log(this.files.value);
    // this.files.value.splice(i, 1);
    this.filesPreview.splice(i, 1);
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
      Array.from(event.target.files).forEach((file: any) => {
        this.filesPreview.push({
          file,
          name: file.name,
          size: formatBytes(file.size),
        });
      });

      const files = this.filesPreview.map((f) => f.file);

      this.form.patchValue({ files });
      this.form.get('files')?.updateValueAndValidity();
      this.form?.markAsDirty();
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