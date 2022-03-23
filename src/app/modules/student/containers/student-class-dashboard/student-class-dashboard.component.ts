import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { combineLatest, Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

import * as fromCore from '@metutor/core/state';

@Component({
  selector: 'metutors-student-class-dashboard',
  templateUrl: './student-class-dashboard.component.html',
  styleUrls: ['./student-class-dashboard.component.scss'],
})
export class StudentClassDashboardComponent implements OnInit {
  showAttendanceModal = false;
  showFeedbackModal = false;
  openLeaveFeedbackPopop = false;
  openClassroomAttendancesPopop = false;

  isJoiningClass$: Observable<boolean>;

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

  joinClass(classId: number): void {
    console.log(classId);
  }

  onShowCancelCourseModal(): void {}

  onShowSendFeedbackModal(): void {}

  onShowCourseAttendanceModal(): void {}

  ngOnInit(): void {
    this._store.dispatch(fromCore.loadCourseById());

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
}
