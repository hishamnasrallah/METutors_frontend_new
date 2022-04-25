import { IStudent } from '@metutor/core/models';
import { createReducer, on } from '@ngrx/store';

import * as moment from 'moment';
import camelcaseKeys from 'camelcase-keys';
import * as uploadActions from '../actions/upload.actions';
import * as studentActions from '../actions/student.actions';

export interface State {
  resource: any;
  syllabus: any;
  dashboard: any;
  classroom: any;
  resources: any;
  timeSlots: any;
  attendance: any;
  assignment: any;
  assignments: any;
  preferences: any;
  feedbackOptions: any;
  classesDashboard: any;
  isMakeupClass: boolean;
  isJoiningClass: boolean;
  student: IStudent | null;
  submittedAssignment: any;
  isLoadingStudents: boolean;
  isUpdatingProfile: boolean;
  isCreatingNewClass: boolean;
  students: IStudent[] | null;
  isLoadingTimeSlots: boolean;
  isSubmittingFeedback: boolean;
  isLoadingPreferences: boolean;
  isSubmittingAssignment: boolean;
  isLoadingStudentSyllabus: boolean;
  isLoadingStudentResource: boolean;
  isLoadingStudentResources: boolean;
  isLoadingStudentDashboard: boolean;
  isLoadingStudentClassroom: boolean;
  isLoadingStudentAttendance: boolean;
  isLoadingStudentAssignment: boolean;
  isLoadingStudentAssignments: boolean;
  isLoadingStudentFeedbackOptions: boolean;
  isLoadingStudentClassesDashboard: boolean;
  isLoadingStudentSubmittedAssignment: boolean;
}

export const initialState: State = {
  student: null,
  resource: null,
  syllabus: null,
  students: null,
  timeSlots: null,
  dashboard: null,
  resources: null,
  classroom: null,
  preferences: null,
  assignment: null,
  attendance: null,
  assignments: null,
  isMakeupClass: false,
  feedbackOptions: null,
  isJoiningClass: false,
  classesDashboard: null,
  isLoadingStudents: false,
  isUpdatingProfile: false,
  isLoadingTimeSlots: false,
  isCreatingNewClass: false,
  submittedAssignment: null,
  isLoadingPreferences: false,
  isSubmittingFeedback: false,
  isSubmittingAssignment: false,
  isLoadingStudentSyllabus: false,
  isLoadingStudentResource: false,
  isLoadingStudentResources: false,
  isLoadingStudentDashboard: false,
  isLoadingStudentClassroom: false,
  isLoadingStudentAttendance: false,
  isLoadingStudentAssignment: false,
  isLoadingStudentAssignments: false,
  isLoadingStudentFeedbackOptions: false,
  isLoadingStudentClassesDashboard: false,
  isLoadingStudentSubmittedAssignment: false,
};

