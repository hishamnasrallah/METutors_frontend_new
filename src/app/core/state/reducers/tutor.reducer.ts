import { createReducer, on } from '@ngrx/store';

import { ITutor } from '@models';
import * as tutorActions from '../actions/tutor.actions';
import * as courseActions from '../actions/course.actions';
import * as tutorModalActions from '@metutor/modules/tutor/state/actions';

export interface State {
  syllabus: any;
  dashboard: any;
  resource: any;
  resources: any;
  assignments: any;
  assignment: any;
  tutor: ITutor | null;
  isLoadingTutors: boolean;
  isDeletingTopic: boolean;
  isLaunchingClass: boolean;
  isLoadingSyllabus: boolean;
  isLoadingDashboard: boolean;
  isDeletingResource: boolean;
  loadingTutorFailure: string;
  isSavingSubjectTitle: boolean;
  isAddingSyllabusTopic: boolean;
  isLoadingTutorResource: boolean;
  isAddingTutorResources: boolean;
  isLoadingTutorResources: boolean;
  isLoadingTutorAssignment: boolean;
  subjectTitleEditedSuccess: boolean;
  isLoadingTutorAssignments: boolean;

  // Complete Tutor Profile
  isCompleteTutorProfile: boolean;
  completeTutorProfileFailure: string;
}

export const initialState: State = {
  tutor: null,
  syllabus: null,
  resource: null,
  resources: null,
  dashboard: null,
  assignment: null,
  assignments: null,
  isLoadingTutors: false,
  isDeletingTopic: false,
  isLaunchingClass: false,
  loadingTutorFailure: '',
  isLoadingSyllabus: false,
  isDeletingResource: false,
  isLoadingDashboard: false,
  isSavingSubjectTitle: false,
  isAddingSyllabusTopic: false,
  isCompleteTutorProfile: false,
  isAddingTutorResources: false,
  isLoadingTutorResource: false,
  isLoadingTutorResources: false,
  completeTutorProfileFailure: '',
  isLoadingTutorAssignment: false,
  subjectTitleEditedSuccess: false,
  isLoadingTutorAssignments: false,
};

