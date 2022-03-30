import { IStudent } from '@metutor/core/models';
import { createReducer, on } from '@ngrx/store';

import * as moment from 'moment';
import * as studentActions from '../actions/student.actions';

export interface State {
  resource: any;
  syllabus: any;
  dashboard: any;
  classroom: any;
  resources: any;
  assignments: any;
  assignment: any;
  classesDashboard: any;
  isJoiningClass: boolean;
  students: IStudent[] | null;
  isLoadingStudents: boolean;
  isSubmittingAssignment: boolean;
  isLoadingStudentSyllabus: boolean;
  isLoadingStudentResource: boolean;
  isLoadingStudentResources: boolean;
  isLoadingStudentDashboard: boolean;
  isLoadingStudentClassroom: boolean;
  isLoadingStudentAssignment: boolean;
  isLoadingStudentAssignments: boolean;
  isLoadingStudentClassesDashboard: boolean;
}

export const initialState: State = {
  resource: null,
  syllabus: null,
  students: null,
  dashboard: null,
  resources: null,
  classroom: null,
  assignment: null,
  assignments: null,
  isJoiningClass: false,
  classesDashboard: null,
  isLoadingStudents: false,
  isSubmittingAssignment: false,
  isLoadingStudentSyllabus: false,
  isLoadingStudentResource: false,
  isLoadingStudentResources: false,
  isLoadingStudentDashboard: false,
  isLoadingStudentClassroom: false,
  isLoadingStudentAssignment: false,
  isLoadingStudentAssignments: false,
  isLoadingStudentClassesDashboard: false,
};

export const reducer = createReducer(
  initialState,

  on(studentActions.loadStudents, (state) => ({
    ...state,
    isLoadingStudents: true,
  })),

  on(studentActions.loadStudentsSuccess, (state, { students }) => ({
    ...state,
    students,
    isLoadingStudents: false,
  })),

  on(studentActions.loadStudentsFailure, (state, { error }) => ({
    ...state,
    isLoadingStudents: false,
    loadingStudentsFailure: error,
  })),

  on(studentActions.loadStudentsEnded, (state) => ({
    ...state,
    isLoadingStudents: false,
  })),

  on(studentActions.loadStudentDashboard, (state) => ({
    ...state,
    isLoadingStudentDashboard: true,
  })),

  on(studentActions.loadStudentDashboardSuccess, (state, { dashboard }) => ({
    ...state,
    dashboard,
    isLoadingStudentDashboard: false,
  })),

  on(studentActions.loadStudentDashboardFailure, (state) => ({
    ...state,
    isLoadingStudentDashboard: false,
  })),

  on(studentActions.loadStudentDashboardEnded, (state) => ({
    ...state,
    isLoadingStudentDashboard: false,
  })),

  on(studentActions.loadStudentClassroom, (state) => ({
    ...state,
    isLoadingStudentClassroom: true,
  })),

  on(studentActions.loadStudentClassroomSuccess, (state, { classroom }) => ({
    ...state,
    classroom,
    isLoadingStudentClassroom: false,
  })),

  on(studentActions.loadStudentClassroomFailure, (state) => ({
    ...state,
    isLoadingStudentClassroom: false,
  })),

  on(studentActions.loadStudentClassesDashboard, (state) => ({
    ...state,
    isLoadingStudentClassesDashboard: true,
  })),

  on(
    studentActions.loadStudentClassesDashboardSuccess,
    (state, { classesDashboard }) => ({
      ...state,
      classesDashboard,
      isLoadingStudentClassesDashboard: false,
    })
  ),

  on(studentActions.loadStudentClassesDashboardFailure, (state) => ({
    ...state,
    isLoadingStudentClassesDashboard: false,
  })),

  on(studentActions.loadStudentSyllabus, (state) => ({
    ...state,
    isLoadingStudentSyllabus: true,
  })),

  on(studentActions.loadStudentSyllabusSuccess, (state, { syllabus }) => ({
    ...state,
    syllabus,
    isLoadingStudentSyllabus: false,
  })),

  on(studentActions.loadStudentSyllabusFailure, (state) => ({
    ...state,
    isLoadingStudentSyllabus: false,
  })),

  on(studentActions.loadStudentResources, (state) => ({
    ...state,
    isLoadingStudentResources: true,
  })),

  on(studentActions.loadStudentResourcesSuccess, (state, { resources }) => ({
    ...state,
    resources,
    isLoadingStudentResources: false,
  })),

  on(studentActions.loadStudentResourcesFailure, (state) => ({
    ...state,
    isLoadingStudentResources: false,
  })),

  on(studentActions.loadStudentResource, (state) => ({
    ...state,
    isLoadingStudentResource: true,
  })),

  on(studentActions.loadStudentResourceSuccess, (state, { resource }) => ({
    ...state,
    resource,
    isLoadingStudentResource: false,
  })),

  on(studentActions.loadStudentResourceFailure, (state) => ({
    ...state,
    isLoadingStudentResource: false,
  })),

  on(studentActions.studentJoinClass, (state) => ({
    ...state,
    isJoiningClass: true,
  })),

  on(studentActions.studentJoinClassSuccess, (state) => ({
    ...state,
    isJoiningClass: false,
  })),

  on(studentActions.studentJoinClassFailure, (state) => ({
    ...state,
    isJoiningClass: false,
  })),

  on(studentActions.loadStudentAssignments, (state) => ({
    ...state,
    isLoadingStudentAssignments: true,
  })),

  on(
    studentActions.loadStudentAssignmentsSuccess,
    (state, { assignments }) => ({
      ...state,
      assignments,
      isLoadingStudentAssignments: false,
    })
  ),

  on(studentActions.loadStudentAssignmentsFailure, (state) => ({
    ...state,
    isLoadingStudentAssignments: false,
  })),

  on(studentActions.loadStudentAssignment, (state) => ({
    ...state,
    isLoadingStudentAssignment: true,
  })),

  on(studentActions.loadStudentAssignmentSuccess, (state, { assignment }) => ({
    ...state,
    assignment,
    isLoadingStudentAssignment: false,
  })),

  on(studentActions.loadStudentAssignmentFailure, (state) => ({
    ...state,
    isLoadingStudentAssignment: false,
  }))
);

