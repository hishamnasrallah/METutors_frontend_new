import {
  group,
  state,
  style,
  trigger,
  animate,
  transition,
} from '@angular/animations';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { combineLatest, Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

import { WEEK_DAYS } from '@metutor/config';
import * as fromCore from '@metutor/core/state';

@Component({
  selector: 'metutors-tutor-classrooms',
  templateUrl: './tutor-classrooms.component.html',
  styleUrls: ['./tutor-classrooms.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('in', style({ height: '*', opacity: 0 })),
      transition(':leave', [
        style({ height: '*', opacity: 1 }),

        group([
          animate(300, style({ height: 0 })),
          animate('200ms ease-in-out', style({ opacity: '0' })),
        ]),
      ]),
      transition(':enter', [
        style({ height: '0', opacity: 0 }),

        group([
          animate(300, style({ height: '*' })),
          animate('400ms ease-in-out', style({ opacity: '1' })),
        ]),
      ]),
    ]),
  ],
})
export class TutorClassroomsComponent implements OnInit {
  openActive = true;
  openCompleted = true;
  openNewlyAssigned = true;

  view$: Observable<{
    loading: boolean;
    newCourses: any;
    activeCourses: any;
    completedCourses: any;
  }>;

  constructor(private _store: Store<any>) {}

  ngOnInit(): void {
    this._store.dispatch(fromCore.loadCourses());

    this.view$ = combineLatest([
      this._store
        .select(fromCore.selectNewCourses)
        .pipe(map((result: any) => this._parseCourse(result))),
      this._store
        .select(fromCore.selectActiveCourses)
        .pipe(map((result: any) => this._parseCourse(result))),
      this._store
        .select(fromCore.selectCompletedCourses)
        .pipe(map((result: any) => this._parseCourse(result))),
      this._store.select(fromCore.selectIsLoadingCourses),
    ]).pipe(
      map(([newCourses, activeCourses, completedCourses, loading]) => ({
        loading,
        newCourses,
        activeCourses,
        completedCourses,
      }))
    );
  }

  private _parseCourse(courses: any): any {
    return courses?.map((course: any) => {
      /* const completedClasses = course.classes.filter(
        (item: any) => item.status === 'success'
      );
      const remainingClasses = course.classes.filter(
        (item: any) => item.status !== 'success'
      );*/

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
        completedClasses: 0,
        remainingClasses: 0,
        name: course.courseName,
        hours: course.totalHours,
        expectedEndDate: course.endDate,
      };
    });
  }
}
