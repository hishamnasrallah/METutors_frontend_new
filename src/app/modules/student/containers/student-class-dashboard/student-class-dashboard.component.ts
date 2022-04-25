import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { combineLatest, Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

import * as fromStudent from '../../state';
import * as fromCore from '@metutor/core/state';
import * as fromStudentAction from '../../state/actions';

@Component({
  selector: 'metutors-student-class-dashboard',
  templateUrl: './student-class-dashboard.component.html',
  styleUrls: ['./student-class-dashboard.component.scss'],
})
export class StudentClassDashboardComponent implements OnInit {
  isJoiningClass$: Observable<boolean>;
  showAttendanceModal$: Observable<boolean>;
  showMakeupClassModal$: Observable<boolean>;
  showCancelCourseModal$: Observable<boolean>;
  showSendFeedbackModal$: Observable<boolean>;

  view$: Observable<{
    data: any;
    loading: boolean;
  }>;

  constructor(private _store: Store<any>) {}

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
    this._store.dispatch(fromStudentAction.openCancelCourseModal());
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

  onOpenMakeupClassModal(): void {
    this._store.dispatch(fromStudentAction.openMakeupClassModal());
  }

  onSubmitMakeupClass(form: FormGroup): void {}

  onSubmitFeedback(form: FormGroup): void {
    const body = form.value;
    this._store.dispatch(fromCore.studentSubmitFeedback({ body }));
  }

  onSubmitCancelCourse(form: FormGroup): void {
    const reason = form.value;
    this._store.dispatch(fromCore.studentCancelCourse({ reason }));
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

    this.showMakeupClassModal$ = this._store.select(
      fromStudent.selectMakeupClassModal
    );

    this.isJoiningClass$ = this._store.select(fromCore.selectIsJoiningClass);

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
