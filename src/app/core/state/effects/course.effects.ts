import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators';

import { selectCourses } from '..';
import { CoursesService } from '@services';
import * as courseActions from '../actions/course.actions';

@Injectable()
export class CourseEffects {
  loadCourses$ = createEffect(() =>
    this._actions$.pipe(
      ofType(courseActions.loadCourses),
      withLatestFrom(this._store.select(selectCourses)),
      mergeMap(([_, _courses]) => {
        if (!_courses || !_courses.length) {
          return this._courseService.loadCourses().pipe(
            map((courses) =>
              courseActions.loadCoursesSuccess({
                courses,
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

  constructor(
    private _store: Store<any>,
    private _actions$: Actions,
    private _courseService: CoursesService
  ) {}
}
