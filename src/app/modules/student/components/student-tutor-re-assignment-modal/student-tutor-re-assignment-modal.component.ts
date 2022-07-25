import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { combineLatest, Observable, tap } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { ITutor } from '@models';
import * as fromCore from '@metutor/core/state';
import * as fromStudentAction from '@metutor/modules/student/state/actions';

@Component({
  selector: 'metutors-student-tutor-re-assignment-modal',
  templateUrl: './student-tutor-re-assignment-modal.component.html',
  styleUrls: ['./student-tutor-re-assignment-modal.component.scss'],
})
export class StudentTutorReAssignmentModalComponent implements OnInit {
  @Input() courseId: number;
  @Input() showModal: boolean = false;

  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  next: boolean;
  form: FormGroup;
  showHeader = true;
  selectedTutor: number;
  selectedOption: number;
  heading = 'Tutor Re-Assignment';
  subHeading =
    'Due to unforeseen reasons, your tutor can not continue teaching this course, kindly choose a preferred option to continue.';

  isCanceling$: Observable<boolean>;
  loadingTutors$: Observable<boolean>;
  tutors$: Observable<ITutor[] | null>;
  reassigningTutor$: Observable<boolean>;
  view$: Observable<{ loading: boolean; refund: any }>;

  constructor(
    private _router: Router,
    private _fb: FormBuilder,
    private _store: Store<any>
  ) {}

  goToDashboard(): void {
    this.closeModal.emit();
    this._router.navigate(['/student/classrooms']);
  }

  onTutorSelect(event: any): void {
    this.selectedTutor = event.value;
  }

  onChange(event: any): void {
    this.selectedOption = event.value;
  }

  onReassignTutor(): void {
    const body = { teacher_id: this.selectedTutor };
    this._store.dispatch(fromCore.studentReassignTutor({ body }));
  }

  onBack(): void {
    this.next = false;
    this.selectedOption = 0;
    this.heading = 'Tutor Re-Assignment';
    this.subHeading =
      'Due to unforeseen reasons, your tutor can not continue teaching this course, kindly choose a preferred option to continue.';
  }

  onNext(): void {
    this.next = true;

    if (this.selectedOption === 1) {
      this.showHeader = true;
      this.heading = 'Select a Replacement Tutor';
      this.subHeading = 'Please select a new tutor to continue your course';
      this._store.dispatch(fromCore.loadAvailableTutors({ id: this.courseId }));
    } else if (this.selectedOption === 2) {
      this.subHeading = '-';
      this.showHeader = false;
      this._store.dispatch(fromCore.studentRequestAdminAssignTutor());
    } else if (this.selectedOption === 3) {
      this.showHeader = true;
      this.heading = 'Cancel / Refund Course';
      this.subHeading = 'Please confirm you want to cancel these classes';

      this._store.dispatch(
        fromCore.studentRefundCourse({ refundType: 'complete_course' })
      );
    }
  }

  onSubmitCancelCourse(form: FormGroup, refundAmount: number): void {
    const params = { refundAmount };
    this._store.dispatch(fromStudentAction.setStudentStateParams({ params }));
    const { reason, ...rest } = form.value;

    let body: any = {
      reason,
      is_complete: true,
    };

    this._store.dispatch(fromCore.studentCancelCourse({ body }));
  }

  ngOnInit(): void {
    this.isCanceling$ = this._store.select(fromCore.selectIsCancelingCourse);
    this.reassigningTutor$ = this._store.select(
      fromCore.selectIsReassigningTutor
    );

    this.view$ = combineLatest([
      this._store.select(fromCore.selectStudentCourseRefund),
      this._store.select(fromCore.selectIsLoadingRefundCourse),
    ]).pipe(map(([refund, loading]) => ({ refund, loading })));

    this.tutors$ = this._store.select(fromCore.selectAvailableTutors);
    this.loadingTutors$ = this._store.select(
      fromCore.selectIsLoadingAvailableTutors
    );

    this.form = this._fb.group({
      agree: [null, Validators.required],
      reason: [null, [Validators.required, Validators.minLength(10)]],
    });
  }
}
