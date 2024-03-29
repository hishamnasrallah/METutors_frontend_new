import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder,
  AbstractControl,
} from '@angular/forms';

import { IProgram } from '@metutor/core/models';

@Component({
  selector: 'metutors-admin-add-new-program-modal',
  templateUrl: './admin-add-new-program-modal.component.html',
  styleUrls: ['./admin-add-new-program-modal.component.scss'],
})
export class AdminAddNewProgramModalComponent implements OnInit {
  @Input() isAdding: boolean;
  @Input() showModal: boolean = false;

  @Input() set selectedProgram(_program: IProgram) {
    if (_program) {
      this.program = _program;
      this.form?.patchValue({
        name: _program.name,
        name_ar: _program.nameAr,
        title: _program.title,
        title_ar: _program.titleAr,
        description: _program.description,
        description_ar: _program.descriptionAr,
      });

      this.image?.setValidators(null);
    }
  }

  @Output() submitForm: EventEmitter<any> = new EventEmitter<any>();
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  form: FormGroup;
  program: IProgram;

  constructor(private _fb: FormBuilder) {
    this.form = this._fb.group({
      name: [null, Validators.required],
      name_ar: [null, Validators.required],
      title: [null, Validators.required],
      title_ar: [null, Validators.required],
      image: [null, Validators.required],
      description: [null, Validators.required],
      description_ar: [null, Validators.required],
    });
  }

  get name(): AbstractControl | null {
    return this.form.get('name');
  }

  get nameAr(): AbstractControl | null {
    return this.form.get('name_ar');
  }

  get title(): AbstractControl | null {
    return this.form.get('title');
  }

  get titleAr(): AbstractControl | null {
    return this.form.get('title_ar');
  }

  get image(): AbstractControl | null {
    return this.form.get('image');
  }

  get description(): AbstractControl | null {
    return this.form.get('description');
  }

  get descriptionAr(): AbstractControl | null {
    return this.form.get('description_ar');
  }

  onSubmit(form: FormGroup): void {
    if (form.valid) {
      const formData = new FormData();
      formData.set('name', this.name?.value);
      formData.set('name_ar', this.nameAr?.value);
      formData.set('image', this.image?.value);
      formData.set('title', this.title?.value);
      formData.set('title_ar', this.titleAr?.value);
      formData.set('description', this.description?.value);
      formData.set('description_ar', this.descriptionAr?.value);

      this.submitForm.emit(formData);
    }
  }

  onUploadImage(event: any): void {
    if (event.target && event.target.files && event.target.files.length) {
      const file = event.target.files[0];

      this.image?.setValue(file);
      this.image?.updateValueAndValidity();
      this.form?.markAsDirty();
    }
  }

  ngOnInit(): void {}
}
