import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError, withLatestFrom } from 'rxjs/operators';

import { selectCourses } from '..';
import { CourseStatus } from '@config';
import camelcaseKeys from 'camelcase-keys';
import { CoursesService } from '@services';
import * as fromRouterStore from '@metutor/state';
import * as courseActions from '../actions/course.actions';
import { AlertNotificationService } from '@metutor/core/components';

@Injectable()
export class CourseEffects {
  loadCourses$ = createEffect(() =>
    this._actions$.pipe(
      ofType(courseActions.loadCourses),
      withLatestFrom(this._store.select(selectCourses)),
      mergeMap(([{ params }, _courses]) => {
        if (!_courses || !_courses.length) {
          return this._courseService.loadCourses(params).pipe(
            map((courses) =>
              courseActions.loadCoursesSuccess({
                courses: camelcaseKeys(courses, { deep: true }),
              })
            ),
            catchError((error) =>
              of(
                courseActions.loadCoursesFailure({
                  error: error?.error?.message || error?.error?.errors,
                })
              )
            )
          );
        } else {
          return of(courseActions.loadCoursesEnded());
        }
      })
    )
  );

  loadCourseById$ = createEffect(() =>
    this._actions$.pipe(
      ofType(courseActions.loadCourseById),
      withLatestFrom(this._store.select(fromRouterStore.selectRouteParams)),
      mergeMap(([_, { id }]) =>
        this._courseService.getCourseById(id).pipe(
          map((course) =>
            courseActions.loadCourseByIdSuccess({
              course: camelcaseKeys(course, { deep: true }),
            })
          ),
          catchError((error) =>
            of(
              courseActions.loadCourseByIdFailure({
                error: error?.error?.message || error?.error?.errors,
              })
            )
          )
        )
      )
    )
  );

  exploreCourses$ = createEffect(() =>
    this._actions$.pipe(
      ofType(courseActions.exploreCourses),
      withLatestFrom(
        this._store.select(fromRouterStore.selectRouteParams),
        this._store.select(fromRouterStore.selectQueryParams)
      ),
      mergeMap(([_, { programId }, { country }]) =>
        this._courseService.loadExploredCourses(programId, country).pipe(
          map((courses) =>
            courseActions.exploreCoursesSuccess({
              exploredCourses: camelcaseKeys(courses, { deep: true }),
            })
          ),
          catchError((error) =>
            of(
              courseActions.exploreCoursesFailure({
                error: error?.error?.message || error?.error?.errors,
              })
            )
          )
        )
      )
    )
  );

  acceptCourse$ = createEffect(() =>
    this._actions$.pipe(
      ofType(courseActions.tutorAcceptCourse),
      mergeMap(({ courseId }) =>
        this._courseService.acceptCourse({ courseId }).pipe(
          map(() =>
            courseActions.tutorAcceptCourseSuccess({
              courseId,
              message: 'Course has been successfully accepted',
            })
          ),
          catchError((error) =>
            of(
              courseActions.tutorAcceptCourseFailure({
                error: error?.error?.message || error?.error?.errors,
              })
            )
          )
        )
      )
    )
  );

  rejectCourse$ = createEffect(() =>
    this._actions$.pipe(
      ofType(courseActions.tutorRejectCourse),
      mergeMap(({ reason, courseId }) =>
        this._courseService.rejectCourse({ reason, courseId }).pipe(
          map(() =>
            courseActions.tutorRejectCourseSuccess({
              courseId,
              message: 'Course has been successfully rejected',
            })
          ),
          catchError((error) =>
            of(
              courseActions.tutorRejectCourseFailure({
                error: error?.error?.message || error?.error?.errors,
              })
            )
          )
        )
      )
    )
  );

  // Cancel course
  tutorCancelCourse$ = createEffect(() =>
    this._actions$.pipe(
      ofType(courseActions.tutorCancelCourse),
      withLatestFrom(this._store.select(fromRouterStore.selectRouteParams)),
      mergeMap(([{ reason }, { id }]) =>
        this._courseService.tutorCancelCourse(reason, id).pipe(
          map(() =>
            courseActions.tutorCancelCourseSuccess({
              message: 'Course has been successfully canceled',
            })
          ),
          catchError((error) =>
            of(
              courseActions.tutorCancelCourseFailure({
                error: error?.error?.message || error?.error?.errors,
              })
            )
          )
        )
      )
    )
  );

