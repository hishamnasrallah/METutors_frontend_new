import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { combineLatest, Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import * as fromTutor from '../../state';
import * as fromCore from '@metutor/core/state';
import * as fromTutorAction from '../../state/actions';

@Component({
  selector: 'metutors-tutor-class-dashboard',
  templateUrl: './tutor-class-dashboard.component.html',
  styleUrls: ['./tutor-class-dashboard.component.scss'],
})
export class TutorClassDashboardComponent implements OnInit {
  isLaunchingClass$: Observable<boolean>;
  showCancelCourseModal$: Observable<boolean>;
  showSendFeedbackModal$: Observable<boolean>;
  showCourseAttendanceModal$: Observable<boolean>;

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

  ngOnInit(): void {
    this._store.dispatch(fromCore.loadCourseById());

    this.isLaunchingClass$ = this._store.select(
      fromCore.selectIsLaunchingClass
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

    this.view$ = combineLatest([
      this._store.select(fromCore.selectCourseById),
      this._store.select(fromCore.selectIsLoadingCourseById),
    ]).pipe(
      map(([data, loading]) => ({
        loading,
        data,
      }))
    );
  }

  onShowCancelCourseModal(): void {
    this._store.dispatch(fromTutorAction.openTutorCancelCourseModal());
  }

  onCloseCancelCourseModal(): void {
    this._store.dispatch(fromTutorAction.closeTutorCancelCourseModal());
  }

  onShowSendFeedbackModal(): void {
    this._store.dispatch(fromTutorAction.openTutorSendFeedbackModal());
  }

  onCloseSendFeedbackModal(): void {
    this._store.dispatch(fromTutorAction.closeTutorSendFeedbackModal());
  }

  onShowCourseAttendanceModal(): void {
    this._store.dispatch(
      fromTutorAction.openTutorCourseAttendanceModal({ params: '' })
    );
  }

  onCloseCourseAttendanceModal(): void {
    this._store.dispatch(fromTutorAction.closeTutorCourseAttendanceModal());
  }
}
