import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
      description: [null, Validators.required],
    });
  }

  ngOnInit(): void {}

  onSubmit(form: FormGroup): void {
    if (form.valid) {
      this.submitForm.emit(form.value);
    }
  }
}
