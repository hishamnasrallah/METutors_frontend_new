import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { combineLatest, Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

import * as fromCore from '@metutor/core/state';

@Component({
  selector: 'metutors-tutor-class-dashboard',
  templateUrl: './tutor-class-dashboard.component.html',
  styleUrls: ['./tutor-class-dashboard.component.scss'],
})
export class TutorClassDashboardComponent implements OnInit {
  showFeedbackModal = false;
  showAttendanceModal = false;

  isLaunchingClass$: Observable<boolean>;

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
