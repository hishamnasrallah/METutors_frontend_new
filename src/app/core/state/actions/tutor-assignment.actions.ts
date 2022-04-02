import { createAction, props } from '@ngrx/store';

export const loadTutorAssignments = createAction(
  '[Tutor Assignment] Load Tutor Assignments'
);

export const loadTutorAssignmentsSuccess = createAction(
  '[Tutor Assignment] Load Tutor Assignments Success',
  props<{ assignments: any }>()
);

export const loadTutorAssignmentsFailure = createAction(
  '[Tutor Assignment] Load Tutor Assignments Failure',
  props<{ error: any }>()
);

export const loadTutorAssignment = createAction(
  '[Tutor Assignment] Load Tutor Assignment',
  props<{ id: number }>()
);

export const loadTutorAssignmentSuccess = createAction(
  '[Tutor Assignment] Load Tutor Assignment Success',
  props<{ assignment: any }>()
);

export const loadTutorAssignmentFailure = createAction(
  '[Tutor Assignment] Load Tutor Assignment Failure',
  props<{ error: any }>()
);

export const loadTutorAssignmentAssignees = createAction(
  '[Tutor Assignment] Load Tutor Assignment Assignees'
);

export const loadTutorAssignmentAssigneesSuccess = createAction(
  '[Tutor Assignment] Load Tutor Assignment Assignees Success',
  props<{ assignees: any }>()
);

export const loadTutorAssignmentAssigneesFailure = createAction(
  '[Tutor Assignment] Load Tutor Assignment Assignees Failure',
  props<{ error: any }>()
);

export const tutorAddAssignment = createAction(
  '[Tutor Assignment] Tutor Add Assignment',
  props<{ body: any }>()
);

export const tutorAddAssignmentSuccess = createAction(
  '[Tutor Assignment] Tutor Add Assignment Success',
  props<{ assignment: any; message: string }>()
);

export const tutorAddAssignmentFailure = createAction(
  '[Tutor Assignment] Tutor Add Assignment Failure',
  props<{ error: any }>()
);

export const tutorEditAssignment = createAction(
  '[Tutor Assignment] Tutor Edit Assignment',
  props<{ body: any }>()
);

export const tutorEditAssignmentSuccess = createAction(
  '[Tutor Assignment] Tutor Edit Assignment Success',
  props<{ assignment: any; message: string }>()
);

export const tutorEditAssignmentFailure = createAction(
  '[Tutor Assignment] Tutor Edit Assignment Failure',
  props<{ error: any }>()
);

export const deleteTutorAssignment = createAction(
  '[Tutor Assignment] Delete Tutor Assignment',
  props<{ id: number }>()
);

export const deleteTutorAssignmentSuccess = createAction(
  '[Tutor Assignment] Delete Tutor Assignment Success',
  props<{ id: number; message: string }>()
);

export const deleteTutorAssignmentFailure = createAction(
  '[Tutor Assignment] Delete Tutor Assignment Failure',
  props<{ error: any }>()
);

export const loadTutorStudentAssignmentDetail = createAction(
  '[Tutor Assignment] Load Tutor Student Assignment Detail',
  props<{ id: number; userId: number }>()
);

export const loadTutorStudentAssignmentDetailSuccess = createAction(
  '[Tutor Assignment] Load Tutor Student Assignment Detail Success',
  props<{ studentAssignment: any }>()
);

export const loadTutorStudentAssignmentDetailFailure = createAction(
  '[Tutor Assignment] Load Tutor Student Assignment Detail Failure',
  props<{ error: any }>()
);

export const tutorRejectAssignment = createAction(
  '[Tutor Assignment] Tutor Reject Assignment',
  props<{ body: any }>()
);

export const tutorRejectAssignmentSuccess = createAction(
  '[Tutor Assignment] Tutor Reject Assignment Success',
  props<{ message: string }>()
);

export const tutorRejectAssignmentFailure = createAction(
  '[Tutor Assignment] Tutor Reject Assignment Failure',
  props<{ error: any }>()
);
