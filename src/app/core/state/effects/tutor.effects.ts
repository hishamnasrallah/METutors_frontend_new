import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import camelcaseKeys from 'camelcase-keys';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators';

import { TutorsService } from '@services';
import { environment } from '@environment';
import * as fromRouterStore from '@metutor/state';
import * as tutorActions from '../actions/tutor.actions';
import { selectTutorDashboard, selectTutorSyllabus } from '..';
import { AlertNotificationService } from '@metutor/core/components';

@Injectable()
export class TutorEffects {
  completeTutorProfile$ = createEffect(() =>
    this._actions$.pipe(
      ofType(tutorActions.completeTutorProfile),
      mergeMap(({ data, nextStep }) =>
        this._tutorService.sendTeacherAccount(data).pipe(
          map((response) => {
            const jwtHelper = new JwtHelperService();
            const decodeToken = camelcaseKeys(
              jwtHelper.decodeToken(response?.token),
              {
                deep: true,
              }
            );
            const user: any = decodeToken?.user;

            return tutorActions.completeTutorProfileSuccess({
              nextStep,
              token: response?.token,
              user: {
                ...user,
                avatar: environment.imageURL + user?.avatar,
              },
            });
          }),
          catchError((error) =>
            of(
              tutorActions.completeTutorProfileFailure({
                error: error?.error?.message || error?.error?.errors,
              })
            )
          )
        )
      )
    )
  );

  loadTutor$ = createEffect(() =>
    this._actions$.pipe(
      ofType(tutorActions.loadTutor),
      mergeMap(({ id }) =>
        this._tutorService.getTutorById(id).pipe(
          map((tutor) =>
            tutorActions.loadTutorSuccess({
              tutor,
            })
          ),
          catchError((error) =>
            of(
              tutorActions.loadTutorFailure({
                error: error?.error?.message || error?.error?.errors,
              })
            )
          )
        )
      )
    )
  );

  loadTutorDashboard$ = createEffect(() =>
    this._actions$.pipe(
      ofType(tutorActions.loadTutorDashboard),
      withLatestFrom(this._store.select(selectTutorDashboard)),
      mergeMap(([{ params, load }, _dashboard]) => {
        if (!_dashboard || load) {
          return this._tutorService.getTutorDashboard(params).pipe(
            map((dashboard) =>
              tutorActions.loadTutorDashboardSuccess({
                dashboard: camelcaseKeys(dashboard, { deep: true }),
              })
            ),
            catchError((error) =>
              of(
                tutorActions.loadTutorDashboardFailure({
                  error: error?.error?.message || error?.error?.errors,
                })
              )
            )
          );
        } else {
          return of(tutorActions.loadTutorDashboardEnded());
        }
      })
    )
  );

  loadTutorSyllabus$ = createEffect(() =>
    this._actions$.pipe(
      ofType(tutorActions.loadTutorSyllabus),
      withLatestFrom(this._store.select(fromRouterStore.selectRouteParams)),
      mergeMap(([_, { id }]) =>
        this._tutorService.getTutorSyllabus(id).pipe(
          map((syllabus) =>
            tutorActions.loadTutorSyllabusSuccess({
              syllabus: camelcaseKeys(syllabus, { deep: true }),
            })
          ),
          catchError((error) =>
            of(
              tutorActions.loadTutorSyllabusFailure({
                error: error?.error?.message || error?.error?.errors,
              })
            )
          )
        )
      )
    )
  );

  tutorAddSyllabusTopic$ = createEffect(() =>
    this._actions$.pipe(
      ofType(tutorActions.tutorAddSyllabusTopic),
      withLatestFrom(this._store.select(fromRouterStore.selectRouteParams)),
      mergeMap(([{ body }, { id }]) =>
        this._tutorService.addSyllabusTopic(body, id).pipe(
          map((syllabus) =>
            tutorActions.tutorAddSyllabusTopicSuccess({
              syllabus: camelcaseKeys(syllabus, { deep: true }),
              message: 'Topic has been successfully added',
            })
          ),
          catchError((error) =>
            of(
              tutorActions.tutorAddSyllabusTopicFailure({
                error: error?.error?.message || error?.error?.errors,
              })
            )
          )
        )
      )
    )
  );

  successMessages$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(...[tutorActions.tutorAddSyllabusTopicSuccess]),
        map(({ message }) => this._alertNotificationService.success(message))
      ),
    {
      dispatch: false,
    }
  );

  failureMessages$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(
          ...[
            tutorActions.completeTutorProfileFailure,
            tutorActions.tutorAddSyllabusTopicFailure,
          ]
        ),
        map((action) => {
          if (action.error) {
            return this._alertNotificationService.error(action.error);
          } else {
            return this._alertNotificationService.error(
              'Something went wrong!'
            );
          }
        })
      ),
    {
      dispatch: false,
    }
  );

  constructor(
    private _store: Store<any>,
    private _actions$: Actions,
    private _tutorService: TutorsService,
    private _alertNotificationService: AlertNotificationService
  ) {}
}
