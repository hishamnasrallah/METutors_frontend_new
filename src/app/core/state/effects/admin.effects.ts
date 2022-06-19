import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators';

import { AdminService } from '@services';
import camelcaseKeys from 'camelcase-keys';
import * as fromCore from '@metutor/core/state';
import * as fromRouterStore from '@metutor/state';
import * as adminActions from '../actions/admin.actions';
import { AlertNotificationService } from '@metutor/core/components';

@Injectable()
export class AdminEffects {
  loadAdminDocuments$ = createEffect(() =>
    this._actions$.pipe(
      ofType(adminActions.loadAdminDocuments),
      withLatestFrom(
        this._store.select(fromCore.selectAdminDocuments),
        this._store.select(fromRouterStore.selectRouteParams)
      ),
      mergeMap(([_, _documents, { id }]) => {
        if (!_documents || !_documents.length) {
          return this._adminService.loadAdminDocuments(id).pipe(
            map(
              (documents) =>
                adminActions.loadAdminDocumentsSuccess({
                  documents: camelcaseKeys(documents?.user_documents, {
                    deep: true,
                  }),
                }),
              catchError((error) =>
                of(
                  adminActions.loadAdminDocumentsFailure({
                    error: error?.error?.message || error?.error?.errors,
                  })
                )
              )
            )
          );
        } else {
          return of(adminActions.loadAdminDocumentsEnded());
        }
      })
    )
  );

  loadAdminTutors$ = createEffect(() =>
    this._actions$.pipe(
      ofType(adminActions.loadAdminTutors),
      mergeMap(({ id, tutorType }) =>
        this._adminService.loadAdminTutors(tutorType, id).pipe(
          map(
            (tutors) =>
              adminActions.loadAdminTutorsSuccess({
                tutors: camelcaseKeys(tutors, {
                  deep: true,
                }),
              }),
            catchError((error) =>
              of(
                adminActions.loadAdminTutorsFailure({
                  error: error?.error?.message || error?.error?.errors,
                })
              )
            )
          )
        )
      )
    )
  );

  loadAdminCoursePreviousTutors$ = createEffect(() =>
    this._actions$.pipe(
      ofType(adminActions.loadAdminCoursePreviousTutors),
      withLatestFrom(this._store.select(fromRouterStore.selectRouteParams)),
      mergeMap(([_, { courseId }]) =>
        this._adminService.loadAdminCoursePreviousTutors(courseId).pipe(
          map(
            (previousTutors) =>
              adminActions.loadAdminCoursePreviousTutorsSuccess({
                previousTutors: camelcaseKeys(previousTutors, {
                  deep: true,
                }),
              }),
            catchError((error) =>
              of(
                adminActions.loadAdminCoursePreviousTutorsFailure({
                  error: error?.error?.message || error?.error?.errors,
                })
              )
            )
          )
        )
      )
    )
  );

  loadAdminStudentsFeedback$ = createEffect(() =>
    this._actions$.pipe(
      ofType(adminActions.loadAdminStudentsFeedback),
      withLatestFrom(this._store.select(fromRouterStore.selectRouteParams)),
      mergeMap(([_, { courseId }]) =>
        this._adminService.loadAdminStudentsFeedback(courseId).pipe(
          map(
            (studentsFeedback) =>
              adminActions.loadAdminStudentsFeedbackSuccess({
                studentsFeedback: camelcaseKeys(studentsFeedback, {
                  deep: true,
                }),
              }),
            catchError((error) =>
              of(
                adminActions.loadAdminStudentsFeedbackFailure({
                  error: error?.error?.message || error?.error?.errors,
                })
              )
            )
          )
        )
      )
    )
  );

  loadAdminStudentProfile$ = createEffect(() =>
    this._actions$.pipe(
      ofType(adminActions.loadAdminStudentProfile),
      withLatestFrom(this._store.select(fromRouterStore.selectRouteParams)),
      mergeMap(([_, { id }]) =>
        this._adminService.loadAdminStudentProfile(id).pipe(
          map(
            (studentProfile) =>
              adminActions.loadAdminStudentProfileSuccess({
                studentProfile: camelcaseKeys(studentProfile, {
                  deep: true,
                }),
              }),
            catchError((error) =>
              of(
                adminActions.loadAdminStudentProfileFailure({
                  error: error?.error?.message || error?.error?.errors,
                })
              )
            )
          )
        )
      )
    )
  );

