import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder,
  AbstractControl,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { generalConstants } from '@config';
import * as fromCore from '@metutor/core/state';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'metutors-tutor-accept-reject-assignment-modal',
  templateUrl: './tutor-accept-reject-assignment-modal.component.html',
  styleUrls: ['./tutor-accept-reject-assignment-modal.component.scss'],
})
export class TutorAcceptRejectAssignmentModalComponent implements OnInit {
  @Input() id: number;
  @Input() heading: string;
  @Input() isReject: boolean;
  @Input() showModal = false;
  @Input() studentId: number;

  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  form: FormGroup;
  isSubmitting: boolean;
  isDeletingTopic: boolean;
  uploadedFiles$: Observable<any>;
  fileUploadProgress$: Observable<any>;
  uploadComplete = generalConstants.uploadComplete;

  constructor(private _fb: FormBuilder, private _store: Store<any>) {}

  get rating(): AbstractControl | null {
    return this.form.get('rating');
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
    }
  }

  ngOnInit(): void {
    this.form = this._fb.group({
      file: [null, Validators.required],
      id: [this.id, Validators.required],
      review: [null, Validators.required],
      rating: [null, Validators.required],
      student_id: [this.studentId, Validators.required],
    });

    this.fileUploadProgress$ = this._store.select(
      fromCore.selectFileUploadingProgress
    );

    this.uploadedFiles$ = this._store
      .select(fromCore.selectUploadedFiles)
      .pipe(tap((files) => this.file?.setValue(files)));
  }
}
