import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import camelcaseKeys from 'camelcase-keys';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators';

import { StudentsService } from '@services';
import * as fromRouterStore from '@metutor/state';
import { AlertNotificationService } from '@metutor/core/components';
import * as fromStudentAction from '@metutor/modules/student/state/actions';
import * as studentActions from '@metutor/core/state/actions/student.actions';

import {
  selectStudent,
  selectStudents,
  selectStudentDashboard,
  selectStudentPreferences,
} from '@metutor/core/state';

@Injectable()
export class StudentEffects {
  loadStudentStudent$ = createEffect(() =>
    this._actions$.pipe(
      ofType(studentActions.loadStudent),
      withLatestFrom(this._store.select(selectStudent)),
      mergeMap(([_, _student]) => {
        if (!_student) {
          return this._studentService.getStudent().pipe(
            map((student) =>
              studentActions.loadStudentSuccess({
                student: camelcaseKeys(student, { deep: true }),
              })
            ),
            catchError((error) =>
              of(
                studentActions.loadStudentFailure({
                  error: error?.error?.message || error?.error?.errors,
                })
              )
            )
          );
        } else {
          return of(studentActions.loadStudentEnded());
        }
      })
    )
  );

  loadStudents$ = createEffect(() =>
    this._actions$.pipe(
      ofType(studentActions.loadStudents),
      withLatestFrom(this._store.select(selectStudents)),
      mergeMap(([_, _students]) => {
        if (!_students) {
          return this._studentService.getStudents().pipe(
            map((students) =>
              studentActions.loadStudentsSuccess({
                students: camelcaseKeys(students, { deep: true }),
              })
            ),
            catchError((error) =>
              of(
                studentActions.loadStudentsFailure({
                  error: error?.error?.message || error?.error?.errors,
                })
              )
            )
          );
        } else {
          return of(studentActions.loadStudentsEnded());
        }
      })
    )
  );

  loadStudentPreference$ = createEffect(() =>
    this._actions$.pipe(
      ofType(studentActions.loadStudentPreference),
      withLatestFrom(this._store.select(selectStudentPreferences)),
      mergeMap(([_, _preferences]) => {
        if (!_preferences) {
          return this._studentService.getStudentsPreference().pipe(
            map((preferences) =>
              studentActions.loadStudentPreferenceSuccess({
                preferences: camelcaseKeys(preferences, { deep: true }),
              })
            ),
            catchError((error) =>
              of(
                studentActions.loadStudentPreferenceFailure({
                  error: error?.error?.message || error?.error?.errors,
                })
              )
            )
          );
        } else {
          return of(studentActions.loadStudentPreferenceEnded());
        }
      })
    )
  );

  loadStudentDashboard$ = createEffect(() =>
    this._actions$.pipe(
      ofType(studentActions.loadStudentDashboard),
      withLatestFrom(this._store.select(selectStudentDashboard)),
      mergeMap(([{ params, load }, _dashboard]) => {
        if (!_dashboard || load) {
          return this._studentService.getStudentDashboard(params).pipe(
            map((dashboard) =>
              studentActions.loadStudentDashboardSuccess({
                dashboard: camelcaseKeys(dashboard, { deep: true }),
              })
            ),
            catchError((error) =>
              of(
                studentActions.loadStudentDashboardFailure({
                  error: error?.error?.message || error?.error?.errors,
                })
              )
            )
          );
        } else {
          return of(studentActions.loadStudentDashboardEnded());
        }
      })
    )
  );

  loadStudentClassesDashboard$ = createEffect(() =>
    this._actions$.pipe(
      ofType(studentActions.loadStudentClassesDashboard),
      withLatestFrom(this._store.select(fromRouterStore.selectRouteParams)),
      mergeMap(([_, { id }]) =>
        this._studentService.getStudentClassDashboard(id).pipe(
          map((classesDashboard) =>
            studentActions.loadStudentClassesDashboardSuccess({
              classesDashboard: camelcaseKeys(classesDashboard, { deep: true }),
            })
          ),
          catchError((error) =>
            of(
              studentActions.loadStudentClassesDashboardFailure({
                error: error?.error?.message || error?.error?.errors,
              })
            )
          )
        )
      )
    )
  );