export const reducer = createReducer(
  initialState,
  on(tutorActions.loadTutor, (state) => ({
    ...state,
    isLoadingTutors: true,
  })),

  on(tutorActions.loadTutorSuccess, (state, { tutor }) => ({
    ...state,
    tutor,
    isLoadingTutors: false,
  })),

  on(tutorActions.loadTutorFailure, (state, { error }) => ({
    ...state,
    isLoadingTutors: false,
    loadingTutorFailure: error,
  })),

  on(tutorActions.loadTutorDashboard, (state) => ({
    ...state,
    isLoadingDashboard: true,
  })),

  on(tutorActions.loadTutorDashboardSuccess, (state, { dashboard }) => ({
    ...state,
    dashboard,
    isLoadingDashboard: false,
  })),

  on(tutorActions.loadTutorDashboardFailure, (state, { error }) => ({
    ...state,
    isLoadingDashboard: false,
  })),

  on(tutorActions.loadTutorDashboardEnded, (state) => ({
    ...state,
    isLoadingDashboard: false,
  })),

  on(tutorActions.completeTutorProfile, (state) => ({
    ...state,
    isCompleteTutorProfile: true,
  })),

  on(tutorActions.completeTutorProfileSuccess, (state) => ({
    ...state,
    isCompleteTutorProfile: false,
  })),

  on(tutorActions.completeTutorProfileFailure, (state, { error }) => ({
    ...state,
    isCompleteTutorProfile: false,
    completeTutorProfileFailure: error,
  })),

  on(tutorActions.loadTutorSyllabus, (state) => ({
    ...state,
    isLoadingSyllabus: true,
  })),

  on(tutorActions.loadTutorSyllabusSuccess, (state, { syllabus }) => ({
    ...state,
    syllabus,
    isLoadingSyllabus: false,
  })),

  on(tutorActions.loadTutorSyllabusFailure, (state) => ({
    ...state,
    isLoadingSyllabus: false,
  })),

  on(tutorActions.tutorAddSyllabusTopic, (state) => ({
    ...state,
    isAddingSyllabusTopic: true,
  })),

  on(tutorActions.tutorAddSyllabusTopicSuccess, (state, { syllabus }) => {
    let finalState = {
      ...state,
      isAddingSyllabusTopic: false,
    };

    const topics = [...finalState.syllabus.topics];
    topics.push(syllabus.topicDetail);

    finalState.syllabus = {
      ...finalState.syllabus,
      topics,
      unclassifiedClasses: syllabus.unclassifiedClasses,
    };

    return finalState;
  }),

  on(tutorActions.tutorAddSyllabusTopicFailure, (state) => ({
    ...state,
    isAddingSyllabusTopic: false,
  })),

  on(tutorActions.tutorEditSyllabusTopic, (state) => ({
    ...state,
    isAddingSyllabusTopic: true,
  })),

  on(tutorActions.tutorEditSyllabusTopicSuccess, (state, { syllabus }) => {
    let finalState = {
      ...state,
      isAddingSyllabusTopic: false,
    };

    const topics = finalState.syllabus.topics.map((item: any) =>
      item.topic.id === syllabus.topicDetail.topic.id
        ? syllabus.topicDetail
        : item
    );

    finalState.syllabus = {
      ...finalState.syllabus,
      topics,
      unclassifiedClasses: syllabus.unclassifiedClasses,
    };

    return finalState;
  }),

  on(tutorActions.tutorEditSyllabusTopicFailure, (state) => ({
    ...state,
    isAddingSyllabusTopic: false,
  })),

  on(tutorActions.tutorDeleteSyllabusTopic, (state) => ({
    ...state,
    isDeletingTopic: true,
  })),

  on(tutorActions.tutorDeleteSyllabusTopicSuccess, (state, { data }) => {
    const finalState = {
      ...state,
      isDeletingTopic: false,
    };

    if (finalState.syllabus?.topics?.length) {
      const topics = finalState.syllabus?.topics.filter(
        (item: any) => item.topic.id !== data.deletedTopic?.id
      );

      finalState.syllabus = {
        ...finalState.syllabus,
        topics,
        unclassifiedClasses: data?.unclassifiedClasses,
      };
    }
    return finalState;
  }),

  on(tutorActions.tutorDeleteSyllabusTopicFailure, (state) => ({
    ...state,
    isDeletingTopic: false,
  })),

  on(tutorActions.tutorEditSubjectTitle, (state) => ({
    ...state,
    isSavingSubjectTitle: true,
    subjectTitleEditedSuccess: false,
  })),

  on(tutorActions.tutorEditSubjectTitleSuccess, (state, { title, classId }) => {
    const finalState = {
      ...state,
      isSavingSubjectTitle: false,
      subjectTitleEditedSuccess: true,
    };

    if (finalState.syllabus.unclassifiedClasses?.length) {
      const unclassifiedClasses = finalState.syllabus.unclassifiedClasses.map(
        (item: any) => (item.id === classId ? { ...item, title } : item)
      );

      finalState.syllabus = {
        ...finalState.syllabus,
        unclassifiedClasses,
      };
    }

    if (finalState.syllabus?.topics?.length) {
      let topics = [];
      for (let i = 0; i < finalState.syllabus.topics?.length; i++) {
        let classes = [];
        if (finalState.syllabus.topics[i]?.topic?.classes?.length) {
          for (
            let j = 0;
            j < finalState.syllabus.topics[i].topic.classes.length;
            j++
          ) {
            if (
              finalState.syllabus.topics[i].topic.classes[j]?.id === classId
            ) {
              const cls = {
                ...finalState.syllabus.topics[i].topic.classes[j],
                title,
              };
              classes.push(cls);
            } else {
              classes.push(finalState.syllabus.topics[i].topic.classes[j]);
            }
          }
        }

        const topic = {
          ...finalState.syllabus.topics[i],
          topic: {
            ...finalState.syllabus.topics[i].topic,
            classes,
          },
        };

        topics.push(topic);
      }

      finalState.syllabus = {
        ...finalState.syllabus,
        topics,
      };
    }

    return finalState;
  }),

  on(tutorActions.tutorEditSubjectTitleFailure, (state) => ({
    ...state,
    isSavingSubjectTitle: false,
    subjectTitleEditedSuccess: false,
  })),

  // On accept/reject course filter out rejected course
  on(
    courseActions.tutorAcceptCourseSuccess,
    courseActions.tutorRejectCourseSuccess,
    (state, { courseId }) => {
      let finalState = {
        ...state,
      };

      if (finalState?.dashboard?.newlyAssignedCourses) {
        const dashboard = {
          ...finalState.dashboard,
          newlyAssignedCourses:
            finalState.dashboard.newlyAssignedCourses.filter(
              (course: any) => course.id !== courseId
            ),
        };

        finalState = {
          ...finalState,
          dashboard,
        };
      }

      return finalState;
    }
  ),

  on(tutorActions.tutorLaunchClass, (state) => ({
    ...state,
    isLaunchingClass: true,
  })),

  on(tutorActions.tutorLaunchClassSuccess, (state) => ({
    ...state,
    isLaunchingClass: false,
  })),

  on(tutorActions.tutorLaunchClassFailure, (state) => ({
    ...state,
    isLaunchingClass: false,
  })),

  // Tutor resources
  on(tutorActions.loadTutorResources, (state) => ({
    ...state,
    isLoadingTutorResources: true,
  })),

  on(tutorActions.loadTutorResourcesSuccess, (state, { resources }) => ({
    ...state,
    resources,
    isLoadingTutorResources: false,
  })),

  on(tutorActions.loadTutorResourcesFailure, (state) => ({
    ...state,
    isLoadingTutorResources: false,
  })),

  on(tutorActions.loadTutorResource, (state) => ({
    ...state,
    isLoadingTutorResource: true,
  })),

  on(tutorActions.loadTutorResourceSuccess, (state, { resource }) => ({
    ...state,
    resource,
    isLoadingTutorResource: false,
  })),

  on(tutorActions.loadTutorResourceFailure, (state) => ({
    ...state,
    isLoadingTutorResource: false,
  })),

  // Reset resource on open add resource modal
  on(
    tutorModalActions.openTutorAddClassResourceModal,
    tutorModalActions.openTutorEditClassResourceModal,
    (state) => ({
      ...state,
      resource: null,
    })
  ),

  on(tutorActions.addTutorResource, (state) => ({
    ...state,
    isAddingTutorResources: true,
  })),

  on(tutorActions.addTutorResourceSuccess, (state, { resource }) => {
    const finalState = {
      ...state,
      isAddingTutorResources: false,
    };

    if (
      finalState.resources?.course?.classes &&
      finalState.resources?.course?.classes?.length
    ) {
      const classes = finalState.resources.course.classes.map((cls: any) =>
        cls.id === resource?.resource?.class?.id
          ? { ...cls, resourceId: resource?.resource?.class?.resourceId }
          : { ...cls }
      );

      const course = {
        ...finalState.resources.course,
        classes,
      };

      finalState.resources = {
        ...finalState.resources,
        course,
      };
    }

    return finalState;
  }),

  on(tutorActions.addTutorResourceFailure, (state) => ({
    ...state,
    isAddingTutorResources: false,
  })),

  on(tutorActions.editTutorResource, (state) => ({
    ...state,
    isAddingTutorResources: true,
  })),

  on(tutorActions.editTutorResourceSuccess, (state) => ({
    ...state,
    isAddingTutorResources: false,
  })),

  on(tutorActions.editTutorResourceFailure, (state) => ({
    ...state,
    isAddingTutorResources: false,
  })),

  on(tutorActions.deleteTutorResource, (state) => ({
    ...state,
    isDeletingResource: true,
  })),

  on(tutorActions.deleteTutorResourceSuccess, (state, { id }) => {
    const finalState = {
      ...state,
      isDeletingResource: false,
    };

    if (
      finalState.resources?.course?.classes &&
      finalState.resources?.course?.classes?.length
    ) {
      const classes = finalState.resources.course.classes.map((cls: any) =>
        cls.resourceId === id ? { ...cls, resourceId: null } : { ...cls }
      );

      const course = {
        ...finalState.resources.course,
        classes,
      };

      finalState.resources = {
        ...finalState.resources,
        course,
      };
    }

    return finalState;
  }),

  on(tutorActions.deleteTutorResourceFailure, (state) => ({
    ...state,
    isDeletingResource: false,
  })),

  //Tutor assignments
  on(tutorActions.loadTutorAssignments, (state) => ({
    ...state,
    isLoadingTutorAssignments: true,
  })),

  on(tutorActions.loadTutorAssignmentsSuccess, (state, { assignments }) => ({
    ...state,
    assignments,
    isLoadingTutorAssignments: false,
  })),

  on(tutorActions.loadTutorAssignmentsFailure, (state) => ({
    ...state,
    isLoadingTutorAssignments: false,
  })),

  on(tutorActions.loadTutorAssignment, (state) => ({
    ...state,
    isLoadingTutorAssignment: true,
  })),

  on(tutorActions.loadTutorAssignmentSuccess, (state, { assignment }) => ({
    ...state,
    assignment,
    isLoadingTutorAssignment: false,
  })),

  on(tutorActions.loadTutorAssignmentFailure, (state) => ({
    ...state,
    isLoadingTutorAssignment: false,
  }))
);

