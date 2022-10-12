import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import { generalConstants } from '@config';
import * as fromCore from '@metutor/core/state';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import {
  FormGroup,
  Validators,
  FormBuilder,
  AbstractControl,
} from '@angular/forms';

@Component({
  selector: 'metutors-student-submit-assignment-modal',
  templateUrl: './student-submit-assignment-modal.component.html',
  styleUrls: ['./student-submit-assignment-modal.component.scss'],
})
export class StudentSubmitAssignmentModalComponent implements OnInit {
  @Input() assignmentId: number;
  @Input() showModal: boolean = false;

  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  form: FormGroup;
  uploadedFiles$: Observable<any>;
  fileUploadProgress$: Observable<any>;
  isSubmittingAssignment$: Observable<boolean>;
  uploadComplete = generalConstants.uploadComplete;

  constructor(private _fb: FormBuilder, private _store: Store<any>) {}

  onSubmit(): void {
    const body = this.form.value;
    this._store.dispatch(fromCore.studentSubmitAssignment({ body }));
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

  get file(): AbstractControl | null {
    return this.form?.get('file');
  }

  ngOnInit(): void {
    this._store.dispatch(fromCore.resetUploadedFiles());
    this.fileUploadProgress$ = this._store.select(
      fromCore.selectFileUploadingProgress
    );

    this.isSubmittingAssignment$ = this._store.select(
      fromCore.selectIsSubmittingAssignment
    );

    this.uploadedFiles$ = this._store
      .select(fromCore.selectUploadedFiles)
      .pipe(tap((files) => this.file?.setValue(files)));

    this.form = this._fb.group({
      id: [this.assignmentId],
      file: [null, Validators.required],
      description: [null, [Validators.required, Validators.minLength(10)]],
    });
  }
}
