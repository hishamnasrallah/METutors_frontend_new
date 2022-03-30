import { createReducer, on } from '@ngrx/store';

import * as tutorAssignmentActions from '../actions/tutor-assignment.actions';

export interface State {
  assignees: any;
  assignment: any;
  assignments: any;
  isLoadingAssignees: boolean;
  isAddingAssignment: boolean;
  isDeletingAssignment: boolean;
  isLoadingTutorAssignment: boolean;
  isLoadingTutorAssignments: boolean;
}

export const initialState: State = {
  assignees: null,
  assignment: null,
  assignments: null,
  isLoadingAssignees: false,
  isAddingAssignment: false,
  isDeletingAssignment: false,
  isLoadingTutorAssignment: false,
  isLoadingTutorAssignments: false,
};

export const reducer = createReducer(
  initialState,

  on(tutorAssignmentActions.loadTutorAssignmentAssignees, (state) => ({
    ...state,
    isLoadingAssignees: true,
  })),

  on(
    tutorAssignmentActions.loadTutorAssignmentAssigneesSuccess,
    (state, { assignees }) => ({
      ...state,
      assignees,
      isLoadingAssignees: false,
    })
  ),

  on(tutorAssignmentActions.loadTutorAssignmentAssigneesFailure, (state) => ({
    ...state,
    isLoadingAssignees: false,
  })),

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

  on(tutorAssignmentActions.deleteTutorAssignment, (state) => ({
    ...state,
    isDeletingAssignment: true,
  })),

  on(tutorAssignmentActions.deleteTutorAssignmentSuccess, (state, { id }) => {
    const finalState = {
      ...state,
      isDeletingAssignment: false,
    };

    if (
      finalState.assignments?.course?.assignments &&
      finalState.assignments?.course.assignments?.length
    ) {
      const assignments = finalState.assignments.course.assignments.filter(
        (assign: any) => assign.id !== id
      );

      const course = {
        ...finalState.assignments?.course,
        assignments,
      };

      finalState.assignments = {
        ...finalState.assignments,
        course,
      };
    }

    return finalState;
  }),

  on(tutorAssignmentActions.deleteTutorAssignmentFailure, (state) => ({
    ...state,
    isDeletingAssignment: false,
  })),

  on(
    tutorAssignmentActions.tutorAddAssignment,
    tutorAssignmentActions.tutorEditAssignment,
    (state) => ({
      ...state,
      isAddingAssignment: true,
    })
  ),

  on(
    tutorAssignmentActions.tutorAddAssignmentFailure,
    tutorAssignmentActions.tutorEditAssignmentFailure,
    (state) => ({
      ...state,
      isAddingAssignment: false,
    })
  ),
  on(
    tutorAssignmentActions.tutorAddAssignmentSuccess,
    (state, { assignment }) => {
      const finalState = {
        ...state,
        isAddingAssignment: false,
      };

      const assignments = [...finalState.assignments?.course?.assignments];

      assignments.unshift(assignment.assignment);

      const course = {
        ...finalState.assignments.course,
        assignments,
      };

      finalState.assignments = {
        ...finalState.assignments,
        course,
      };

      return finalState;
    }
  ),
  on(
    tutorAssignmentActions.tutorEditAssignmentSuccess,
    (state, { assignment }) => {
      const finalState = {
        ...state,
        isAddingAssignment: false,
      };

      const assignments = finalState.assignments?.course?.assignments.map(
        (assign: any) =>
          assign.id === assignment.assignment.id ? assignment : assign
      );

      const course = {
        ...finalState.assignments.course,
        assignments,
      };

      finalState.assignments = {
        ...finalState.assignments,
        course,
      };

      return finalState;
    }
  )
);

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

export const selectTutorAssignmentAssignees = (state: State): boolean =>
  state.assignees;

export const selectIsLoadingAssignees = (state: State): boolean =>
  state.isLoadingAssignees;

export const selectIsLoadingTutorAssignment = (state: State): boolean =>
  state.isLoadingTutorAssignment;

export const selectIsAddingAssignment = (state: State): boolean =>
  state.isAddingAssignment;

export const selectIsDeletingTutorAssignment = (state: State): boolean =>
  state.isDeletingAssignment;
