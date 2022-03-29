import { createReducer, on } from '@ngrx/store';

import * as tutorAssignmentActions from '../actions/tutor-assignment.actions';

export interface State {
  assignments: any;
  assignment: any;
  isAddingAssignment: boolean;
  isLoadingTutorAssignment: boolean;
  isLoadingTutorAssignments: boolean;
}

export const initialState: State = {
  assignment: null,
  assignments: null,
  isAddingAssignment: false,
  isLoadingTutorAssignment: false,
  isLoadingTutorAssignments: false,
};

export const reducer = createReducer(
  initialState,

  //Tutor assignments
  on(tutorAssignmentActions.loadTutorAssignments, (state) => ({
    ...state,
    isLoadingTutorAssignments: true,
  })),

  on(
    tutorAssignmentActions.loadTutorAssignmentsSuccess,
    (state, { assignments }) => ({
      ...state,
      assignments,
      isLoadingTutorAssignments: false,
    })
  ),

  on(tutorAssignmentActions.loadTutorAssignmentsFailure, (state) => ({
    ...state,
    isLoadingTutorAssignments: false,
  })),

  on(tutorAssignmentActions.loadTutorAssignment, (state) => ({
    ...state,
    isLoadingTutorAssignment: true,
  })),

  on(
    tutorAssignmentActions.loadTutorAssignmentSuccess,
    (state, { assignment }) => ({
      ...state,
      assignment,
      isLoadingTutorAssignment: false,
    })
  ),

  on(tutorAssignmentActions.loadTutorAssignmentFailure, (state) => ({
    ...state,
    isLoadingTutorAssignment: false,
  })),

  on(tutorAssignmentActions.tutorAddAssignment, (state) => ({
    ...state,
    isAddingAssignment: true,
  })),

  on(
    tutorAssignmentActions.tutorAddAssignmentSuccess,
    (state, { assignment }) => {
      const finalState = {
        ...state,
        isAddingAssignment: false,
      };

      console.log(assignment);

      return finalState;
    }
  ),

  on(tutorAssignmentActions.tutorAddAssignmentFailure, (state) => ({
    ...state,
    isAddingAssignment: false,
  }))
);

// Assignments
export const selectTutorAssignments = (state: State): any => state.assignments;

export const selectTutorActiveAssignments = (state: State): any => {
  const assignments = state.assignments.course.assignments.filter(
    (assignment: any) => assignment.status === 'active'
  );

  const course = {
    ...state.assignments.course,
    assignments,
  };

  return {
    ...state.assignments,
    course,
  };
};

export const selectTutorCompletedAssignments = (state: State): any => {
  const assignments = state.assignments.course.assignments.filter(
    (assignment: any) => assignment.status === 'completed'
  );

  const course = {
    ...state.assignments.course,
    assignments,
  };

  return {
    ...state.assignments,
    course,
  };
};

export const selectIsLoadingTutorAssignments = (state: State): boolean =>
  state.isLoadingTutorAssignments;

export const selectTutorAssignment = (state: State): boolean =>
  state.assignment;

export const selectIsLoadingTutorAssignment = (state: State): boolean =>
  state.isLoadingTutorAssignment;

export const selectIsAddingAssignment = (state: State): boolean =>
  state.isAddingAssignment;
