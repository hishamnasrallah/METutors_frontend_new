import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { combineLatest, Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

import { IClassroom } from '@models';
import * as fromCore from '@metutor/core/state';
import { ClassroomType, insightRange, WEEK_DAYS } from '@metutor/config';

@Component({
  selector: 'metutors-tutor-dashboard',
  templateUrl: './tutor-dashboard.component.html',
  styleUrls: ['./tutor-dashboard.component.scss'],
})
export class TutorDashboardComponent implements OnInit {
  range = '7days';
  insightRange = insightRange;
  rate = 4;

  view$: Observable<{ loading: boolean; data: any }>;

  classroom: IClassroom = {
    id: 1,
    startDate: '2022-12-12',
    expectedEndDate: '2022-12-30',
    name: 'Python for Data Science and Machine Learning Boo …',
    type: ClassroomType.one,
    listDays: ['Fri', 'Sat', 'Sun'],
    completedClasses: 10,
    totalHours: 30,
    startETime: new Date(),
    endETime: new Date(),
    remainingClasses: 10,
    progress: 30,
    enrolledStudents: [
      {
        id: 1,
        avatar: 'https://logo.clearbit.com/tarjama.com',
      },
      {
        id: 2,
        avatar: 'https://logo.clearbit.com/noon.ae',
      },
      {
        id: 3,
        avatar: 'https://logo.clearbit.com/tamatem.co',
      },
      {
        id: 4,
        avatar: '',
      },
    ],
  };

  constructor(private _store: Store<any>) {}

  loadDashboard(params: string): void {
    this.range = params;
    this._store.dispatch(fromCore.loadTutorDashboard({ params, load: true }));
  }

  ngOnInit(): void {
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
        startETime: '',
        endETime: '',
        name: course.courseName,
        startDate: '2022-02-28T20:15:52.000000Z',
        expectedEndDate: '2022-03-28T20:15:52.000000Z',
        completedClasses: completedClasses.length,
        remainingClasses: remainingClasses.length,
      };
    });
  }
}