  loadAdminStudentAssignmentSummary$ = createEffect(() =>
    this._actions$.pipe(
      ofType(adminActions.loadAdminStudentAssignmentSummary),
      withLatestFrom(this._store.select(fromRouterStore.selectRouteParams)),
      mergeMap(([_, { studentId, courseId }]) =>
        this._adminService
          .loadAdminStudentAssignmentSummary(courseId, studentId)
          .pipe(
            map(
              (assignmentSummary) =>
                adminActions.loadAdminStudentAssignmentSummarySuccess({
                  assignmentSummary: camelcaseKeys(assignmentSummary, {
                    deep: true,
                  }),
                }),
              catchError((error) =>
                of(
                  adminActions.loadAdminStudentAssignmentSummaryFailure({
                    error: error?.error?.message || error?.error?.errors,
                  })
                )
              )
            )
          )
      )
    )
  );

  loadAdminStudentViewFeedback$ = createEffect(() =>
    this._actions$.pipe(
      ofType(adminActions.loadAdminViewFeedback),
      withLatestFrom(this._store.select(fromRouterStore.selectRouteParams)),
      mergeMap(([payload, { studentId, courseId }]) => {
        const _courseId = payload?.courseId ? payload.courseId : courseId;
        const _studentId = payload?.studentId ? payload.studentId : studentId;

        return this._adminService.viewFeedback(_courseId, _studentId).pipe(
          map(
            (viewFeedback) =>
              adminActions.loadAdminViewFeedbackSuccess({
                viewFeedback: camelcaseKeys(viewFeedback, {
                  deep: true,
                }),
              }),
            catchError((error) =>
              of(
                adminActions.loadAdminViewFeedbackFailure({
                  error: error?.error?.message || error?.error?.errors,
                })
              )
            )
          )
        );
      })
    )
  );

  loadAdminStudentTotalBooking$ = createEffect(() =>
    this._actions$.pipe(
      ofType(adminActions.loadAdminStudentTotalBooking),
      mergeMap(({ id, bookingType }) =>
        this._adminService.loadAdminStudentTotalBooking(id, bookingType).pipe(
          map(
            (studentTotalBooking) =>
              adminActions.loadAdminStudentTotalBookingSuccess({
                studentTotalBooking: camelcaseKeys(studentTotalBooking, {
                  deep: true,
                }),
              }),
            catchError((error) =>
              of(
                adminActions.loadAdminStudentTotalBookingFailure({
                  error: error?.error?.message || error?.error?.errors,
                })
              )
            )
          )
        )
      )
    )
  );

  loadBookingDetail$ = createEffect(() =>
    this._actions$.pipe(
      ofType(adminActions.loadBookingDetail),
      withLatestFrom(this._store.select(fromRouterStore.selectRouteParams)),
      mergeMap(([_, { id }]) =>
        this._adminService.loadBookingDetails(id).pipe(
          map(
            (bookingDetail) =>
              adminActions.loadBookingDetailSuccess({
                bookingDetail: camelcaseKeys(bookingDetail, {
                  deep: true,
                }),
              }),
            catchError((error) =>
              of(
                adminActions.loadBookingDetailFailure({
                  error: error?.error?.message || error?.error?.errors,
                })
              )
            )
          )
        )
      )
    )
  );

  loadAdminStudentBookingDetail$ = createEffect(() =>
    this._actions$.pipe(
      ofType(adminActions.loadAdminStudentBookingDetail),
      withLatestFrom(this._store.select(fromRouterStore.selectRouteParams)),
      mergeMap(([_, { studentId, courseId }]) =>
        this._adminService
          .loadAdminStudentBookingDetail(courseId, studentId)
          .pipe(
            map(
              (bookingDetail) =>
                adminActions.loadAdminStudentBookingDetailSuccess({
                  bookingDetail: camelcaseKeys(bookingDetail, {
                    deep: true,
                  }),
                }),
              catchError((error) =>
                of(
                  adminActions.loadAdminStudentBookingDetailFailure({
                    error: error?.error?.message || error?.error?.errors,
                  })
                )
              )
            )
          )
      )
    )
  );

