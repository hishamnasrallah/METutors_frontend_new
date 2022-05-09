import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { combineLatest, Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

import * as moment from 'moment';
import * as fromStudent from '../../state';
import * as fromCore from '@metutor/core/state';
import * as fromStudentAction from '../../state/actions';

@Component({
  selector: 'metutors-student-class-dashboard',
  templateUrl: './student-class-dashboard.component.html',
  styleUrls: ['./student-class-dashboard.component.scss'],
  providers: [DatePipe],
})
export class StudentClassDashboardComponent implements OnInit {
  classId: number;
  timeSlots$: Observable<any>;
  refundAmount$: Observable<any>;
  price$: Observable<number | null>;
  isMakeupClass$: Observable<boolean>;
  tutorAvailability$: Observable<any>;
  isJoiningClass$: Observable<boolean>;
  isLoadingTimeSlots$: Observable<boolean>;
  isCreatingNewClass$: Observable<boolean>;
  showAddCourseModal$: Observable<boolean>;
  showAttendanceModal$: Observable<boolean>;
  showMakeupClassModal$: Observable<boolean>;
  showCancelCourseModal$: Observable<boolean>;
  showSendFeedbackModal$: Observable<boolean>;
  tutorReAssignmentModal$: Observable<boolean>;
  cancelCourseSuccessModal$: Observable<boolean>;
  isLoadingTutorAvailability$: Observable<boolean>;

  view$: Observable<{
    data: any;
    loading: boolean;
  }>;

  constructor(
    private _router: Router,
    private _store: Store<any>,
    private _datePipe: DatePipe
  ) {}

  getHours(date: string) {
    const startDate = new Date();
    const endDate = new Date(date);
    const timeDif = Math.round(
      (endDate.getTime() - startDate.getTime()) / 1000
    );

    return Math.round(timeDif / 3600);
  }

  joinClass(id: number): void {
    this._store.dispatch(fromCore.studentJoinClass({ id }));
  }

  onShowCancelCourseModal(): void {
    //todo revert it
    // this._store.dispatch(fromStudentAction.openCancelCourseModal());
    this._store.dispatch(fromStudentAction.openTutorReAssignmentModal());
  }

  onCloseCancelCourseModal(): void {
    this._store.dispatch(fromStudentAction.closeCancelCourseModal());
  }

  onShowAddCourseModal(subjectId: string): void {
    this._store.dispatch(fromStudentAction.openAddCourseModal({ subjectId }));
  }

  onCloseAddCourseModal(): void {
    this._store.dispatch(fromStudentAction.closeAddCourseModal());
  }

  onCloseTutorReAssignmentModal(): void {
    this._store.dispatch(fromStudentAction.closeTutorReAssignmentModal());
  }

  onAddCourse(id: number, value: any): void {
    const data = {
      total_hours: value.classes?.reduce(
        (sum: number, hr: any) => sum + +hr?.duration,
        0
      ),
      total_classes: value.classes?.length,
      total_price: value.totalPrice,
      classes: value.classes?.map((clss: any) => ({
        day: new Date(clss.date)?.getDay() + 1,
        date: this._datePipe.transform(new Date(clss.date), 'yyyy-MM-dd') || '',
        start_time: clss.startTime,
        end_time: clss.endTime,
        duration: clss.duration,
      })),
    };

    this._store.dispatch(fromCore.studentAddNewClass({ id, data }));
  }

  onShowSendFeedbackModal(teacherId: number): void {
    const params = { teacherId };
    this._store.dispatch(fromStudentAction.openStudentSendFeedbackModal());
    this._store.dispatch(fromStudentAction.setStudentStateParams({ params }));
  }

  onCloseFeedbackModal(): void {
    this._store.dispatch(fromStudentAction.closeStudentSendFeedbackModal());
  }

  onShowAttendanceModal(): void {
    this._store.dispatch(fromStudentAction.openStudentAttendanceModal());
  }

  onCloseAttendanceModal(): void {
    this._store.dispatch(fromStudentAction.closeStudentAttendanceModal());
  }

  onCloseMakeupClassModal(): void {
    this._store.dispatch(fromStudentAction.closeMakeupClassModal());
  }

  onOpenMakeupClassModal(previousClass: any): void {
    this.classId = previousClass.id;
    this._store.dispatch(fromCore.resetClassSlots());
    this._store.dispatch(fromStudentAction.openMakeupClassModal());
  }

  onSubmitMakeupClass(form: FormGroup): void {
    const body = {
      ...form.value,
      id: this.classId,
      start_date: moment(form.value.start_date).format('Y-MM-DD'),
    };

    this._store.dispatch(fromCore.studentMakeupClass({ body }));
  }

  onChangeDate(date: Date): void {
    const body = { date: moment(date).format('Y-MM-DD'), id: this.classId };
    this._store.dispatch(fromCore.loadMakeupClassSlots({ body }));
  }

  onTutorAvailability(id: number): void {
    this._store.dispatch(fromCore.loadTutorAvailability({ id }));
  }

  onSubmitFeedback(form: FormGroup): void {
    const body = form.value;
    this._store.dispatch(fromCore.studentSubmitFeedback({ body }));
  }

  onSubmitCancelCourse(body: any): void {
    this._store.dispatch(fromCore.studentCancelCourse({ body }));
  }

  onCancelCourseSuccess(): void {
    this._store.dispatch(fromStudentAction.closeCancelCourseSuccessModal());
    this._router.navigate(['/student/classrooms']);
  }

  ngOnInit(): void {
    this._store.dispatch(fromCore.loadStudentClassesDashboard());
    this.showAttendanceModal$ = this._store.select(
      fromStudent.selectAttendanceModal
    );

    this.showSendFeedbackModal$ = this._store.select(
      fromStudent.selectSendFeedbackModal
    );

    this.showCancelCourseModal$ = this._store.select(
      fromStudent.selectCancelCourseModal
    );

    this.showAddCourseModal$ = this._store.select(
      fromStudent.selectAddCourseModal
    );

    this.showMakeupClassModal$ = this._store.select(
      fromStudent.selectMakeupClassModal
    );

    this.isJoiningClass$ = this._store.select(fromCore.selectIsJoiningClass);

    this.timeSlots$ = this._store.select(fromCore.selectStudentTimeSlots);

    this.tutorAvailability$ = this._store.select(
      fromCore.selectTutorAvailability
    );

    this.isLoadingTutorAvailability$ = this._store.select(
      fromCore.selectIsLoadingTutorAvailability
    );

    this.isLoadingTimeSlots$ = this._store.select(
      fromCore.selectIsLoadingTimeSlots
    );

    this.isMakeupClass$ = this._store.select(
      fromCore.selectIsStudentMakeupClass
    );

    this.isCreatingNewClass$ = this._store.select(
      fromCore.selectIsCreatingNewClass
    );

    this.cancelCourseSuccessModal$ = this._store.select(
      fromStudent.selectCancelCourseSuccessModal
    );

    this.refundAmount$ = this._store.select(
      fromStudent.selectStudentStateParams
    );

    this.tutorReAssignmentModal$ = this._store.select(
      fromStudent.selectTutorReAssignmentModal
    );

    this.price$ = this._store.select(fromCore.selectEstimatedPrice);

    this.view$ = combineLatest([
      this._store.select(fromCore.selectStudentClassesDashboard),
      this._store.select(fromCore.selectIsLoadingStudentClassesDashboard),
    ]).pipe(
      map(([data, loading]) => ({
        loading,
        data,
      }))
    );
  }
}
