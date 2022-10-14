import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import * as fromTutor from '../../state';
import * as fromCore from '@metutor/core/state';
import { combineLatest, Observable, tap } from 'rxjs';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import {
  FormArray,
  FormGroup,
  Validators,
  FormBuilder,
  AbstractControl,
} from '@angular/forms';

@Component({
  selector: 'metutors-tutor-feedback-modal',
  templateUrl: './tutor-feedback-modal.component.html',
  styleUrls: ['./tutor-feedback-modal.component.scss'],
})
export class TutorFeedbackModalComponent implements OnInit {
  @Input() showModal = false;
  @Input() isPlatform = false;
  @Input() buttonLabel = 'NEXT';
  @Input() heading = 'WRITE_FEEDBACK';
  @Input() tabLabel = 'STUDENT_FEEDBACK';
  @Input() messageLabel = 'WRITE_FEEDBACK';
  @Input() subHeading = 'WRITE_FEEDBACK_STUDENT';

  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();
  @Output() submitFeedback: EventEmitter<any> = new EventEmitter<any>();

  form!: FormGroup;

  submittingFeedback$: Observable<boolean>;
  view$: Observable<{ loading: boolean; feedbackOptions: any }>;

  constructor(private _store: Store<any>, private _fb: FormBuilder) {}

  get feedbacks(): FormArray {
    return this.form?.get('feedbacks') as FormArray;
  }

  get receiverId(): AbstractControl | null {
    return this.form?.get('receiver_id');
  }

  get cancelCourse(): AbstractControl | null {
    return this.form?.get('cancelCourse');
  }

  ngOnInit(): void {
    this.submittingFeedback$ = this._store.select(
      fromCore.selectIsSubmittingTutorFeedback
    );

    this.form = this._fb.group({
      receiver_id: [null],
      cancelCourse: [false],
      feedbacks: this._fb.array([]),
      review: [null, [Validators.required, Validators.maxLength(800)]],
    });

    this.view$ = combineLatest([
      this._store.select(fromCore.selectIsLoadingTutorFeedbackOptions),
      this._store.select(fromCore.selectTutorFeedbackOptions).pipe(
        tap((options) => {
          if (options) {
            this.feedbacks.clear();

            const id = this.isPlatform ? 'testimonial_id' : 'feedback_id';

            options.params.forEach((option: any) => {
              this.feedbacks.push(
                this._fb.group({
                  rating: [null, Validators.required],
                  [id]: [option.id, Validators.required],
                })
              );
            });
          }
        })
      ),
      this._store.select(fromTutor.selectTutorStateParams).pipe(
        tap((params) => {
          this.receiverId?.setValue(params?.studentId);
          this.cancelCourse?.setValue(params?.cancelCourse);
        })
      ),
    ]).pipe(
      map(([loading, feedbackOptions]) => ({ loading, feedbackOptions }))
    );
  }
}
