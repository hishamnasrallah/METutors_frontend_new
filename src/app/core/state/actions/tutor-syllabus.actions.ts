import { createAction, props } from '@ngrx/store';

export const loadTutorSyllabus = createAction('[Tutor] Load Tutor Syllabus');

export const loadTutorSyllabusSuccess = createAction(
  '[Tutor] Load Tutor Syllabus Success',
  props<{ syllabus: any }>()
);

export const loadTutorSyllabusFailure = createAction(
  '[Tutor] Load Tutor Syllabus Failure',
  props<{ error: any }>()
);

export const tutorAddSyllabusTopic = createAction(
  '[Tutor] Load Tutor Add Syllabus Topic',
  props<{ body: any }>()
);

export const tutorAddSyllabusTopicSuccess = createAction(
  '[Tutor] Load Tutor Add Syllabus Topic Success',
  props<{ syllabus: any; message: string }>()
);

export const tutorAddSyllabusTopicFailure = createAction(
  '[Tutor] Load Tutor Add Syllabus Topic Failure',
  props<{ error: any }>()
);

export const tutorEditSyllabusTopic = createAction(
  '[Tutor] Load Tutor Edit Syllabus Topic',
  props<{ body: any }>()
);

export const tutorEditSyllabusTopicSuccess = createAction(
  '[Tutor] Load Tutor Edit Syllabus Topic Success',
  props<{ syllabus: any; message: string }>()
);

export const tutorEditSyllabusTopicFailure = createAction(
  '[Tutor] Load Tutor Edit Syllabus Topic Failure',
  props<{ error: any }>()
);

export const tutorDeleteSyllabusTopic = createAction(
  '[Tutor] Load Tutor Delete Syllabus Topic',
  props<{ id: number }>()
);

export const tutorDeleteSyllabusTopicSuccess = createAction(
  '[Tutor] Load Tutor Delete Syllabus Topic Success',
  props<{ data: any; message: string }>()
);

export const tutorDeleteSyllabusTopicFailure = createAction(
  '[Tutor] Load Tutor Delete Syllabus Topic Failure',
  props<{ error: any }>()
);

export const tutorEditSyllabusSubjectTitle = createAction(
  '[Tutor] Load Tutor Edit Syllabus Subject Title',
  props<{ classId: number; title: string }>()
);

export const tutorEditSyllabusSubjectTitleSuccess = createAction(
  '[Tutor] Load Tutor Edit Syllabus Subject Title Success',
  props<{ classId: number; title: string; message: string }>()
);

export const tutorEditSyllabusSubjectTitleFailure = createAction(
  '[Tutor] Load Tutor A Edit Syllabus Subject Title Failure',
  props<{ error: any }>()
);
