import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { formatBytes } from '@metutor/config';

@Component({
  selector: 'metutors-tutor-add-class-resource-modal',
  templateUrl: './tutor-add-class-resource-modal.component.html',
  styleUrls: ['./tutor-add-class-resource-modal.component.scss'],
})
export class TutorAddClassResourceModalComponent implements OnInit {
  @Input() showModal: boolean = false;
  @Input() submitting: boolean = false;

  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();
  @Output() submitted: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  form: FormGroup;
  selectedURLs: any[] = [];
  filesPreview: any[] = [];

  constructor(private _fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this._fb.group({
      id: [null],
      urls: this._fb.array([]),
      files: this._fb.array([]),
      description: [null, [Validators.required, Validators.minLength(10)]],
    });

    this.addURL();
  }

  get urls(): FormArray {
    return this.form?.get('urls') as FormArray;
  }

  get files(): FormArray {
    return this.form?.get('files') as FormArray;
  }

  removeFile(i: number): void {
    (this.form?.get('files') as FormArray).removeAt(i);
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
    return this._fb.group({
      url: [null],
      title: [null],
    });
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
      Array.from(event.target.files).forEach((file: any) => {
        this.files.push(this._fb.group({ file }));
        this.filesPreview.push({
          name: file.name,
          size: formatBytes(file.size),
        });
      });
    }
  }
}