  loadAdminTutorBookingDetail$ = createEffect(() =>
    this._actions$.pipe(
      ofType(adminActions.loadAdminTutorBookingDetail),
      withLatestFrom(this._store.select(fromRouterStore.selectRouteParams)),
      mergeMap(([_, { tutorId, courseId }]) =>
        this._adminService.loadAdminTutorBookingDetail(courseId, tutorId).pipe(
          map(
            (bookingDetail) =>
              adminActions.loadAdminTutorBookingDetailSuccess({
                bookingDetail: camelcaseKeys(bookingDetail, {
                  deep: true,
                }),
              }),
            catchError((error) =>
              of(
                adminActions.loadAdminTutorBookingDetailFailure({
                  error: error?.error?.message || error?.error?.errors,
                })
              )
            )
          )
        )
      )
    )
  );

  adminApproveDocument$ = createEffect(() =>
    this._actions$.pipe(
      ofType(adminActions.adminApproveDocument),
      mergeMap(({ id }) =>
        this._adminService.adminApproveDocument(id).pipe(
          map(
            (documents) =>
              adminActions.adminApproveDocumentSuccess({
                id,
                message: 'Document Approved successfully',
              }),
            catchError((error) =>
              of(
                adminActions.adminApproveDocumentFailure({
                  error: error?.error?.message || error?.error?.errors,
                })
              )
            )
          )
        )
      )
    )
  );

  adminRejectDocument$ = createEffect(() =>
    this._actions$.pipe(
      ofType(adminActions.adminRejectDocument),
      mergeMap(({ id }) =>
        this._adminService.adminRejectDocument(id).pipe(
          map(
            (documents) =>
              adminActions.adminRejectDocumentSuccess({
                id,
                message: 'Document rejected successfully',
              }),
            catchError((error) =>
              of(
                adminActions.adminRejectDocumentFailure({
                  error: error?.error?.message || error?.error?.errors,
                })
              )
            )
          )
        )
      )
    )
  );

  loadWorkforceCapacity$ = createEffect(() =>
    this._actions$.pipe(
      ofType(adminActions.loadWorkforceCapacity),
      withLatestFrom(this._store.select(fromCore.selectWorkforceCapacity)),
      mergeMap(([_, _capacity]) => {
        if (!_capacity || !_capacity.length) {
          return this._adminService.loadWorkforceCapacity().pipe(
            map(
              (workforceCapacity) =>
                adminActions.loadWorkforceCapacitySuccess({
                  workforceCapacity,
                }),
              catchError((error) =>
                of(
                  adminActions.loadWorkforceCapacityFailure({
                    error: error?.error?.message || error?.error?.errors,
                  })
                )
              )
            )
          );
        } else {
          return of(adminActions.loadWorkforceCapacityEnded());
        }
      })
    )
  );

  loadCourseBookingList$ = createEffect(() =>
    this._actions$.pipe(
      ofType(adminActions.loadCourseBookingList),
      mergeMap((action) =>
        this._adminService.loadCourseBookingList(action.id).pipe(
          map(
            (courseBooking) =>
              adminActions.loadCourseBookingListSuccess({
                courseBooking,
              }),
            catchError((error) =>
              of(
                adminActions.loadCourseBookingListFailure({
                  error: error?.error?.message || error?.error?.errors,
                })
              )
            )
          )
        )
      )
    )
  );

  loadAllBookings$ = createEffect(() =>
    this._actions$.pipe(
      ofType(adminActions.loadAllBookings),
      withLatestFrom(this._store.select(fromCore.selectAllBookings)),
      mergeMap(([_, _bookings]) => {
        if (!_bookings || !_bookings.length) {
          return this._adminService.loadAllBookings().pipe(
            map(
              (response) =>
                adminActions.loadAllBookingsSuccess({
                  allBookings: response.courses,
                  bookingsCounts: response.bookingsCounts,
                }),
              catchError((error) =>
                of(
                  adminActions.loadAllBookingsFailure({
                    error: error?.error?.message || error?.error?.errors,
                  })
                )
              )
            )
          );
        } else {
          return of(adminActions.loadAllBookingsEnded());
        }
      })
    )
  );

  loadRunningBookings$ = createEffect(() =>
    this._actions$.pipe(
      ofType(adminActions.loadRunningBookings),
      withLatestFrom(this._store.select(fromCore.selectRunningBookings)),
      mergeMap(([_, _bookings]) => {
        if (!_bookings || !_bookings.length) {
          return this._adminService.loadRunningBookings().pipe(
            map(
              (runningBookings) =>
                adminActions.loadRunningBookingsSuccess({
                  runningBookings,
                }),
              catchError((error) =>
                of(
                  adminActions.loadRunningBookingsFailure({
                    error: error?.error?.message || error?.error?.errors,
                  })
                )
              )
            )
          );
        } else {
          return of(adminActions.loadRunningBookingsEnded());
        }
      })
    )
  );