export const selectTutor = (state: State): ITutor | null => state.tutor;
export const selectTutorSyllabus = (state: State): any => state.syllabus;

export const selectTutorDashboard = (state: State): boolean => state.dashboard;

export const selectIsLoadingTutor = (state: State): boolean =>
  state.isLoadingTutors;

export const selectIsLoadingTutorDashboard = (state: State): boolean =>
  state.isLoadingDashboard;

export const selectIsCompleteTutorProfile = (state: State): boolean =>
  state.isCompleteTutorProfile;

export const selectIsLoadingTutorSyllabus = (state: State): boolean =>
  state.isLoadingSyllabus;

export const selectIsAddingSyllabusTopic = (state: State): boolean =>
  state.isAddingSyllabusTopic;

export const selectIsSavingSubjectTitle = (state: State): boolean =>
  state.isSavingSubjectTitle;

export const selectIsDeletingTopic = (state: State): boolean =>
  state.isDeletingTopic;

export const selectIsLaunchingClass = (state: State): boolean =>
  state.isLaunchingClass;

export const selectSubjectTitleEditedSuccess = (state: State): boolean =>
  state.subjectTitleEditedSuccess;

export const selectIsLoadingTutorResource = (state: State): boolean =>
  state.isLoadingTutorResource;

export const selectTutorResource = (state: State): boolean => state.resource;

export const selectIsLoadingTutorResources = (state: State): boolean =>
  state.isLoadingTutorResources;

export const selectTutorResources = (state: State): boolean => state.resources;

export const selectIsAddingTutorResources = (state: State): boolean =>
  state.isAddingTutorResources;

export const selectIsDeletingResource = (state: State): boolean =>
  state.isDeletingResource;

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
