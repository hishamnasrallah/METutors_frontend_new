import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { AdminService } from '@services';
import { Injectable } from '@angular/core';
import camelcaseKeys from 'camelcase-keys';
import * as fromRouterStore from '@metutor/state';
import * as adminActions from '../actions/admin.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AlertNotificationService } from '@metutor/core/components';
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators';

@Injectable()
export class AdminEffects {
  loadAdminDocuments$ = createEffect(() =>
    this._actions$.pipe(
      ofType(adminActions.loadAdminDocuments),
      withLatestFrom(this._store.select(fromRouterStore.selectRouteParams)),
      mergeMap(([_, { id }]) =>
        this._adminService.loadAdminDocuments(id).pipe(
          map(
            (documents) =>
              adminActions.loadAdminDocumentsSuccess({
                documents: camelcaseKeys(documents, {
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
        )
      )
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
      mergeMap(({ document }) =>
        this._adminService.adminApproveDocument(document.id).pipe(
          map(
            (documents) =>
              adminActions.adminApproveDocumentSuccess({
                document,
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
      mergeMap(({ document }) =>
        this._adminService.adminRejectDocument(document.id).pipe(
          map(
            (documents) =>
              adminActions.adminRejectDocumentSuccess({
                document,
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
      mergeMap(({ params }) =>
        this._adminService.loadWorkforceCapacity(params).pipe(
          map(
            ({ total, workforceCapacity }) =>
              adminActions.loadWorkforceCapacitySuccess({
                total,
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
        )
      )
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
      ofType(adminActions.loadBookings),
      mergeMap(({ params }) =>
        this._adminService.loadBookings(params).pipe(
          map(
            (response) =>
              adminActions.loadBookingsSuccess({
                bookings: response.courses,
                bookingCounts: response.bookingsCounts,
              }),
            catchError((error) =>
              of(
                adminActions.loadBookingsFailure({
                  error: error?.error?.message || error?.error?.errors,
                })
              )
            )
          )
        )
      )
    )
  );

  loadCancelledBookings$ = createEffect(() =>
    this._actions$.pipe(
      ofType(adminActions.loadCancelledBookings),
      mergeMap(({ params }) =>
        this._adminService.loadCancelledBookings(params).pipe(
          map(
            ({ courses, bookingCounts }) =>
              adminActions.loadCancelledBookingsSuccess({
                cancelledBookings: camelcaseKeys(courses, {
                  deep: true,
                }),
                bookingCounts,
              }),
            catchError((error) =>
              of(
                adminActions.loadCancelledBookingsFailure({
                  error: error?.error?.message || error?.error?.errors,
                })
              )
            )
          )
        )
      )
    )
  );

  loadAdminBookingPerCourse$ = createEffect(() =>
    this._actions$.pipe(
      ofType(adminActions.loadAdminBookingPerCourse),
      mergeMap(({ params }) =>
        this._adminService.loadAdminBookingPerCourse(params).pipe(
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
      mergeMap(({ params }) =>
        this._adminService.loadAdminTutorReAssignment(params).pipe(
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
      mergeMap(({ params }) =>
        this._adminService.loadAdminTestimonials(params).pipe(
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
      mergeMap(({ params }) =>
        this._adminService.loadAdminTutorApprovalRequest(params).pipe(
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
      mergeMap(({ params, startingDate }) =>
        this._adminService.loadAdminTutorSchedule(params, startingDate).pipe(
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
            return this._alertNotificationService.error('SOMETHING_WENT_WRONG');
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
    private _adminService: AdminService,
    private _alertNotificationService: AlertNotificationService
  ) {}
}
