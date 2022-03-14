import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { combineLatest, Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

import * as fromTutor from '../../state';
import * as fromRoot from '@metutor/state';
import { IUser } from '@metutor/core/models';
import * as fromCore from '@metutor/core/state';
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
  user$: Observable<IUser | null>;
  isRejecting$: Observable<boolean>;
  showRejectCourseModal$: Observable<boolean>;
  view$: Observable<{ loading: boolean; data: any }>;

  range = '7days';
  insightRange = insightRange;

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

  onRejectCourse(form: FormGroup): void {
    this._store.dispatch(
      fromCore.tutorRejectCourse({
        reason: form.value.rejectReason,
        courseId: this.courseId,
      })
    );
  }

  ngOnInit(): void {
    this.user$ = this._store.select(fromCore.selectUser);
    this.layout$ = this._store.select(fromRoot.selectLayout);
    this.isRejecting$ = this._store.select(fromCore.selectIsRejectingCourse);

    this.showRejectCourseModal$ = this._store.select(
      fromTutor.selectRejectCourseModal
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
        endTime: '',
        startTime: '',
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