  loadCompletedBookings$ = createEffect(() =>
    this._actions$.pipe(
      ofType(adminActions.loadCompletedBookings),
      withLatestFrom(this._store.select(fromCore.selectCompletedBookings)),
      mergeMap(([_, _bookings]) => {
        if (!_bookings || !_bookings.length) {
          return this._adminService.loadCompletedBookings().pipe(
            map(
              (completedBookings) =>
                adminActions.loadCompletedBookingsSuccess({
                  completedBookings,
                }),
              catchError((error) =>
                of(
                  adminActions.loadCompletedBookingsFailure({
                    error: error?.error?.message || error?.error?.errors,
                  })
                )
              )
            )
          );
        } else {
          return of(adminActions.loadCompletedBookingsEnded());
        }
      })
    )
  );

  loadCancelledBookings$ = createEffect(() =>
    this._actions$.pipe(
      ofType(adminActions.loadCancelledBookings),
      withLatestFrom(this._store.select(fromCore.selectCancelledBookings)),
      mergeMap(([_, _bookings]) => {
        if (!_bookings || !_bookings.length) {
          return this._adminService.loadCancelledBookings().pipe(
            map(
              (response) =>
                adminActions.loadCancelledBookingsSuccess({
                  cancelledBookings: camelcaseKeys(response.courses, {
                    deep: true,
                  }),
                  bookingsCounts: response.bookingsCounts,
                }),
              catchError((error) =>
                of(
                  adminActions.loadCancelledBookingsFailure({
                    error: error?.error?.message || error?.error?.errors,
                  })
                )
              )
            )
          );
        } else {
          return of(adminActions.loadCancelledBookingsEnded());
        }
      })
    )
  );

  loadAdminBookingPerCourse$ = createEffect(() =>
    this._actions$.pipe(
      ofType(adminActions.loadAdminBookingPerCourse),
      mergeMap(({ status }) =>
        this._adminService.loadAdminBookingPerCourse(status).pipe(
          map(
            (course) =>
              adminActions.loadAdminBookingPerCourseSuccess({
                bookingPerCourse: camelcaseKeys(course, {
                  deep: true,
                }),
              }),
            catchError((error) =>
              of(
                adminActions.loadAdminBookingPerCourseFailure({
                  error: error?.error?.message || error?.error?.errors,
                })
              )
            )
          )
        )
      )
    )
  );

  loadAdminTutorReAssignment$ = createEffect(() =>
    this._actions$.pipe(
      ofType(adminActions.loadAdminTutorReAssignment),
      mergeMap(({ status }) =>
        this._adminService.loadAdminTutorReAssignment(status).pipe(
          map(
            (result) =>
              adminActions.loadAdminTutorReAssignmentSuccess({
                tutorReAssignment: camelcaseKeys(result, {
                  deep: true,
                }),
              }),
            catchError((error) =>
              of(
                adminActions.loadAdminTutorReAssignmentFailure({
                  error: error?.error?.message || error?.error?.errors,
                })
              )
            )
          )
        )
      )
    )
  );

  loadAdminTestimonials$ = createEffect(() =>
    this._actions$.pipe(
      ofType(adminActions.loadAdminTestimonials),
      mergeMap(({ feedbackBy }) =>
        this._adminService.loadAdminTestimonials(feedbackBy).pipe(
          map(
            (result) =>
              adminActions.loadAdminTestimonialsSuccess({
                testimonials: camelcaseKeys(result, {
                  deep: true,
                }),
              }),
            catchError((error) =>
              of(
                adminActions.loadAdminTestimonialsFailure({
                  error: error?.error?.message || error?.error?.errors,
                })
              )
            )
          )
        )
      )
    )
  );

