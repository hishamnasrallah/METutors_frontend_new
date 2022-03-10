import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators';

import { selectCourses } from '..';
import camelcaseKeys from 'camelcase-keys';
import { CoursesService } from '@services';
import * as fromRouterStore from '@metutor/state';
import * as courseActions from '../actions/course.actions';

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

  constructor(
    private _store: Store<any>,
    private _actions$: Actions,
    private _courseService: CoursesService
  ) {}
}
