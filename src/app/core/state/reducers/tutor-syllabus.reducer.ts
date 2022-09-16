import { createReducer, on } from '@ngrx/store';

import * as tutorSyllabusActions from '../actions/tutor-syllabus.actions';

export interface State {
  syllabus: any;
  isDeletingTopic: boolean;
  isLoadingSyllabus: boolean;
  isSavingSubjectTitle: boolean;
  isAddingSyllabusTopic: boolean;
  subjectTitleEditedSuccess: boolean;
}

export const initialState: State = {
  syllabus: null,
  isDeletingTopic: false,
  isLoadingSyllabus: false,
  isSavingSubjectTitle: false,
  isAddingSyllabusTopic: false,
  subjectTitleEditedSuccess: false,
};

export const reducer = createReducer(
  initialState,

  on(tutorSyllabusActions.loadTutorSyllabus, (state) => ({
    ...state,
    isLoadingSyllabus: true,
  })),

  on(tutorSyllabusActions.loadTutorSyllabusSuccess, (state, { syllabus }) => ({
    ...state,
    syllabus,
    isLoadingSyllabus: false,
  })),

  on(tutorSyllabusActions.loadTutorSyllabusFailure, (state) => ({
    ...state,
    isLoadingSyllabus: false,
  })),

  on(tutorSyllabusActions.tutorAddSyllabusTopic, (state) => ({
    ...state,
    isAddingSyllabusTopic: true,
  })),

  on(
    tutorSyllabusActions.tutorAddSyllabusTopicSuccess,
    (state, { syllabus }) => {
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
    }
  ),

  on(tutorSyllabusActions.tutorAddSyllabusTopicFailure, (state) => ({
    ...state,
    isAddingSyllabusTopic: false,
  })),

  on(tutorSyllabusActions.tutorEditSyllabusTopic, (state) => ({
    ...state,
    isAddingSyllabusTopic: true,
  })),

  on(
    tutorSyllabusActions.tutorEditSyllabusTopicSuccess,
    (state, { syllabus }) => {
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
    }
  ),

  on(tutorSyllabusActions.tutorEditSyllabusTopicFailure, (state) => ({
    ...state,
    isAddingSyllabusTopic: false,
  })),

  on(tutorSyllabusActions.tutorDeleteSyllabusTopic, (state) => ({
    ...state,
    isDeletingTopic: true,
  })),

  on(
    tutorSyllabusActions.tutorDeleteSyllabusTopicSuccess,
    (state, { data }) => {
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
    }
  ),

  on(tutorSyllabusActions.tutorDeleteSyllabusTopicFailure, (state) => ({
    ...state,
    isDeletingTopic: false,
  })),

  on(tutorSyllabusActions.tutorEditSyllabusSubjectTitle, (state) => ({
    ...state,
    isSavingSubjectTitle: true,
    subjectTitleEditedSuccess: false,
  })),

  on(
    tutorSyllabusActions.tutorEditSyllabusSubjectTitleSuccess,
    (state, { title, classId }) => {
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
    }
  ),

  on(tutorSyllabusActions.tutorEditSyllabusSubjectTitleFailure, (state) => ({
    ...state,
    isSavingSubjectTitle: false,
    subjectTitleEditedSuccess: false,
  }))
);

export const selectTutorSyllabus = (state: State): any => state.syllabus;

export const selectIsLoadingTutorSyllabus = (state: State): boolean =>
  state.isLoadingSyllabus;

export const selectIsAddingSyllabusTopic = (state: State): boolean =>
  state.isAddingSyllabusTopic;

export const selectIsSavingSubjectTitle = (state: State): boolean =>
  state.isSavingSubjectTitle;

export const selectSubjectTitleEditedSuccess = (state: State): boolean =>
  state.subjectTitleEditedSuccess;

export const selectIsDeletingTopic = (state: State): boolean =>
  state.isDeletingTopic;
