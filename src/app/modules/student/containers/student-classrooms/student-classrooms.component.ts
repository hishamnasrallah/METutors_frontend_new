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

import { generalConstants, WEEK_DAYS } from '@config';
import * as fromRoot from '@metutor/state';
import { IUser } from '@metutor/core/models';
import * as fromCore from '@metutor/core/state';

@Component({
  selector: 'metutors-student-classrooms',
  templateUrl: './student-classrooms.component.html',
  styleUrls: ['./student-classrooms.component.scss'],
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
export class StudentClassroomsComponent implements OnInit {
  layout$: any;
  user$: Observable<IUser | null>;

  fieldId = null;
  courseId: number;
  programId = null;
  countryId = null;
  openActive = true;
  openCompleted = true;
  openNewlyAssigned = true;
  nationalId = generalConstants.nationalId;

  view$: Observable<{
    programs: any;
    countries: any;
    loading: boolean;
    activeCourses: any;
    fieldOfStudies: any;
    completedCourses: any;
    lastActivityCourse: any;
  }>;

  constructor(private _store: Store<any>) {}

  loadClassroom(params: any) {
    if (this.countryId) {
      params = {
        ...params,
        country: this.countryId,
      };
    }
    this._store.dispatch(fromCore.loadStudentClassroom({ params }));
  }

  ngOnInit(): void {
    this.user$ = this._store.select(fromCore.selectUser);
    this.layout$ = this._store.select(fromRoot.selectLayout);

    this._store.dispatch(fromCore.loadCountries());
    this._store.dispatch(fromCore.loadStudentClassroom({}));

    this.view$ = combineLatest([
      this._store.select(fromCore.selectCountries),
      this._store.select(fromCore.selectClassroomCoursePrograms),
      this._store.select(fromCore.selectClassroomCourseFieldOfStudies),
      this._store
        .select(fromCore.selectClassroomLastActivityCourse)
        .pipe(map((result: any) => this._parseCourse(result))),
      this._store
        .select(fromCore.selectActiveClassroomCourses)
        .pipe(map((result: any) => this._parseCourse(result))),
      this._store
        .select(fromCore.selectCompletedClassroomCourses)
        .pipe(map((result: any) => this._parseCourse(result))),
      this._store.select(fromCore.selectIsLoadingStudentClassroom),
    ]).pipe(
      map(
        ([
          countries,
          programs,
          fieldOfStudies,
          lastActivityCourse,
          activeCourses,
          completedCourses,
          loading,
        ]) => ({
          loading,
          programs,
          countries,
          activeCourses,
          fieldOfStudies,
          completedCourses,
          lastActivityCourse,
        })
      )
    );
  }

  private _parseCourse(courses: any): any {
    return courses?.map((course: any) => {
      const completedClasses = course?.classes.filter(
        (item: any) => item.status === 'completed'
      );
      const remainingClasses = course?.classes.filter(
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
        endTime: '',
        startTime: '',
        name: course.courseName,
        teacher: course.teacher,
        hours: course.totalHours,
        enrolledStudents: [course.student],
        completedClasses: completedClasses?.length,
        remainingClasses: remainingClasses?.length,
        progress: (completedClasses.length / course.classes.length) * 100,
      };
    });
  }
}