export const reducer = createReducer(
  initialState,

  on(studentActions.loadStudent, (state) => ({
    ...state,
    isLoadingStudents: true,
  })),

  on(studentActions.loadStudentSuccess, (state, { student }) => ({
    ...state,
    student,
    isLoadingStudents: false,
  })),

  on(studentActions.loadStudentFailure, (state, { error }) => ({
    ...state,
    isLoadingStudents: false,
    loadingStudentsFailure: error,
  })),

  on(studentActions.loadStudentEnded, (state) => ({
    ...state,
    isLoadingStudents: false,
  })),

  on(uploadActions.changeAvatarSuccess, (state, { avatar }) => {
    const finalState = {
      ...state,
    };

    console.log(avatar);
    if (finalState.student) {
      finalState.student = {
        ...finalState.student,
        avatar,
      };
    }

    return finalState;
  }),

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
  })),

  on(studentActions.studentSubmitAssignment, (state) => ({
    ...state,
    isSubmittingAssignment: true,
  })),

  on(studentActions.studentSubmitAssignmentSuccess, (state) => ({
    ...state,
    isSubmittingAssignment: false,
  })),

  on(studentActions.studentSubmitAssignmentFailure, (state) => ({
    ...state,
    isSubmittingAssignment: false,
  })),

  on(studentActions.loadStudentSubmittedAssignment, (state) => ({
    ...state,
    isLoadingStudentSubmittedAssignment: true,
  })),

  on(
    studentActions.loadStudentSubmittedAssignmentSuccess,
    (state, { submittedAssignment }) => ({
      ...state,
      submittedAssignment,
      isLoadingStudentSubmittedAssignment: false,
    })
  ),

  on(studentActions.loadStudentSubmittedAssignmentFailure, (state) => ({
    ...state,
    isLoadingStudentSubmittedAssignment: false,
  })),

  on(studentActions.loadStudentAttendance, (state) => ({
    ...state,
    isLoadingStudentAttendance: true,
  })),

  on(studentActions.loadStudentAttendanceSuccess, (state, { attendance }) => ({
    ...state,
    attendance,
    isLoadingStudentAttendance: false,
  })),

  on(studentActions.loadStudentAttendanceFailure, (state) => ({
    ...state,
    isLoadingStudentAttendance: false,
  })),

  on(
    studentActions.loadStudentFeedbackOptions,
    studentActions.loadStudentPlatformFeedbackOptions,
    (state) => ({
      ...state,
      isLoadingStudentFeedbackOptions: true,
    })
  ),

  on(
    studentActions.loadStudentFeedbackOptionsSuccess,
    studentActions.loadStudentPlatformFeedbackOptionsSuccess,
    (state, { feedbackOptions }) => ({
      ...state,
      feedbackOptions,
      isLoadingStudentFeedbackOptions: false,
    })
  ),

  on(
    studentActions.loadStudentFeedbackOptionsFailure,
    studentActions.loadStudentPlatformFeedbackOptionsFailure,
    (state) => ({
      ...state,
      isLoadingStudentFeedbackOptions: false,
    })
  ),

  on(
    studentActions.studentSubmitFeedback,
    studentActions.studentSubmitPlatformFeedback,
    (state) => ({
      ...state,
      isSubmittingFeedback: true,
    })
  ),

  on(
    studentActions.studentSubmitFeedbackSuccess,
    studentActions.studentSubmitPlatformFeedbackSuccess,
    (state) => ({
      ...state,
      isSubmittingFeedback: false,
    })
  ),

  on(
    studentActions.studentSubmitFeedbackFailure,
    studentActions.studentSubmitPlatformFeedbackFailure,
    (state) => ({
      ...state,
      isSubmittingFeedback: false,
    })
  ),

  on(
    studentActions.studentUpdateProfile,
    studentActions.studentUpdatePreferences,
    (state) => ({
      ...state,
      isUpdatingProfile: true,
    })
  ),

  on(
    studentActions.studentUpdateProfileSuccess,
    studentActions.studentUpdatePreferencesSuccess,
    (state, { body, isPreference }) => {
      const finalState = {
        ...state,
        isUpdatingProfile: false,
      };

      if (finalState.student && !isPreference) {
        finalState.student = {
          ...finalState.student,
          ...camelcaseKeys(body, { deep: true }),
        };
      }

      if (finalState.preferences && isPreference) {
        const teacherLanguage = body?.teacher_language;
        finalState.preferences = {
          ...finalState.preferences,
          teacherLanguage,
          ...camelcaseKeys(body, { deep: true }),
        };
      }

      return finalState;
    }
  ),

  on(
    studentActions.studentUpdateProfileFailure,
    studentActions.studentUpdatePreferencesFailure,
    (state) => ({
      ...state,
      isUpdatingProfile: false,
    })
  ),

  on(studentActions.loadStudentPreference, (state) => ({
    ...state,
    isLoadingPreferences: true,
  })),

  on(studentActions.loadStudentPreferenceSuccess, (state, { preferences }) => ({
    ...state,
    preferences,
    isLoadingPreferences: false,
  })),

  on(studentActions.loadStudentPreferenceFailure, (state) => ({
    ...state,
    isLoadingPreferences: false,
  })),

  on(studentActions.loadStudentPreferenceEnded, (state) => ({
    ...state,
    isLoadingPreferences: false,
  })),

  on(studentActions.loadMakeupClassSlots, (state) => ({
    ...state,
    isLoadingTimeSlots: true,
  })),

  on(studentActions.loadMakeupClassSlotsSuccess, (state, { timeSlots }) => ({
    ...state,
    timeSlots,
    isLoadingTimeSlots: false,
  })),

  on(studentActions.loadMakeupClassSlotsFailure, (state) => ({
    ...state,
    isLoadingTimeSlots: false,
  })),

  on(studentActions.studentMakeupClass, (state) => ({
    ...state,
    isMakeupClass: true,
  })),

  on(studentActions.studentMakeupClassSuccess, (state) => ({
    ...state,
    isMakeupClass: false,
  })),

  on(studentActions.studentMakeupClassFailure, (state) => ({
    ...state,
    isMakeupClass: false,
  })),

  on(studentActions.studentAddNewClass, (state) => ({
    ...state,
    isCreatingNewClass: true,
  })),

  on(studentActions.studentAddNewClassSuccess, (state) => ({
    ...state,
    isCreatingNewClass: false,
  })),

  on(studentActions.studentAddNewClassFailure, (state) => ({
    ...state,
    isCreatingNewClass: false,
  }))
);

export const selectStudent = (state: State): IStudent | null => state.student;

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

export const selectIsCreatingNewClass = (state: State): boolean =>
  state.isCreatingNewClass;

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

export const selectStudentSubmittedAssignment = (state: State): boolean =>
  state.submittedAssignment;

export const selectIsLoadingStudentSubmittedAssignment = (
  state: State
): boolean => state.isLoadingStudentSubmittedAssignment;

export const selectStudentAttendance = (state: State): any => state.attendance;

export const selectIsLoadingStudentAttendance = (state: State): boolean =>
  state.isLoadingStudentAttendance;

export const selectStudentFeedbackOptions = (state: State): any =>
  state.feedbackOptions;

export const selectIsLoadingStudentFeedbackOptions = (state: State): boolean =>
  state.isLoadingStudentFeedbackOptions;

export const selectIsSubmittingFeedback = (state: State): boolean =>
  state.isSubmittingFeedback;
2;

export const selectIsUpdatingStudentProfile = (state: State): boolean =>
  state.isUpdatingProfile;

export const selectIsLoadingStudentPreferences = (state: State): boolean =>
  state.isLoadingPreferences;

export const selectStudentPreferences = (state: State): any =>
  state.preferences;

export const selectIsLoadingTimeSlots = (state: State): boolean =>
  state.isLoadingTimeSlots;

export const selectIsStudentMakeupClass = (state: State): boolean =>
  state.isMakeupClass;

export const selectStudentTimeSlots = (state: State): any => state.timeSlots;

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
