import { createReducer, on } from '@ngrx/store';

import * as tutorAssignmentActions from '../actions/tutor-assignment.actions';
import * as moment from 'moment';
import { tutorResetSelectedAssignment } from '../actions/tutor-assignment.actions';

export interface State {
  assignees: any;
  assignment: any;
  assignments: any;
  studentAssignment: any;
  isLoadingAssignees: boolean;
  isAddingAssignment: boolean;
  isDeletingAssignment: boolean;
  isAcceptRejectAssignment: boolean;
  isLoadingTutorAssignment: boolean;
  isLoadingTutorAssignments: boolean;
  isLoadingTutorStudentAssignment: boolean;
}

export const initialState: State = {
  assignees: null,
  assignment: null,
  assignments: null,
  studentAssignment: null,
  isLoadingAssignees: false,
  isAddingAssignment: false,
  isDeletingAssignment: false,
  isAcceptRejectAssignment: false,
  isLoadingTutorAssignment: false,
  isLoadingTutorAssignments: false,
  isLoadingTutorStudentAssignment: false,
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
          assign.id === assignment.assignment.id
            ? assignment.assignment
            : assign
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
  ),

  on(tutorAssignmentActions.loadTutorStudentAssignmentDetail, (state) => ({
    ...state,
    isLoadingTutorStudentAssignment: true,
  })),

  on(
    tutorAssignmentActions.loadTutorStudentAssignmentDetailSuccess,
    (state, { studentAssignment }) => ({
      ...state,
      studentAssignment,
      isLoadingTutorStudentAssignment: false,
    })
  ),

  on(
    tutorAssignmentActions.loadTutorStudentAssignmentDetailFailure,
    (state) => ({
      ...state,
      isLoadingTutorStudentAssignment: false,
    })
  ),
  on(
    tutorAssignmentActions.tutorRejectAssignment,
    tutorAssignmentActions.tutorAcceptAssignment,
    (state) => ({
      ...state,
      isAcceptRejectAssignment: true,
    })
  ),

  on(
    tutorAssignmentActions.tutorRejectAssignmentFailure,
    tutorAssignmentActions.tutorAcceptAssignmentFailure,
    (state) => ({
      ...state,
      isAcceptRejectAssignment: false,
    })
  ),

  on(
    tutorAssignmentActions.tutorRejectAssignmentSuccess,
    tutorAssignmentActions.tutorAcceptAssignmentSuccess,
    (state, { status, assignmentId }) => {
      const finalState = {
        ...state,
        isAcceptRejectAssignment: false,
      };

      const _assignments = finalState.assignments?.course?.assignments;

      if (_assignments?.length) {
        let assignments = [];

        for (let i = 0; i < _assignments.length; i++) {
          let assignees = [];

          if (_assignments[i].assignees?.length) {
            for (let j = 0; j < _assignments[i].assignees.length; j++) {
              if (_assignments[i].assignees[j].assignmentId === assignmentId) {
                const assignee = {
                  ..._assignments[i].assignees[j],
                  status,
                };
                assignees.push(assignee);
              } else {
                assignees.push(_assignments[i].assignees[j]);
              }
            }
          }

          const assignment = {
            ..._assignments[i],
            assignees,
          };

          assignments.push(assignment);
        }

        const course = {
          ...finalState.assignments.course,
          assignments,
        };

        finalState.assignments = {
          ...finalState.assignments,
          course,
        };
      }

      return finalState;
    }
  ),

  on(tutorAssignmentActions.tutorResetSelectedAssignment, (state) => ({
    ...state,
    assignment: null,
  }))
);

export const selectTutorAssignments = (state: State): any => state.assignments;

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

export const selectTutorStudentAssignment = (state: State): boolean =>
  state.studentAssignment;

export const selectIsLoadingTutorStudentAssignment = (state: State): boolean =>
  state.isLoadingTutorStudentAssignment;

export const selectIsAcceptRejectAssignment = (state: State): boolean =>
  state.isAcceptRejectAssignment;

export const selectTutorFilteredAssignments = (
  state: State,
  props?: any
): any => {
  let assignments = state.assignments.course.assignments.filter(
    (assignment: any) => assignment.status === props?.status
  );

  assignments = assignments.map((assignment: any) => ({
    ...assignment,
    answerReceived: assignment.assignees.filter(
      (assignee: any) =>
        assignee?.status === 'submitted' || assignee?.status === 'completed'
    ),
    remainingDays: getRemainingDays(assignment.deadline),
  }));

  const course = {
    ...state.assignments.course,
    assignments,
  };

  return {
    ...state.assignments,
    course,
  };
};

const getRemainingDays = (deadline: string) => {
  const endDate = moment(deadline, 'YYYY-MM-DD');
  const currentDate = moment().startOf('day');

  return moment.duration(endDate.diff(currentDate)).asDays();
};
