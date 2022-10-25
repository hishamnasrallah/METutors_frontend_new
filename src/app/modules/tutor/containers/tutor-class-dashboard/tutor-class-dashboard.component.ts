import * as moment from 'moment';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { combineLatest, Observable, tap } from 'rxjs';

import * as fromTutor from '../../state';
import * as fromCore from '@metutor/core/state';
import { Component, OnInit } from '@angular/core';
import * as fromTutorAction from '../../state/actions';
import { CourseStatus, courseStatusLabel, WEEK_DAYS_LONG } from '@config';

@Component({
  selector: 'metutors-tutor-class-dashboard',
  templateUrl: './tutor-class-dashboard.component.html',
  styleUrls: ['./tutor-class-dashboard.component.scss'],
})
export class TutorClassDashboardComponent implements OnInit {
  classId: number;
  allUpcomingClasses = [];
  allPreviousClasses = [];
  previousClasses: any[] = [];
  upcomingClasses: any[] = [];
  isLaunchingClass$: Observable<boolean>;
  isLoadingViewClass$: Observable<boolean>;
  showRescheduleModal: Observable<boolean>;
  isReschedulingClass$: Observable<boolean>;
  showCancelCourseModal$: Observable<boolean>;
  showSendFeedbackModal$: Observable<boolean>;
  showCourseAttendanceModal$: Observable<boolean>;

  courseStatus = CourseStatus;
  statusLabel = courseStatusLabel;
  subHeading = 'SHARE_FEEDBACK_STUDENT_CANCELLATION';

  view$: Observable<{
    data: any;
    loading: boolean;
  }>;

  constructor(private _store: Store<any>) {}

  launchClass(classId: number): void {
    this._store.dispatch(fromCore.tutorLaunchClass({ classId }));
  }

  getHours(date: string) {
    const startDate = new Date();
    const endDate = new Date(date);
    const timeDif = Math.round(
      (endDate.getTime() - startDate.getTime()) / 1000
    );

    return Math.round(timeDif / 3600);
  }

  onViewClass(id: number): void {
    this._store.dispatch(fromCore.studentViewClass({ id }));
  }

  onShowMorePreviousClasses(): void {
    this.previousClasses = this.allPreviousClasses.slice(
      0,
      this.previousClasses.length + 3
    );
  }

  onShowMoreUpcomingClasses(): void {
    this.upcomingClasses = this.allUpcomingClasses.slice(
      0,
      this.upcomingClasses.length + 3
    );
  }

  ngOnInit(): void {
    this._store.dispatch(fromCore.loadCourseById());

    this.isLaunchingClass$ = this._store.select(
      fromCore.selectIsLaunchingClass
    );

    this.isReschedulingClass$ = this._store.select(
      fromCore.selectIsReschedulingTutorClass
    );

    this.showCancelCourseModal$ = this._store.select(
      fromTutor.selectCancelCourseModal
    );

    this.showSendFeedbackModal$ = this._store.select(
      fromTutor.selectSendFeedbackModal
    );

    this.showCourseAttendanceModal$ = this._store.select(
      fromTutor.selectCourseAttendanceModal
    );

    this.showRescheduleModal = this._store.select(
      fromTutor.selectRescheduleClassModal
    );

    this.isLoadingViewClass$ = this._store.select(
      fromCore.selectStudentLoading
    );

    this.view$ = combineLatest([
      this._store.select(fromCore.selectCourseById).pipe(
        tap((res: any) => {
          if (res) {
            this.allPreviousClasses = res.pastClasses;
            this.allUpcomingClasses = res.upcomingClasses;
            this.previousClasses = res.pastClasses.slice(0, 3);
            this.upcomingClasses = res.upcomingClasses.slice(0, 3);
          }
        })
      ),
      this._store.select(fromCore.selectIsLoadingCourseById),
    ]).pipe(
      map(([data, loading]) => ({
        loading,
        data,
      }))
    );
  }

  onCloseCancelCourseModal(): void {
    this._store.dispatch(fromTutorAction.closeTutorCancelCourseModal());
  }

  onShowSendFeedbackModal(studentId: number): void {
    const params = { studentId, cancelCourse: true };
    this._store.dispatch(fromTutorAction.setTutorStateParams({ params }));
    this._store.dispatch(fromTutorAction.openTutorSendFeedbackModal());
  }

  onCloseSendFeedbackModal(): void {
    this._store.dispatch(fromTutorAction.closeTutorSendFeedbackModal());
  }

  onShowCourseAttendanceModal(): void {
    this._store.dispatch(fromTutorAction.openTutorCourseAttendanceModal());
  }

  onCloseCourseAttendanceModal(): void {
    this._store.dispatch(fromTutorAction.closeTutorCourseAttendanceModal());
  }

  onOpenRescheduleModal(id: number): void {
    this.classId = id;
    this._store.dispatch(fromTutorAction.openTutorRescheduleClassModal());
  }

  onCloseRescheduleModal(): void {
    this._store.dispatch(fromTutorAction.closeTutorRescheduleClassModal());
  }

  onSubmitFeedback(form: FormGroup): void {
    const body = form.value;
    this._store.dispatch(fromCore.tutorSubmitFeedback({ body }));
  }

  onCancelCourse(form: FormGroup): void {
    const reason = form.value;

    this._store.dispatch(fromCore.tutorCancelCourse({ reason }));
  }

  onSubmitRescheduleClass(form: FormGroup): void {
    const body = {
      ...form.value,
      day: WEEK_DAYS_LONG[form.value.day],
      start_date: moment(form.value.start_date).format('Y-MM-DD'),
    };

    this._store.dispatch(fromCore.tutorRescheduleClass({ body }));
  }
}