  loadStudentClassroom$ = createEffect(() =>
    this._actions$.pipe(
      ofType(studentActions.loadStudentClassroom),
      mergeMap(({ params }) =>
        this._studentService.getStudentClassroom(params).pipe(
          map((classroom) =>
            studentActions.loadStudentClassroomSuccess({
              classroom: camelcaseKeys(classroom, { deep: true }),
            })
          ),
          catchError((error) =>
            of(
              studentActions.loadStudentClassroomFailure({
                error: error?.error?.message || error?.error?.errors,
              })
            )
          )
        )
      )
    )
  );

  loadStudentSyllabus$ = createEffect(() =>
    this._actions$.pipe(
      ofType(studentActions.loadStudentSyllabus),
      withLatestFrom(this._store.select(fromRouterStore.selectRouteParams)),
      mergeMap(([_, { id }]) =>
        this._studentService.getStudentSyllabus(id).pipe(
          map((syllabus) =>
            studentActions.loadStudentSyllabusSuccess({
              syllabus: camelcaseKeys(syllabus, { deep: true }),
            })
          ),
          catchError((error) =>
            of(
              studentActions.loadStudentSyllabusFailure({
                error: error?.error?.message || error?.error?.errors,
              })
            )
          )
        )
      )
    )
  );

  loadStudentResources$ = createEffect(() =>
    this._actions$.pipe(
      ofType(studentActions.loadStudentResources),
      withLatestFrom(this._store.select(fromRouterStore.selectRouteParams)),
      mergeMap(([_, { id }]) =>
        this._studentService.getStudentResources(id).pipe(
          map((resources) =>
            studentActions.loadStudentResourcesSuccess({
              resources: camelcaseKeys(resources, { deep: true }),
            })
          ),
          catchError((error) =>
            of(
              studentActions.loadStudentResourcesFailure({
                error: error?.error?.message || error?.error?.errors,
              })
            )
          )
        )
      )
    )
  );

  loadStudentResource$ = createEffect(() =>
    this._actions$.pipe(
      ofType(studentActions.loadStudentResource),
      mergeMap(({ id }) =>
        this._studentService.getStudentResource(id).pipe(
          map((resource) =>
            studentActions.loadStudentResourceSuccess({
              resource: camelcaseKeys(resource, { deep: true }),
            })
          ),
          catchError((error) =>
            of(
              studentActions.loadStudentResourceFailure({
                error: error?.error?.message || error?.error?.errors,
              })
            )
          )
        )
      )
    )
  );

  studentJoinClass$ = createEffect(() =>
    this._actions$.pipe(
      ofType(studentActions.studentJoinClass),
      mergeMap(({ id }) =>
        this._studentService.studentJoinClass(id).pipe(
          map((response) => {
            if (response && response?.class_url) {
              window.open(response.class_url, '_blank');
            }

            return studentActions.studentJoinClassSuccess();
          }),
          catchError((error) =>
            of(
              studentActions.studentJoinClassFailure({
                error: error?.error?.message || error?.error?.errors,
              })
            )
          )
        )
      )
    )
  );

  // Assignments
  loadStudentAssignments$ = createEffect(() =>
    this._actions$.pipe(
      ofType(studentActions.loadStudentAssignments),
      withLatestFrom(this._store.select(fromRouterStore.selectRouteParams)),
      mergeMap(([_, { id }]) =>
        this._studentService.getStudentAssignments(id).pipe(
          map((assignments) =>
            studentActions.loadStudentAssignmentsSuccess({
              assignments: camelcaseKeys(assignments, { deep: true }),
            })
          ),
          catchError((error) =>
            of(
              studentActions.loadStudentAssignmentsFailure({
                error: error?.error?.message || error?.error?.errors,
              })
            )
          )
        )
      )
    )
  );

