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

import * as fromCore from '@metutor/core/state';
import * as fromTutor from '@metutor/modules/tutor/state';

@Component({
  selector: 'metutors-admin-edit-feedback-modal',
  templateUrl: './admin-edit-feedback-modal.component.html',
  styleUrls: ['./admin-edit-feedback-modal.component.scss'],
})
export class AdminEditFeedbackModalComponent implements OnInit {
  @Input() showModal = false;

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

  ngOnInit(): void {
    this.submittingFeedback$ = this._store.select(
      fromCore.selectIsSubmittingTutorFeedback
    );

    this.form = this._fb.group({
      receiver_id: [null],
      cancelCourse: [false],
      review: [null, Validators.required],
      feedbacks: this._fb.array([]),
    });

    this.view$ = combineLatest([
      this._store.select(fromCore.selectIsLoadingTutorFeedbackOptions),
      this._store.select(fromCore.selectTutorFeedbackOptions).pipe(
        tap((options) => {
          if (options) {
            this.feedbacks.clear();

            // const id = this.isPlatform ? 'testimonial_id' : 'feedback_id';

            options.params.forEach((option: any) => {
              this.feedbacks.push(
                this._fb.group({
                  rating: [null, Validators.required],
                  //     [id]: [option.id, Validators.required],
                })
              );
            });
          }
        })
      ),
      this._store.select(fromTutor.selectTutorStateParams).pipe(
        tap((params) => {
          this.receiverId?.setValue(params?.studentId);
        })
      ),
    ]).pipe(
      map(([loading, feedbackOptions]) => ({ loading, feedbackOptions }))
    );
  }
}
