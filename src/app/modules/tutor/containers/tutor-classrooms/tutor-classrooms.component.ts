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
import { FormGroup } from '@angular/forms';
import { combineLatest, Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import * as fromRoot from '@metutor/state';
import { generalConstants, WEEK_DAYS } from '@metutor/config';
import { IUser } from '@metutor/core/models';
import * as fromCore from '@metutor/core/state';
import * as fromTutor from '@metutor/modules/tutor/state';
import * as fromTutorAction from '@metutor/modules/tutor/state/actions';

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
  layout$: any;
  user$: Observable<IUser | null>;
  isRejecting$: Observable<boolean>;
  isAccepting$: Observable<boolean>;
  showRejectCourseModal$: Observable<boolean>;
  view$: Observable<{
    programs: any;
    newCourses: any;
    countries: any;
    loading: boolean;
    fieldOfStudies: any;
    activeCourses: any;
    completedCourses: any;
    cancelledCourses: any;
  }>;

  fieldId = null;
  courseId: number;
  programId = null;
  countryId = null;
  openActive = true;
  openCompleted = true;
  openNewlyAssigned = true;
  nationalId = generalConstants.nationalId;

  constructor(private _store: Store<any>) {}

  loadCourse(params: any) {
    if (this.countryId) {
      params = {
        ...params,
        country: this.countryId,
      };
    }
    this._store.dispatch(fromCore.loadCourses({ params }));
  }

  onOpenRejectCourse(id: number) {
    this.courseId = id;
    this._store.dispatch(fromTutorAction.openTutorRejectCourseModal());
  }

  onCloseRejectCourse() {
    this._store.dispatch(fromTutorAction.closeTutorRejectCourseModal());
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

  logout(): void {
    this._store.dispatch(fromCore.logout());
  }

  ngOnInit(): void {
    this._store.dispatch(fromCore.loadProgramCountries());
    this.layout$ = this._store.select(fromRoot.selectLayout);
    this.user$ = this._store.select(fromCore.selectUser);
    this._store.dispatch(fromCore.loadCourses({}));
    this.isRejecting$ = this._store.select(fromCore.selectIsRejectingCourse);
    this.isAccepting$ = this._store.select(fromCore.selectIsAcceptingCourse);

    this.showRejectCourseModal$ = this._store.select(
      fromTutor.selectRejectCourseModal
    );

    this.view$ = combineLatest([
      this._store.select(fromCore.selectProgramCountries),
      this._store.select(fromCore.selectCoursePrograms),
      this._store.select(fromCore.selectCourseFieldOfStudies),
      this._store
        .select(fromCore.selectNewCourses)
        .pipe(map((result: any) => this._parseCourse(result))),
      this._store
        .select(fromCore.selectActiveCourses)
        .pipe(map((result: any) => this._parseCourse(result))),
      this._store
        .select(fromCore.selectCompletedCourses)
        .pipe(map((result: any) => this._parseCourse(result))),
      this._store
        .select(fromCore.selectCancelledCourses)
        .pipe(map((result: any) => this._parseCourse(result))),
      this._store.select(fromCore.selectIsLoadingCourses),
    ]).pipe(
      map(
        ([
          countries,
          programs,
          fieldOfStudies,
          newCourses,
          activeCourses,
          completedCourses,
          cancelledCourses,
          loading,
        ]) => ({
          loading,
          programs,
          countries,
          newCourses,
          activeCourses,
          fieldOfStudies,
          cancelledCourses,
          completedCourses,
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
        name: course.courseName,
        hours: course.totalHours,
        enrolledStudents: [course.student],
        completedClasses: completedClasses?.length,
        remainingClasses: remainingClasses?.length,
        progress: (completedClasses.length / course.classes.length) * 100,
      };
    });
  }
}
