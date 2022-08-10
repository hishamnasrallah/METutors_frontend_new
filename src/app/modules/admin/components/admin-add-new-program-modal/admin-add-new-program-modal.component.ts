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
        description: _program.description,
      });
    }
  }

  @Output() submitForm: EventEmitter<any> = new EventEmitter<any>();
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  form: FormGroup;
  program: IProgram;

  constructor(private _fb: FormBuilder) {
    this.form = this._fb.group({
      name: [null, Validators.required],
      image: [null, Validators.required],
      description: [null, Validators.required],
    });
  }

  get name(): AbstractControl | null {
    return this.form.get('name');
  }

  get image(): AbstractControl | null {
    return this.form.get('image');
  }

  get description(): AbstractControl | null {
    return this.form.get('description');
  }

  onSubmit(form: FormGroup): void {
    if (form.valid) {
      const formData = new FormData();
      formData.set('image', this.image?.value);
      formData.set('name', this.name?.value);
      formData.set('description', this.description?.value);

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
