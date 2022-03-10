import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { combineLatest, Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

import * as fromCore from '@metutor/core/state';
import { insightRange, WEEK_DAYS } from '@metutor/config';
import { IUser } from '@metutor/core/models';

@Component({
  selector: 'metutors-tutor-dashboard',
  templateUrl: './tutor-dashboard.component.html',
  styleUrls: ['./tutor-dashboard.component.scss'],
})
export class TutorDashboardComponent implements OnInit {
  user$: Observable<IUser | null>;
  view$: Observable<{ loading: boolean; data: any }>;

  range = '7days';
  insightRange = insightRange;

  constructor(private _store: Store<any>) {}

  loadDashboard(params: string): void {
    this.range = params;
    this._store.dispatch(fromCore.loadTutorDashboard({ params, load: true }));
  }

  ngOnInit(): void {
    this.user$ = this._store.select(fromCore.selectUser);
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
        (item: any) => item.status === 'success'
      );
      const remainingClasses = course.classes.filter(
        (item: any) => item.status !== 'success'
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
        endTime: '',
        startTime: '',
        hours: course.totalHours,
        name: course.courseName,
        expectedEndDate: course.endDate,
        completedClasses: completedClasses.length,
        remainingClasses: remainingClasses.length,
      };
    });
  }
}
