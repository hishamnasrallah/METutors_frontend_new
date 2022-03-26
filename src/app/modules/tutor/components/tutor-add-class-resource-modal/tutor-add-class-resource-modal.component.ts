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

  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();
  @Output() submitted: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  form: FormGroup;
  selectedURLs: any[] = [];
  filesPreview: any[] = [];

  view$: Observable<{ loading: boolean; resource: any }>;

  constructor(private _fb: FormBuilder, private _store: Store<any>) {}

  ngOnInit(): void {
    this.form = this._fb.group({
      resourceId: [null],
      files: [null],
      urls: this._fb.array([]),
      description: [null, [Validators.required, Validators.minLength(10)]],
    });

    this.addURL();

    this.view$ = combineLatest([
      this._store.select(fromCore.selectTutorResource).pipe(
        tap((data: any) => {
          if (data) {
            console.log(data.resource);
            this.resourceId?.setValue(data?.resource?.class?.resourceId);
            this.selectedURLs = [...data.resource.urls];
            // this.urls.push(JSON.parse(data.resource.urls));
            this.description?.setValue(data?.resource?.description);
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

  get urls(): FormArray {
    return this.form?.get('urls') as FormArray;
  }

  get files(): FormArray {
    return this.form?.get('files') as FormArray;
  }

  removeFile(i: number): void {
    console.log(this.files.value);
    // this.files.value.splice(i, 1);
    this.filesPreview.splice(i, 1);
  }

  removeURL(i: number): void {
    (this.form?.get('urls') as FormArray).removeAt(i);
    this.selectedURLs.splice(i, 1);

    if (this.form.value.urls.length === 0) {
      this.addURL();
    }
  }

  newURL(): FormGroup {
    return this._fb.group(
      {
        url: [null],
        title: [null],
      },
      { validators: this._urlValidation.bind(this) }
    );
  }

  addURL(): void {
    this.urls.push(this.newURL());
  }

  saveURL(): void {
    this.selectedURLs.push({
      url: this.urls.value[this.urls.value.length - 1].url,
      title: this.urls.value[this.urls.value.length - 1].title,
    });

    this.addURL();
  }

  onFileChange(event: any): void {
    if (event.target && event.target.files && event.target.files.length) {
      this.form.patchValue({ files: event.target.files });
      this.form.get('files')?.updateValueAndValidity();
      this.form?.markAsDirty();

      Array.from(event.target.files).forEach((file: any) => {
        this.filesPreview.push({
          name: file.name,
          size: formatBytes(file.size),
        });
      });
    }
  }

  private _urlValidation(control: AbstractControl): any {
    const url = control.get('url');
    const title = control.get('title');

    console.log(this.form);
    if (!this.selectedURLs?.length) {
      return { required: true };
    }

    if (url?.value) {
      console.log(url?.value.match(urlRegEx));
    }

    if (url?.value && !url.value.match(urlRegEx)) {
      return { required: true };
    }

    return null;
  }
}
