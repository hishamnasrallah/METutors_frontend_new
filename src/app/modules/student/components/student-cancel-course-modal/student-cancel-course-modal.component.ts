import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Observable, combineLatest } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import * as fromCore from '@metutor/core/state';

@Component({
  selector: 'metutors-student-cancel-course-modal',
  templateUrl: './student-cancel-course-modal.component.html',
  styleUrls: ['./student-cancel-course-modal.component.scss'],
})
export class StudentCancelCourseModalComponent implements OnInit {
  @Input() showModal: boolean = false;

  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();
  @Output() submitted: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  form: FormGroup;
  courseType = -1;
  heading = 'Cancel Course';
  subHeading = 'Select an option';
  isCanceling$: Observable<boolean>;

  view$: Observable<{ loading: boolean; refund: any }>;

  constructor(private _store: Store<any>, private _formBuilder: FormBuilder) {}

  goBack(): void {
    this.courseType = -1;
    this.form.get('courseType')?.setValue(null);
  }

  onCourseClassTypeSelect(courseType: any): void {
    this.courseType = courseType;

    if (courseType === 1) {
      this.heading = 'Cancel / Refund Course';
      this.subHeading = 'Please confirm you want to cancel these classes';

      this._store.dispatch(
        fromCore.studentRefundCourse({ refundType: 'complete_course' })
      );
    } else {
      this._store.dispatch(
        fromCore.studentRefundCourse({ refundType: 'selected_classes' })
      );
    }
  }

  ngOnInit(): void {
    this.isCanceling$ = this._store.select(fromCore.selectIsCancelingCourse);

    this.view$ = combineLatest([
      this._store.select(fromCore.selectStudentCourseRefund),
      this._store.select(fromCore.selectIsLoadingRefundCourse),
    ]).pipe(map(([refund, loading]) => ({ refund, loading })));

    this.form = this._formBuilder.group({
      courseType: [null],
      agree: [null, Validators.required],
      academic_classes: [null, Validators.required],
      reason: [null, [Validators.required, Validators.minLength(10)]],
    });

    this.form.valueChanges.subscribe(() => console.log(this.form));
  }
}
