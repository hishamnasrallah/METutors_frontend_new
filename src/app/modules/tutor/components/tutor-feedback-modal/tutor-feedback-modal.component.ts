import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { combineLatest, Observable, tap } from 'rxjs';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import {
  FormArray,
  FormGroup,
  Validators,
  FormBuilder,
  AbstractControl,
} from '@angular/forms';

import * as fromTutor from '../../state';
import * as fromCore from '@metutor/core/state';

@Component({
  selector: 'metutors-tutor-feedback-modal',
  templateUrl: './tutor-feedback-modal.component.html',
  styleUrls: ['./tutor-feedback-modal.component.scss'],
})
export class TutorFeedbackModalComponent implements OnInit {
  @Input() showModal = false;
  @Input() isPlatform = false;
  @Input() tabLabel = 'Student Feedback';
  @Input() messageLabel = 'Write a feedback';
  @Input() heading = 'Write your feedback for the student';

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

  get redirect(): AbstractControl | null {
    return this.form?.get('redirect');
  }

  ngOnInit(): void {
    this.submittingFeedback$ = this._store.select(
      fromCore.selectIsSubmittingTutorFeedback
    );

    this.form = this._fb.group({
      redirect: [false],
      receiver_id: [null],
      review: [null, Validators.required],
      feedbacks: this._fb.array([]),
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
          this.redirect?.setValue(params?.redirect);
          this.receiverId?.setValue(params?.studentId);
        })
      ),
    ]).pipe(
      map(([loading, feedbackOptions]) => ({ loading, feedbackOptions }))
    );
  }
}
