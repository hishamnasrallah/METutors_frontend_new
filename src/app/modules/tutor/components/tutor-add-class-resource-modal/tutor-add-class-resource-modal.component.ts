import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
      description: [null, [Validators.required, Validators.minLength(10)]],
      urls: this._fb.array([]),
    });

    this.addURL();
  }

  get urls(): FormArray {
    return this.form?.get('urls') as FormArray;
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
      title: [null],
      link: [null],
      files:[]
    });
  }

  addURL(): void {
    this.urls.push(this.newURL());
  }

  saveURL(): void {
    console.log(this.urls)
    this.selectedURLs.push({
      title: this.urls.value[this.urls.value.length - 1].title,
      link: this.urls.value[this.urls.value.length - 1].link,
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
}