  loadStudentAssignment$ = createEffect(() =>
    this._actions$.pipe(
      ofType(studentActions.loadStudentAssignment),
      mergeMap(({ id }) =>
        this._studentService.getStudentAssignment(id).pipe(
          map((assignment) =>
            studentActions.loadStudentAssignmentSuccess({
              assignment: camelcaseKeys(assignment, { deep: true }),
            })
          ),
          catchError((error) =>
            of(
              studentActions.loadStudentAssignmentFailure({
                error: error?.error?.message || error?.error?.errors,
              })
            )
          )
        )
      )
    )
  );

  studentSubmitAssignment$ = createEffect(() =>
    this._actions$.pipe(
      ofType(studentActions.studentSubmitAssignment),
      mergeMap(({ body }) =>
        this._studentService.studentSubmitAssignment(body).pipe(
          map(() =>
            studentActions.studentSubmitAssignmentSuccess({
              id: body.id,
              message: 'Assignment successfully submitted',
            })
          ),
          catchError((error) =>
            of(
              studentActions.studentSubmitAssignmentFailure({
                error: error?.error?.message || error?.error?.errors,
              })
            )
          )
        )
      )
    )
  );

  viewStudentSubmittedAssignment$ = createEffect(() =>
    this._actions$.pipe(
      ofType(studentActions.loadStudentSubmittedAssignment),
      mergeMap(({ id }) =>
        this._studentService.getStudentSubmittedAssignment(id).pipe(
          map((submittedAssignment) =>
            studentActions.loadStudentSubmittedAssignmentSuccess({
              submittedAssignment: camelcaseKeys(submittedAssignment, {
                deep: true,
              }),
            })
          ),
          catchError((error) =>
            of(
              studentActions.loadStudentSubmittedAssignmentFailure({
                error: error?.error?.message || error?.error?.errors,
              })
            )
          )
        )
      )
    )
  );

  loadStudentAttendance$ = createEffect(() =>
    this._actions$.pipe(
      ofType(studentActions.loadStudentAttendance),
      withLatestFrom(this._store.select(fromRouterStore.selectRouteParams)),
      mergeMap(([_, { id }]) =>
        this._studentService.getStudentAttendance(id).pipe(
          map((attendance) =>
            studentActions.loadStudentAttendanceSuccess({
              attendance: camelcaseKeys(attendance, { deep: true }),
            })
          ),
          catchError((error) =>
            of(
              studentActions.loadStudentAttendanceFailure({
                error: error?.error?.message || error?.error?.errors,
              })
            )
          )
        )
      )
    )
  );

  loadStudentFeedbackOptions$ = createEffect(() =>
    this._actions$.pipe(
      ofType(studentActions.loadStudentFeedbackOptions),
      mergeMap(() =>
        this._studentService.getStudentFeedbackOptions().pipe(
          map((feedbackOptions) =>
            studentActions.loadStudentFeedbackOptionsSuccess({
              feedbackOptions: camelcaseKeys(feedbackOptions, { deep: true }),
            })
          ),
          catchError((error) =>
            of(
              studentActions.loadStudentFeedbackOptionsFailure({
                error: error?.error?.message || error?.error?.errors,
              })
            )
          )
        )
      )
    )
  );

  loadStudentPlatformFeedbackOptions$ = createEffect(() =>
    this._actions$.pipe(
      ofType(studentActions.loadStudentPlatformFeedbackOptions),
      mergeMap(() =>
        this._studentService.getStudentPlatformFeedbackOptions().pipe(
          map((feedbackOptions) =>
            studentActions.loadStudentPlatformFeedbackOptionsSuccess({
              feedbackOptions: camelcaseKeys(feedbackOptions, { deep: true }),
            })
          ),
          catchError((error) =>
            of(
              studentActions.loadStudentPlatformFeedbackOptionsFailure({
                error: error?.error?.message || error?.error?.errors,
              })
            )
          )
        )
      )
    )
  );

