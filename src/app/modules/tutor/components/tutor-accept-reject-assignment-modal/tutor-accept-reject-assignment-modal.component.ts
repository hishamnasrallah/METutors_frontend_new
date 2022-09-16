import {
  FormGroup,
  Validators,
  FormBuilder,
  AbstractControl,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { generalConstants } from '@config';
import * as fromCore from '@metutor/core/state';
import * as fromTutor from '@metutor/modules/tutor/state';

@Component({
  selector: 'metutors-tutor-accept-reject-assignment-modal',
  templateUrl: './tutor-accept-reject-assignment-modal.component.html',
  styleUrls: ['./tutor-accept-reject-assignment-modal.component.scss'],
})
export class TutorAcceptRejectAssignmentModalComponent implements OnInit {
  @Input() showModal = false;

  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  form: FormGroup;
  isReject: boolean;
  params$: Observable<any>;
  isSubmitting$: Observable<any>;
  uploadedFiles$: Observable<any>;
  fileUploadProgress$: Observable<any>;
  uploadComplete = generalConstants.uploadComplete;

  constructor(private _fb: FormBuilder, private _store: Store<any>) {}

  get rating(): AbstractControl | null {
    return this.form.get('rating');
  }

  get assignmentId(): AbstractControl | null {
    return this.form.get('assignment_id');
  }

  get userAssignmentId(): AbstractControl | null {
    return this.form.get('user_assignment_id');
  }

  get studentId(): AbstractControl | null {
    return this.form.get('student_id');
  }

  get file(): AbstractControl | null {
    return this.form?.get('file');
  }

  onRatingSelect(rating: any) {
    const val = rating.value ? rating.value : null;
    this.rating?.setValue(val);
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

  submit(): void {
    const body = {
      ...this.form.value,
      file: this.form.value.file[0],
    };

    if (this.isReject) {
      this._store.dispatch(fromCore.tutorRejectAssignment({ body }));
    } else {
      this._store.dispatch(fromCore.tutorAcceptAssignment({ body }));
    }
  }

  ngOnInit(): void {
    this.form = this._fb.group({
      file: [null],
      review: [null, Validators.required],
      rating: [null, Validators.required],
      student_id: [null, Validators.required],
      assignment_id: [null, Validators.required],
      user_assignment_id: [null, Validators.required],
    });

    this.fileUploadProgress$ = this._store.select(
      fromCore.selectFileUploadingProgress
    );

    this.isSubmitting$ = this._store.select(
      fromCore.selectIsAcceptRejectAssignment
    );

    this.uploadedFiles$ = this._store
      .select(fromCore.selectUploadedFiles)
      .pipe(tap((files) => this.file?.setValue(files)));

    this.params$ = this._store.select(fromTutor.selectTutorStateParams).pipe(
      tap((data: any) => {
        if (data) {
          this.isReject = data.isReject;
          this.studentId?.setValue(data.userId);
          this.userAssignmentId?.setValue(data.id);
          this.assignmentId?.setValue(data.assignmentId);
        }
      })
    );
  }
}
