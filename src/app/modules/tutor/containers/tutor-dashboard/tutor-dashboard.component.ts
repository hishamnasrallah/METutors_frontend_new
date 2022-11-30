import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import * as fromTutor from '../../state';
import { FormGroup } from '@angular/forms';
import * as fromRoot from '@metutor/state';
import { IUser } from '@metutor/core/models';
import * as fromCore from '@metutor/core/state';
import { combineLatest, Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import * as fromTutorAction from '../../state/actions';
import { insightRange, WEEK_DAYS } from '@metutor/config';

@Component({
  selector: 'metutors-tutor-dashboard',
  templateUrl: './tutor-dashboard.component.html',
  styleUrls: ['./tutor-dashboard.component.scss'],
})
export class TutorDashboardComponent implements OnInit {
  layout$: any;
  courseId: number;
  kudosPoints$: Observable<any>;
  user$: Observable<IUser | null>;
  isRejecting$: Observable<boolean>;
  isAccepting$: Observable<boolean>;
  isLaunchingClass$: Observable<boolean>;
  isLoadingKudosPoints$: Observable<boolean>;
  showKudosPointsModal$: Observable<boolean>;
  showSendFeedbackModal$: Observable<boolean>;
  showRejectCourseModal$: Observable<boolean>;
  view$: Observable<{ loading: boolean; data: any }>;

  range = '7days';
  heading = 'LEAVE_FEEDBACK';
  insightRange = insightRange;
  tabLabel = 'METUTORS_FEEDBACK';
  subHeading = 'SHARE_FEEDBACK_METUTORS_SERVICE';
  messageLabel = 'SHARE_THOUGHTS_IMPROVE_SERVICES';

  constructor(private _store: Store<any>) {}

  loadDashboard(params: string): void {
    this.range = params;
    this._store.dispatch(fromCore.loadTutorDashboard({ params, load: true }));
  }

  onOpenRejectCourse(id: number) {
    this.courseId = id;
    this._store.dispatch(fromTutorAction.openTutorRejectCourseModal());
  }

  onCloseRejectCourse() {
    this._store.dispatch(fromTutorAction.closeTutorRejectCourseModal());
  }

  launchClass(classId: number): void {
    this._store.dispatch(fromCore.tutorLaunchClass({ classId }));
  }

  onAcceptCourse(courseId: number): void {
    this._store.dispatch(
      fromCore.tutorAcceptCourse({
        courseId,
      })
    );
  }

  onRejectCourse(form: FormGroup): void {
    this._store.dispatch(
      fromCore.tutorRejectCourse({
        reason: form.value.rejectReason,
        courseId: this.courseId,
      })
    );
  }

  onShowSendFeedbackModal(): void {
    this._store.dispatch(fromTutorAction.openTutorSendPlatformFeedbackModal());
  }

  onCloseSendFeedbackModal(): void {
    this._store.dispatch(fromTutorAction.closeTutorSendPlatformFeedbackModal());
  }

  onSubmitFeedback(form: FormGroup): void {
    const body = form.value;
    this._store.dispatch(fromCore.tutorSubmitPlatformFeedback({ body }));
  }

  onOpenKudosPointsModal(): void {
    this._store.dispatch(fromTutorAction.openKudosPointsModal());
  }

  onCloseKudosPointsModal(): void {
    this._store.dispatch(fromTutorAction.closeKudosPointsModal());
  }

  logout(): void {
    this._store.dispatch(fromCore.logout());
  }

  ngOnInit(): void {
    this.user$ = this._store.select(fromCore.selectUser);
    this.layout$ = this._store.select(fromRoot.selectLayout);
    this.isRejecting$ = this._store.select(fromCore.selectIsRejectingCourse);
    this.isAccepting$ = this._store.select(fromCore.selectIsAcceptingCourse);
    this.isLaunchingClass$ = this._store.select(
      fromCore.selectIsLaunchingClass
    );

    this.showRejectCourseModal$ = this._store.select(
      fromTutor.selectRejectCourseModal
    );

    this.showSendFeedbackModal$ = this._store.select(
      fromTutor.selectSendFeedbackModal
    );

    this.kudosPoints$ = this._store.select(fromCore.selectTutorKudosPoints);

    this.isLoadingKudosPoints$ = this._store.select(
      fromCore.selectIsLoadingTutorKudosPoints
    );

    this.showKudosPointsModal$ = this._store.select(
      fromTutor.selectKudosPointsModal
    );

    this._store.dispatch(
      fromCore.loadTutorDashboard({ params: this.range, load: false })
    );

    const dashboard$ = this._store.select(fromCore.selectTutorDashboard).pipe(
      map((result: any) => {
        return {
          ...result,
          courses: this._parseCourse(result?.newlyAssignedCourses),
        };
      })
    );

    this.view$ = combineLatest([
      dashboard$,
      this._store.select(fromCore.selectIsLoadingTutorDashboard),
    ]).pipe(
      map(([data, loading]) => ({
        data,
        loading,
      }))
    );
  }

  private _parseCourse(courses: any): any {
    return courses?.map((course: any) => {
      const completedClasses = course.classes.filter(
        (item: any) => item.status === 'completed'
      );
      const remainingClasses = course.classes.filter(
        (item: any) => item.status !== 'completed'
      );

      const listDays: any = [];
      const splitDays = course.weekdays.split(',');

      if (splitDays.length) {
        splitDays.forEach((day: any) => listDays.push(WEEK_DAYS[day]));
      }
      return {
        ...course,
        type: 1,
        listDays,
        hours: course.totalHours,
        name: course.courseName,
        expectedEndDate: course.endDate,
        enrolledStudents: [course.student],
        completedClasses: completedClasses.length,
        remainingClasses: remainingClasses.length,
        progress: (completedClasses.length / course.classes.length) * 100,
      };
    });
  }
}