  loadMakeupClassSlots$ = createEffect(() =>
    this._actions$.pipe(
      ofType(studentActions.loadMakeupClassSlots),
      mergeMap(({ body }) =>
        this._studentService.loadMakeupClassSlots(body).pipe(
          map((timeSlots) =>
            studentActions.loadMakeupClassSlotsSuccess({
              timeSlots: camelcaseKeys(timeSlots, { deep: true }),
            })
          ),
          catchError((error) =>
            of(
              studentActions.loadMakeupClassSlotsFailure({
                error: error?.error?.message || error?.error?.errors,
              })
            )
          )
        )
      )
    )
  );

  loadTutorAvailability$ = createEffect(() =>
    this._actions$.pipe(
      ofType(studentActions.loadTutorAvailability),
      mergeMap(({ id }) =>
        this._studentService.loadTutorAvailability(id).pipe(
          map((tutorAvailability) =>
            studentActions.loadTutorAvailabilitySuccess({
              tutorAvailability: camelcaseKeys(tutorAvailability, {
                deep: true,
              }),
            })
          ),
          catchError((error) =>
            of(
              studentActions.loadTutorAvailabilityFailure({
                error: error?.error?.message || error?.error?.errors,
              })
            )
          )
        )
      )
    )
  );

  studentMakeupClass$ = createEffect(() =>
    this._actions$.pipe(
      ofType(studentActions.studentMakeupClass),
      mergeMap(({ body }) =>
        this._studentService.studentMakeupClass(body).pipe(
          map(() =>
            studentActions.studentMakeupClassSuccess({
              message: 'You have successfully makeup class',
            })
          ),
          catchError((error) =>
            of(
              studentActions.studentMakeupClassFailure({
                error: error?.error?.message || error?.error?.errors,
              })
            )
          )
        )
      )
    )
  );

  studentSubmitFeedback$ = createEffect(() =>
    this._actions$.pipe(
      ofType(studentActions.studentSubmitFeedback),
      withLatestFrom(this._store.select(fromRouterStore.selectRouteParams)),
      mergeMap(([{ body, onHold, cancelCourse }, { id }]) =>
        this._studentService.studentSubmitFeedback(body, id).pipe(
          map((attendance) =>
            studentActions.studentSubmitFeedbackSuccess({
              onHold,
              cancelCourse,
              message: 'Feedback successfully submitted',
            })
          ),
          catchError((error) =>
            of(
              studentActions.studentSubmitFeedbackFailure({
                error: error?.error?.message || error?.error?.errors,
              })
            )
          )
        )
      )
    )
  );

  studentSubmitPlatformFeedback$ = createEffect(() =>
    this._actions$.pipe(
      ofType(studentActions.studentSubmitPlatformFeedback),
      withLatestFrom(this._store.select(fromRouterStore.selectRouteParams)),
      mergeMap(([{ body }, { id }]) =>
        this._studentService.studentSubmitPlatformFeedback(body, id).pipe(
          map((attendance) =>
            studentActions.studentSubmitPlatformFeedbackSuccess({
              message: 'Feedback successfully submitted',
            })
          ),
          catchError((error) =>
            of(
              studentActions.studentSubmitPlatformFeedbackFailure({
                error: error?.error?.message || error?.error?.errors,
              })
            )
          )
        )
      )
    )
  );

  // Student profile
  studentUpdateProfile$ = createEffect(() =>
    this._actions$.pipe(
      ofType(studentActions.studentUpdateProfile),
      mergeMap(({ body }) =>
        this._studentService.updateStudentProfile(body).pipe(
          map(() =>
            studentActions.studentUpdateProfileSuccess({
              body,
              message: 'Account settings successfully updated',
            })
          ),
          catchError((error) =>
            of(
              studentActions.studentUpdateProfileFailure({
                error: error?.error?.message || error?.error?.errors,
              })
            )
          )
        )
      )
    )
  );

