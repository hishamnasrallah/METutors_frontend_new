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
import * as fromStudent from '@metutor/modules/student/state';

@Component({
  selector: 'metutors-student-feedback-modal',
  templateUrl: './student-feedback-modal.component.html',
  styleUrls: ['./student-feedback-modal.component.scss'],
})
export class StudentFeedbackModalComponent implements OnInit {
  @Input() showModal = false;
  @Input() isPlatform = false;
  @Input() buttonLabel: string;
  @Input() tabLabel = 'Tutor Feedback';
  @Input() heading = 'Leave a Feedback';
  @Input() messageLabel = 'Write a message to your teacher';
  @Input() subHeading = 'Share with us your feedback on your teacher';

  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();
  @Output() submitFeedback: EventEmitter<any> = new EventEmitter<any>();

  form!: FormGroup;

  submittingFeedback$: Observable<boolean>;
  view$: Observable<{ loading: boolean; feedbackOptions: any }>;

  constructor(private _store: Store<any>, private _fb: FormBuilder) {}

  get receiverId(): AbstractControl | null {
    return this.form?.get('receiver_id');
  }

  get feedbacks(): FormArray {
    return this.form?.get('feedbacks') as FormArray;
  }

  ngOnInit(): void {
    this.submittingFeedback$ = this._store.select(
      fromCore.selectIsSubmittingStudentFeedback
    );

    this.form = this._fb.group({
      receiver_id: [null],
      review: [null, Validators.required],
      feedbacks: this._fb.array([]),
    });

    this.view$ = combineLatest([
      this._store.select(fromCore.selectIsLoadingStudentFeedbackOptions),
      this._store.select(fromCore.selectStudentFeedbackOptions).pipe(
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
      this._store
        .select(fromStudent.selectStudentStateParams)
        .pipe(tap((params) => this.receiverId?.setValue(params?.teacherId))),
    ]).pipe(
      map(([loading, feedbackOptions]) => ({ loading, feedbackOptions }))
    );
  }
}
