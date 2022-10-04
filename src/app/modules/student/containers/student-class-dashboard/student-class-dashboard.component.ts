import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { combineLatest, Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

import * as moment from 'moment';
import * as fromStudent from '../../state';
import { environment } from '@environment';
import * as fromCore from '@metutor/core/state';
import { IInvoiceDetails, IUser } from '@models';
import * as fromStudentAction from '../../state/actions';
import { CourseStatus, courseStatusLabel } from '@metutor/config';

@Component({
  selector: 'metutors-student-class-dashboard',
  templateUrl: './student-class-dashboard.component.html',
  styleUrls: ['./student-class-dashboard.component.scss'],
})
export class StudentClassDashboardComponent implements OnInit {
  classId: number;
  timeSlots$: Observable<any>;
  paymentInfo$: Observable<any>;
  refundAmount$: Observable<any>;
  user$: Observable<IUser | null>;
  price$: Observable<number | null>;
  isMakeupClass$: Observable<boolean>;
  tutorAvailability$: Observable<any>;
  isJoiningClass$: Observable<boolean>;
  showPaymentModal$: Observable<boolean>;
  isGetInvoiceEmail$: Observable<boolean>;
  isLoadingViewClass$: Observable<boolean>;
  isLoadingTimeSlots$: Observable<boolean>;
  isCreatingNewClass$: Observable<boolean>;
  showAddCourseModal$: Observable<boolean>;
  showAttendanceModal$: Observable<boolean>;
  showMakeupClassModal$: Observable<boolean>;
  showCancelCourseModal$: Observable<boolean>;
  showSendFeedbackModal$: Observable<boolean>;
  tutorReAssignmentModal$: Observable<boolean>;
  cancelCourseSuccessModal$: Observable<boolean>;
  isCalculateInvoiceDetails$: Observable<boolean>;
  isLoadingTutorAvailability$: Observable<boolean>;
  invoiceDetails$: Observable<IInvoiceDetails | null>;

  onHold = false;
  cancelCourse = false;
  feedbackSubHeading: string;
  courseStatus = CourseStatus;
  statusLabel = courseStatusLabel;
  baseURL = environment.clientUrl;
  imageURL = environment.imageURL;

  view$: Observable<{
    data: any;
    loading: boolean;
  }>;

  constructor(private _router: Router, private _store: Store<any>) {}

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

  onCalculateInvoice(subject_id: number, value: any): void {
    const classes = {
      subject_id,
      classes: this._getClasses(value.classes),
    };

    this._store.dispatch(fromCore.calculateFinalInvoice({ classes }));
  }

  onAddCourse(course_id: number, value: any): void {
    const data = {
      course_id,
      total_price: value.totalPrice,
      total_classes: value.classes?.length,
      classes: this._getClasses(value.classes),
      redirect_url: this.baseURL + '/requests/payment-processing',
      total_hours: value.classes?.reduce(
        (sum: number, hr: any) => sum + +hr?.duration,
        0
      ),
    };

    this._store.dispatch(fromCore.studentAddNewClass({ data }));
  }

  onShowSendFeedbackModal(
    teacherId: number,
    cancelCourse: boolean,
    onHold: boolean
  ): void {
    this.onHold = onHold;
    this.cancelCourse = cancelCourse;
    this.feedbackSubHeading = cancelCourse
      ? 'Share with us a feedback on your tutor as course cancellation has begun'
      : 'Share with us your feedback on your teacher';
    const params = { teacherId };
    this._store.dispatch(fromStudentAction.openStudentSendFeedbackModal());
    this._store.dispatch(fromStudentAction.setStudentStateParams({ params }));
  }

  getInvoiceEmail(user: IUser, info: IInvoiceDetails): void {
    this._store.dispatch(
      fromCore.getInvoiceEmail({
        info: {
          ...info,
          email: user.email,
        },
      })
    );
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
    const onHold = this.onHold;
    const cancelCourse = this.cancelCourse;
    const body = form.value;
    this._store.dispatch(
      fromCore.studentSubmitFeedback({ body, cancelCourse, onHold })
    );
  }

  onSubmitCancelCourse(body: any): void {
    this._store.dispatch(fromCore.studentCancelCourse({ body }));
  }

  onCancelCourseSuccess(): void {
    this._store.dispatch(fromStudentAction.closeCancelCourseSuccessModal());
    this._router.navigate(['/student/classrooms']);
  }

  onViewClass(id: number): void {
    this._store.dispatch(fromCore.studentViewClass({ id }));
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

    this.isGetInvoiceEmail$ = this._store.select(
      fromCore.selectIsGetInvoiceEmail
    );

    this.user$ = this._store.select(fromCore.selectUser);

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

    this.isLoadingViewClass$ = this._store.select(
      fromCore.selectStudentLoading
    );

    this.price$ = this._store.select(fromCore.selectEstimatedPrice);

    this.invoiceDetails$ = this._store.select(fromCore.selectInvoiceDetails);
    this.isCalculateInvoiceDetails$ = this._store.select(
      fromCore.selectIsCalculateFinalInvoice
    );

    this.showPaymentModal$ = this._store.select(fromStudent.selectPaymentModal);

    this.paymentInfo$ = this._store.select(fromCore.selectRequestPaymentInfo);

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

  private _getClasses(classes: any): any {
    return classes?.map((clss: any) => ({
      day: new Date(clss.date)?.getDay() + 1,
      date: new Date(clss.date)?.toISOString(),
      start_time: new Date(
        Date.parse(clss.date + ' ' + clss.startTime)
      )?.toISOString(),
      end_time: new Date(
        Date.parse(clss.date + ' ' + clss.endTime)
      )?.toISOString(),
      duration: clss.duration,
    }));
  }
}