  studentCourseRefund$ = createEffect(() =>
    this._actions$.pipe(
      ofType(courseActions.studentRefundCourse),
      withLatestFrom(this._store.select(fromRouterStore.selectRouteParams)),
      mergeMap(([{ refundType }, { id }]) =>
        this._courseService.getCourseRefund(id, refundType).pipe(
          map((courseRefund) =>
            courseActions.studentRefundCourseSuccess({
              courseRefund: camelcaseKeys(courseRefund, { deep: true }),
            })
          ),
          catchError((error) =>
            of(
              courseActions.studentRefundCourseFailure({
                error: error?.error?.message || error?.error?.errors,
              })
            )
          )
        )
      )
    )
  );

  studentCourseClassRefund$ = createEffect(() =>
    this._actions$.pipe(
      ofType(courseActions.studentRefundCourseClasses),
      withLatestFrom(this._store.select(fromRouterStore.selectRouteParams)),
      mergeMap(([{ params }, { id }]) =>
        this._courseService.getCourseClassRefund(id, params).pipe(
          map((courseRefund) =>
            courseActions.studentRefundCourseClassesSuccess({
              courseRefund: camelcaseKeys(courseRefund, { deep: true }),
            })
          ),
          catchError((error) =>
            of(
              courseActions.studentRefundCourseClassesFailure({
                error: error?.error?.message || error?.error?.errors,
              })
            )
          )
        )
      )
    )
  );

  studentCancelCourse$ = createEffect(() =>
    this._actions$.pipe(
      ofType(courseActions.studentCancelCourse),
      withLatestFrom(this._store.select(fromRouterStore.selectRouteParams)),
      mergeMap(([{ body }, { id }]) =>
        this._courseService.studentCancelCourse(body, id).pipe(
          map(() =>
            courseActions.studentCancelCourseSuccess({
              status: CourseStatus.cancelledByStudent,
            })
          ),
          catchError((error) =>
            of(
              courseActions.studentCancelCourseFailure({
                error: error?.error?.message || error?.error?.errors,
              })
            )
          )
        )
      )
    )
  );

  studentRequestAdminAssignTutor$ = createEffect(() =>
    this._actions$.pipe(
      ofType(courseActions.studentRequestAdminAssignTutor),
      withLatestFrom(this._store.select(fromRouterStore.selectRouteParams)),
      mergeMap(([_, { id }]) =>
        this._courseService.studentRequestAdminAssignCourse(id).pipe(
          map(() =>
            courseActions.studentRequestAdminAssignTutorSuccess({
              status: CourseStatus.requestedToMetutors,
              message: 'Request submitted successfully',
            })
          ),
          catchError((error) =>
            of(
              courseActions.studentRequestAdminAssignTutorFailure({
                error: error?.error?.message || error?.error?.errors,
              })
            )
          )
        )
      )
    )
  );

  studentReassignTutor$ = createEffect(() =>
    this._actions$.pipe(
      ofType(courseActions.studentReassignTutor),
      withLatestFrom(this._store.select(fromRouterStore.selectRouteParams)),
      mergeMap(([{ body }, { id }]) =>
        this._courseService.studentReassignTutor(body, id).pipe(
          map(({ message }) =>
            courseActions.studentReassignTutorSuccess({
              status: CourseStatus.pending,
              message,
            })
          ),
          catchError((error) =>
            of(
              courseActions.studentReassignTutorFailure({
                error: error?.error?.message || error?.error?.errors,
              })
            )
          )
        )
      )
    )
  );

  cancelCourseSuccess$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(courseActions.tutorCancelCourseSuccess),
        map(() => this._router.navigate(['/tutor/classrooms']))
      ),
    { dispatch: false }
  );

  successMessages$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(
          ...[
            courseActions.tutorAcceptCourseSuccess,
            courseActions.tutorRejectCourseSuccess,
            courseActions.tutorCancelCourseSuccess,
            courseActions.studentRequestAdminAssignTutorSuccess,
          ]
        ),
        map(({ message }) => this._alertNotificationService.success(message))
      ),
    {
      dispatch: false,
    }
  );

  errorMessages$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(
          ...[
            courseActions.tutorAcceptCourseFailure,
            courseActions.tutorRejectCourseFailure,
            courseActions.tutorCancelCourseFailure,
            courseActions.studentCancelCourseFailure,
            courseActions.studentReassignTutorFailure,
            courseActions.studentRequestAdminAssignTutorFailure,
          ]
        ),
        map(({ error }) => this._alertNotificationService.error(error))
      ),
    {
      dispatch: false,
    }
  );

  constructor(
    private _router: Router,
    private _store: Store<any>,
    private _actions$: Actions,
    private _courseService: CoursesService,
    private _alertNotificationService: AlertNotificationService
  ) {}
}
