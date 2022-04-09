import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { combineLatest, Observable, tap } from 'rxjs';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import * as fromCore from '@metutor/core/state';

@Component({
  selector: 'metutors-student-feedback-modal',
  templateUrl: './student-feedback-modal.component.html',
  styleUrls: ['./student-feedback-modal.component.scss'],
})
export class StudentFeedbackModalComponent implements OnInit {
  @Input() showModal = false;

  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  form!: FormGroup;

  submittingFeedback$: Observable<boolean>;
  view$: Observable<{ loading: boolean; feedbackOptions: any }>;

  constructor(private _store: Store<any>, private _fb: FormBuilder) {}

  onSubmitTutorFeedback(form: FormGroup) {
    const body = form.value;
    this._store.dispatch(fromCore.studentSubmitFeedback({ body }));
  }

  get feedbacks(): FormArray {
    return this.form?.get('feedbacks') as FormArray;
  }

  ngOnInit(): void {
    this.submittingFeedback$ = this._store.select(
      fromCore.selectIsSubmittingFeedback
    );

    this.form = this._fb.group({
      review: [null, Validators.required],
      feedbacks: this._fb.array([]),
    });

    this.view$ = combineLatest([
      this._store.select(fromCore.selectIsLoadingStudentFeedbackOptions),
      this._store.select(fromCore.selectStudentFeedbackOptions).pipe(
        tap((options) => {
          if (options) {
            this.feedbacks.clear();

            options.params.forEach((option: any) => {
              this.feedbacks.push(
                this._fb.group({
                  rating: [null, Validators.required],
                  feedback_id: [option.id, Validators.required],
                })
              );
            });
          }
        })
      ),
    ]).pipe(
      map(([loading, feedbackOptions]) => ({ loading, feedbackOptions }))
    );
  }
}
