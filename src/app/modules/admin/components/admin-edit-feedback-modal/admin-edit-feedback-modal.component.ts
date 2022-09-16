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

@Component({
  selector: 'metutors-admin-edit-feedback-modal',
  templateUrl: './admin-edit-feedback-modal.component.html',
  styleUrls: ['./admin-edit-feedback-modal.component.scss'],
})
export class AdminEditFeedbackModalComponent implements OnInit {
  @Input() userId: number;
  @Input() showModal = false;
  @Input() isSubmitting = false;

  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();
  @Output() submitFeedback: EventEmitter<any> = new EventEmitter<any>();

  form!: FormGroup;
  view$: Observable<{ loading: boolean; feedbackOptions: any }>;

  constructor(private _store: Store<any>, private _fb: FormBuilder) {}

  get feedbacks(): FormArray {
    return this.form?.get('feedbacks') as FormArray;
  }

  get review(): AbstractControl | null {
    return this.form?.get('review');
  }

  ngOnInit(): void {
    this.form = this._fb.group({
      receiver_id: [this.userId],
      review: [null, Validators.required],
      feedbacks: this._fb.array([]),
    });

    this.view$ = combineLatest([
      this._store.select(fromCore.selectIsLoadingAdmin),
      this._store.select(fromCore.selectAdminTestimonialFeedbackOptions).pipe(
        tap((options) => {
          if (options) {
            this.feedbacks.clear();
            this.review?.setValue(options?.review);

            options?.params?.forEach((option: any) => {
              this.feedbacks.push(
                this._fb.group({
                  rating: [option.rating, Validators.required],
                  testimonial_id: [option.id, Validators.required],
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