  studentUpdatePreferences$ = createEffect(() =>
    this._actions$.pipe(
      ofType(studentActions.studentUpdatePreferences),
      mergeMap(({ body }) =>
        this._studentService.updateStudentPreferences(body).pipe(
          map(() =>
            studentActions.studentUpdatePreferencesSuccess({
              body,
              isPreference: true,
              message: 'User preferences successfully updated',
            })
          ),
          catchError((error) =>
            of(
              studentActions.studentUpdatePreferencesFailure({
                error: error?.error?.message || error?.error?.errors,
              })
            )
          )
        )
      )
    )
  );

  studentAddNewClass$ = createEffect(() =>
    this._actions$.pipe(
      ofType(studentActions.studentAddNewClass),
      mergeMap(({ data }) =>
        this._studentService.studentAddNewClass(data).pipe(
          map((response) =>
            studentActions.studentAddNewClassSuccess({
              paymentInfo: response,
            })
          ),
          catchError((error) =>
            of(
              studentActions.studentAddNewClassFailure({
                error: error?.error?.message || error?.error?.errors,
              })
            )
          )
        )
      )
    )
  );

  studentViewClass$ = createEffect(() =>
    this._actions$.pipe(
      ofType(studentActions.studentViewClass),
      mergeMap(({ id }) =>
        this._studentService.studentViewClass(id).pipe(
          map((response) => {
            if (response && response?.url) {
              window.open(response.url, '_blank');
            }

            return studentActions.studentViewClassSuccess();
          }),
          catchError((error) =>
            of(
              studentActions.studentViewClassFailure({
                error: error?.error?.message || error?.error?.errors,
              })
            )
          )
        )
      )
    )
  );

  studentSubmitAssignmentSuccess$ = createEffect(() =>
    this._actions$.pipe(
      ofType(studentActions.studentSubmitAssignmentSuccess),
      map(({ id }) => studentActions.loadStudentAssignment({ id }))
    )
  );

  studentMakeupClassSuccess$ = createEffect(() =>
    this._actions$.pipe(
      ofType(studentActions.studentMakeupClassSuccess),
      map(() => studentActions.loadStudentClassesDashboard())
    )
  );

  studentSubmitFeedbackSuccess$ = createEffect(() =>
    this._actions$.pipe(
      ofType(studentActions.studentSubmitFeedbackSuccess),
      map(({ onHold, cancelCourse }) => {
        if (onHold) {
          return fromStudentAction.openTutorReAssignmentModal();
        } else if (cancelCourse) {
          return fromStudentAction.openCancelCourseModal();
        } else {
          return fromStudentAction.closeStudentSendFeedbackModal();
        }
      })
    )
  );

  successMessages$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(
          ...[
            studentActions.studentMakeupClassSuccess,
            studentActions.studentUpdateProfileSuccess,
            studentActions.studentSubmitFeedbackSuccess,
            studentActions.studentSubmitAssignmentSuccess,
            studentActions.studentUpdatePreferencesSuccess,
            studentActions.studentSubmitPlatformFeedbackSuccess,
          ]
        ),
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
            studentActions.studentViewClassFailure,
            studentActions.studentJoinClassFailure,
            studentActions.studentMakeupClassFailure,
            studentActions.studentAddNewClassFailure,
            studentActions.studentUpdateProfileFailure,
            studentActions.studentSubmitFeedbackFailure,
            studentActions.studentSubmitAssignmentFailure,
            studentActions.studentUpdatePreferencesFailure,
            studentActions.studentSubmitPlatformFeedbackFailure,
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
    private _studentService: StudentsService,
    private _alertNotificationService: AlertNotificationService
  ) {}
}