export const selectStudents = (state: State): IStudent[] | null =>
  state.students;

export const selectIsLoadingStudents = (state: State): boolean =>
  state.isLoadingStudents;

export const selectStudentDashboard = (state: State): boolean =>
  state.dashboard;

export const selectStudentClassesDashboard = (state: State): boolean =>
  state.classesDashboard;

export const selectIsLoadingStudentDashboard = (state: State): boolean =>
  state.isLoadingStudentDashboard;

export const selectActiveClassroomCourses = (state: State): any =>
  state.classroom?.activeCourses;

export const selectClassroomLastActivityCourse = (state: State): any =>
  state.classroom?.lastActivityCourse;

export const selectCompletedClassroomCourses = (state: State): any =>
  state?.classroom?.completedCourses;

export const selectClassroomCoursePrograms = (state: State): any =>
  state?.classroom?.programs;

export const selectClassroomCourseFieldOfStudies = (state: State): any =>
  state?.classroom?.fieldOfStudies;

export const selectIsLoadingStudentClassroom = (state: State): boolean =>
  state.isLoadingStudentClassroom;

export const selectStudentSyllabus = (state: State): boolean => state.syllabus;

export const selectIsLoadingStudentClassesDashboard = (state: State): boolean =>
  state.isLoadingStudentClassesDashboard;

export const selectIsLoadingStudentSyllabus = (state: State): boolean =>
  state.isLoadingStudentSyllabus;

export const selectStudentResources = (state: State): boolean =>
  state.resources;

export const selectIsLoadingStudentResources = (state: State): boolean =>
  state.isLoadingStudentResources;

export const selectStudentResource = (state: State): boolean => state.resource;

export const selectIsLoadingStudentResource = (state: State): boolean =>
  state.isLoadingStudentResource;

export const selectIsJoiningClass = (state: State): boolean =>
  state.isJoiningClass;

export const selectStudentAssignments = (state: State): boolean =>
  state.assignments;

export const selectIsLoadingStudentAssignments = (state: State): boolean =>
  state.isLoadingStudentAssignments;

export const selectStudentAssignment = (state: State): boolean =>
  state.assignment;

export const selectIsLoadingStudentAssignment = (state: State): boolean =>
  state.isLoadingStudentAssignment;

export const selectIsSubmittingAssignment = (state: State): boolean =>
  state.isSubmittingAssignment;

export const selectFilteredStudents = (
  state: State,
  props?: any
): IStudent[] | null => {
  let students: IStudent[] = [];

  if (state.students && state.students.length && props) {
    students = getFilteredStudents(state.students, props);
  }

  return students;
};

export const selectStudentFilteredAssignments = (
  state: State,
  props?: any
): any => {
  let assignments = state.assignments.course.assignments.filter(
    (assignment: any) => assignment.status === props?.status
  );

  assignments = assignments.map((assignment: any) => ({
    ...assignment,
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

const getFilteredStudents = (students: IStudent[], props: any) => {
  if (props?.name) {
    students = students?.filter((student) =>
      student?.name?.toLowerCase()?.includes(props.name.toLowerCase())
    );
  }

  return students;
};
