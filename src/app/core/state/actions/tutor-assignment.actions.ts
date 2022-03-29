import { createAction, props } from '@ngrx/store';

// Tutor assignments
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
