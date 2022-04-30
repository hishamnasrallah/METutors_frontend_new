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
  hasSelectedClasses: boolean;
  subHeading = 'Select an option';
  selectedClasses: number[] = [];
  isCanceling$: Observable<boolean>;

  view$: Observable<{ loading: boolean; refund: any }>;

  constructor(private _store: Store<any>, private _formBuilder: FormBuilder) {}

  onClassSelect(event: any, id: number): void {
    if (event?.checked) {
      this.selectedClasses.push(id);
    } else {
      this.selectedClasses.splice(this.selectedClasses.indexOf(id), 1);
    }

    console.log(this.selectedClasses);
  }

  goBack(): void {
    this.courseType = -1;
    this.heading = 'Cancel Course';
    this.hasSelectedClasses = false;
    this.subHeading = 'Select an option';
    this.form.get('courseType')?.setValue(null);
  }

  onNextSelectedClassRefund(): void {
    this.hasSelectedClasses = true;
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
      this.heading = 'Cancel Course';
      this.subHeading = 'Select an option';
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
      reason: [null, [Validators.required, Validators.minLength(10)]],
    });

    this.form.valueChanges.subscribe(() => console.log(this.form));
  }
}
