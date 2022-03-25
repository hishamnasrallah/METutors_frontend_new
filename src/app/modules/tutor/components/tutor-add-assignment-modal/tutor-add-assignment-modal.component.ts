import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { formatBytes } from '@metutor/config';

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

  constructor(private _fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this._fb.group({
      title: [null, [Validators.required, Validators.minLength(3)]],
      description: [null, [Validators.required, Validators.minLength(10)]],
      startDate: [null],
      endDate: [null],
      urls: this._fb.array([]),
    });

    this.addURL();
  }

  get urls(): FormArray {
    return this.form?.get('urls') as FormArray;
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
      files: [],
    });
  }

  addURL(): void {
    this.urls.push(this.newURL());
  }

  saveURL(): void {
    console.log(this.urls);
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