  loadAdminTestimonialFeedbackOptions$ = createEffect(() =>
    this._actions$.pipe(
      ofType(adminActions.loadAdminTestimonialFeedbackOptions),
      mergeMap(({ id }) =>
        this._adminService.loadAdminTestimonialFeedbackOptions(id).pipe(
          map(
            (result) =>
              adminActions.loadAdminTestimonialFeedbackOptionsSuccess({
                feedbackOptions: camelcaseKeys(result, {
                  deep: true,
                }),
              }),
            catchError((error) =>
              of(
                adminActions.loadAdminTestimonialFeedbackOptionsFailure({
                  error: error?.error?.message || error?.error?.errors,
                })
              )
            )
          )
        )
      )
    )
  );

  loadAdminTutorApprovalRequest$ = createEffect(() =>
    this._actions$.pipe(
      ofType(adminActions.loadAdminTutorApprovalRequest),
      mergeMap(() =>
        this._adminService.loadAdminTutorApprovalRequest().pipe(
          map(
            (result) =>
              adminActions.loadAdminTutorApprovalRequestSuccess({
                tutorApprovalRequest: camelcaseKeys(result, {
                  deep: true,
                }),
              }),
            catchError((error) =>
              of(
                adminActions.loadAdminTutorApprovalRequestFailure({
                  error: error?.error?.message || error?.error?.errors,
                })
              )
            )
          )
        )
      )
    )
  );

  adminEditTestimonialStatus$ = createEffect(() =>
    this._actions$.pipe(
      ofType(adminActions.adminEditTestimonialStatus),
      mergeMap(({ id, status }) =>
        this._adminService.adminEditTestimonialStatus(id, status).pipe(
          map(
            (result) =>
              adminActions.adminEditTestimonialStatusSuccess({
                id,
                status,
                message: 'Status changed successfully',
              }),
            catchError((error) =>
              of(
                adminActions.adminEditTestimonialStatusFailure({
                  error: error?.error?.message || error?.error?.errors,
                })
              )
            )
          )
        )
      )
    )
  );

  adminEditTestimonialFeedback$ = createEffect(() =>
    this._actions$.pipe(
      ofType(adminActions.adminEditTestimonialFeedback),
      mergeMap(({ body }) =>
        this._adminService.adminEditTestimonialFeedback(body).pipe(
          map(
            (result) =>
              adminActions.adminEditTestimonialFeedbackSuccess({
                result,
                id: body.receiver_id,
                message: 'Feedback updated successfully',
              }),
            catchError((error) =>
              of(
                adminActions.adminEditTestimonialFeedbackFailure({
                  error: error?.error?.message || error?.error?.errors,
                })
              )
            )
          )
        )
      )
    )
  );

  adminChangeTutorAvailabilityStatus$ = createEffect(() =>
    this._actions$.pipe(
      ofType(adminActions.adminChangeTutorAvailabilityStatus),
      mergeMap(({ id, status }) =>
        this._adminService.adminChangeTutorAvailabilityStatus(id, status).pipe(
          map(
            (result) =>
              adminActions.adminChangeTutorAvailabilityStatusSuccess({
                id,
                status,
                message: 'Status updated successfully',
              }),
            catchError((error) =>
              of(
                adminActions.adminChangeTutorAvailabilityStatusFailure({
                  error: error?.error?.message || error?.error?.errors,
                })
              )
            )
          )
        )
      )
    )
  );

  loadAdminTutorSchedule$ = createEffect(() =>
    this._actions$.pipe(
      ofType(adminActions.loadAdminTutorSchedule),
      mergeMap((action) =>
        this._adminService.loadAdminTutorSchedule(action?.startingDate).pipe(
          map(
            (response) =>
              adminActions.loadAdminTutorScheduleSuccess({
                schedule: response,
              }),
            catchError((error) =>
              of(
                adminActions.loadAdminTutorScheduleFailure({
                  error: error?.error?.message || error?.error?.errors,
                })
              )
            )
          )
        )
      )
    )
  );

  successMessages$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(
          ...[
            adminActions.adminRejectDocumentSuccess,
            adminActions.adminApproveDocumentSuccess,
            adminActions.adminEditTestimonialStatusSuccess,
            adminActions.adminEditTestimonialFeedbackSuccess,
          ]
        ),
        map((action) => this._alertNotificationService.success(action.message))
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
            adminActions.adminRejectDocumentFailure,
            adminActions.adminApproveDocumentFailure,
          ]
        ),
        map((action) => {
          if (action?.error) {
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
    private _router: Router,
    private _store: Store<any>,
    private _actions$: Actions,
    private _adminService: AdminService,
    private _alertNotificationService: AlertNotificationService
  ) {}
}
