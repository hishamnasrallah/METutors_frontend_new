import { IStudent } from '@metutor/core/models';
import { createAction, props } from '@ngrx/store';

// Load all students
export const loadStudent = createAction('[Student] Load Student');

export const loadStudentSuccess = createAction(
  '[Student] Load Student Success',
  props<{ student: IStudent }>()
);

export const loadStudentFailure = createAction(
  '[Student] Load Student Failure',
  props<{ error: any }>()
);

export const loadStudentEnded = createAction('[Student] Load Student Ended');

export const loadStudents = createAction(
  '[Student] Load Students',
  props<{ params: { page: number; status: string; search?: string } }>()
);

export const loadStudentsSuccess = createAction(
  '[Student] Load Students Success',
  props<{ students: any }>()
);

export const loadStudentsFailure = createAction(
  '[Student] Load Students Failure',
  props<{ error: any }>()
);

export const loadStudentPreference = createAction(
  '[Student] Load Student Preference'
);

export const loadStudentPreferenceSuccess = createAction(
  '[Student] Load Student Preference Success',
  props<{ preferences: any }>()
);

export const loadStudentPreferenceFailure = createAction(
  '[Student] Load Student Preference Failure',
  props<{ error: any }>()
);

export const loadStudentPreferenceEnded = createAction(
  '[Student] Load Student Preference Ended'
);

export const loadStudentDashboard = createAction(
  '[Student] Load Student Dashboard',
  props<{ params: any; load: boolean }>()
);

export const loadStudentDashboardSuccess = createAction(
  '[Student] Load Student Dashboard Success',
  props<{ dashboard: any }>()
);

export const loadStudentDashboardFailure = createAction(
  '[Student] Load Student Dashboard Failure',
  props<{ error: any }>()
);

export const loadStudentDashboardEnded = createAction(
  '[Student] Load Student Dashboard Ended'
);

export const loadStudentClassesDashboard = createAction(
  '[Student] Load Student Classes Dashboard'
);

export const loadStudentClassesDashboardSuccess = createAction(
  '[Student] Load Student Classes Dashboard Success',
  props<{ classesDashboard: any }>()
);

export const loadStudentClassesDashboardFailure = createAction(
  '[Student] Load Student Classes Dashboard Failure',
  props<{ error: any }>()
);

export const loadStudentClassroom = createAction(
  '[Student] Load Student Classroom',
  props<{ params?: any }>()
);

export const loadStudentClassroomSuccess = createAction(
  '[Student] Load Student Classroom Success',
  props<{ classroom: any }>()
);

export const loadStudentClassroomFailure = createAction(
  '[Student] Load Student Classroom Failure',
  props<{ error: any }>()
);

export const loadStudentSyllabus = createAction(
  '[Student] Load Student Syllabus Dashboard'
);

export const loadStudentSyllabusSuccess = createAction(
  '[Student] Load Student Syllabus Success',
  props<{ syllabus: any }>()
);

export const loadStudentSyllabusFailure = createAction(
  '[Student] Load Student Syllabus Failure',
  props<{ error: any }>()
);

export const studentSyllabusAddEditTopic = createAction(
  '[Student] Student Syllabus Add Edit Topic',
  props<{
    payload: {
      id?: number;
      name: string;
      course_id: number;
      confidence_scale: number;
    };
  }>()
);

export const studentSyllabusAddEditTopicSuccess = createAction(
  '[Student] Student Syllabus Add Edit Topic Success',
  props<{ id: number | undefined; topic: any; message: string }>()
);

export const studentSyllabusAddEditTopicFailure = createAction(
  '[Student] Student Syllabus Add Edit Topic Failure',
  props<{ error: any }>()
);

// Resources
export const loadStudentResources = createAction(
  '[Student] Load Student Resources'
);

export const loadStudentResourcesSuccess = createAction(
  '[Student] Load Student Resources Success',
  props<{ resources: any }>()
);

export const loadStudentResourcesFailure = createAction(
  '[Student] Load Student Resources Failure',
  props<{ error: any }>()
);

export const loadStudentResource = createAction(
  '[Student] Load Student Resource',
  props<{ id: number }>()
);

export const loadStudentResourceSuccess = createAction(
  '[Student] Load Student Resource Success',
  props<{ resource: any }>()
);

export const loadStudentResourceFailure = createAction(
  '[Student] Load Student Resource Failure',
  props<{ error: any }>()
);

export const studentUploadResourceDocument = createAction(
  '[Student] Student Upload Resource Document',
  props<{ body: any }>()
);

export const studentUploadResourceDocumentSuccess = createAction(
  '[Student] Student Upload Resource Document Success',
  props<{ document: any; message: string }>()
);

export const studentUploadResourceDocumentFailure = createAction(
  '[Student] Student Upload Resource Document Failure',
  props<{ error: any }>()
);

export const studentJoinClass = createAction(
  '[Student] Student Join Class',
  props<{ id: number }>()
);

export const studentJoinClassSuccess = createAction(
  '[Student] Student Join Class Success'
);

export const studentJoinClassFailure = createAction(
  '[Student] Student Join Class Failure',
  props<{ error: any }>()
);

// Student assignments
export const loadStudentAssignments = createAction(
  '[Student] Load Student Assignments'
);

export const loadStudentAssignmentsSuccess = createAction(
  '[Student] Load Student Assignments Success',
  props<{ assignments: any }>()
);

export const loadStudentAssignmentsFailure = createAction(
  '[Student] Load Student Assignments Failure',
  props<{ error: any }>()
);

export const loadStudentAssignment = createAction(
  '[Student] Load Student Assignment',
  props<{ id: number }>()
);

export const loadStudentAssignmentSuccess = createAction(
  '[Student] Load Student Assignment Success',
  props<{ assignment: any }>()
);

export const loadStudentAssignmentFailure = createAction(
  '[Student] Load Student Assignment Failure',
  props<{ error: any }>()
);

export const studentSubmitAssignment = createAction(
  '[Student] Student Submit Assignment',
  props<{ body: any }>()
);

export const studentSubmitAssignmentSuccess = createAction(
  '[Student] Student Submit Assignment Success',
  props<{ id: number; message: string }>()
);

export const studentSubmitAssignmentFailure = createAction(
  '[Student] Load Student Assignment Failure',
  props<{ error: any }>()
);

export const loadStudentSubmittedAssignment = createAction(
  '[Student] Load Student Submitted Assignment',
  props<{ id: number }>()
);

export const loadStudentSubmittedAssignmentSuccess = createAction(
  '[Student] Load Student Submitted Assignment Success',
  props<{ submittedAssignment: any }>()
);

export const loadStudentSubmittedAssignmentFailure = createAction(
  '[Student] Load Student Submitted Assignment Failure',
  props<{ error: any }>()
);

// Student attendance
export const loadStudentAttendance = createAction(
  '[Student] Load Student Attendance'
);

export const loadStudentAttendanceSuccess = createAction(
  '[Student] Load Student Attendance Success',
  props<{ attendance: any }>()
);

export const loadStudentAttendanceFailure = createAction(
  '[Student] Load Student Attendance Failure',
  props<{ error: any }>()
);

// Student feedback
export const loadStudentFeedbackOptions = createAction(
  '[Student] Load Student Feedback Options'
);

export const loadStudentFeedbackOptionsSuccess = createAction(
  '[Student] Load Student Feedback Options Success',
  props<{ feedbackOptions: any }>()
);

export const loadStudentFeedbackOptionsFailure = createAction(
  '[Student] Load Student Feedback Options Failure',
  props<{ error: any }>()
);

export const loadStudentPlatformFeedbackOptions = createAction(
  '[Student] Load Student Platform Feedback Options'
);

export const loadStudentPlatformFeedbackOptionsSuccess = createAction(
  '[Student] Load Student Platform Feedback Options Success',
  props<{ feedbackOptions: any }>()
);

export const loadStudentPlatformFeedbackOptionsFailure = createAction(
  '[Student] Load Student Platform Feedback Options Failure',
  props<{ error: any }>()
);

export const studentSubmitFeedback = createAction(
  '[Student] Student Submit Feedback',
  props<{ body: any; cancelCourse: boolean; onHold: boolean }>()
);

export const studentSubmitFeedbackSuccess = createAction(
  '[Student] Student Submit Feedback Success',
  props<{ message: string; cancelCourse: boolean; onHold: boolean }>()
);

export const studentSubmitFeedbackFailure = createAction(
  '[Student] Student Submit Feedback Failure',
  props<{ error: any }>()
);

export const studentSubmitPlatformFeedback = createAction(
  '[Student] Student Submit Platform Feedback',
  props<{ body: any }>()
);

export const studentSubmitPlatformFeedbackSuccess = createAction(
  '[Student] Student Submit Platform Feedback Success',
  props<{ message: string }>()
);

export const studentSubmitPlatformFeedbackFailure = createAction(
  '[Student] Student Submit Platform Feedback Failure',
  props<{ error: any }>()
);

// Update Profile
export const studentUpdateProfile = createAction(
  '[Student] Student Update Profile',
  props<{ body: any }>()
);

export const studentUpdateProfileSuccess = createAction(
  '[Student] Student Update Profile Success',
  props<{ message: string; body: any; isPreference?: boolean }>()
);

export const studentUpdateProfileFailure = createAction(
  '[Student] Student Update Profile Failure',
  props<{ error: any }>()
);

export const studentUpdatePreferences = createAction(
  '[Student] Student Update Preferences',
  props<{ body: any }>()
);

export const studentUpdatePreferencesSuccess = createAction(
  '[Student] Student Update Preferences Success',
  props<{ message: string; body: any; isPreference?: boolean }>()
);

export const studentUpdatePreferencesFailure = createAction(
  '[Student] Student Update Preferences Failure',
  props<{ error: any }>()
);

export const resetClassSlots = createAction('[Student] Reset Class Slots');

export const loadMakeupClassSlots = createAction(
  '[Student] Load Makeup Class Slots',
  props<{ body: { date: string; id: number } }>()
);

export const loadMakeupClassSlotsSuccess = createAction(
  '[Student] Load Makeup Class Slots Success',
  props<{ timeSlots: any }>()
);

export const loadMakeupClassSlotsFailure = createAction(
  '[Student] Load Makeup Class Slots Failure',
  props<{ error: any }>()
);

export const studentMakeupClass = createAction(
  '[Student] Student Makeup Class',
  props<{ body: any }>()
);

export const studentMakeupClassSuccess = createAction(
  '[Student] Student Makeup Class Success',
  props<{ message: string }>()
);

export const studentMakeupClassFailure = createAction(
  '[Student] Student Makeup Class Failure',
  props<{ error: any }>()
);

// Add New Class
export const studentAddNewClass = createAction(
  '[Student] Student Add New Class',
  props<{ data: any }>()
);

export const studentAddNewClassSuccess = createAction(
  '[Student] Student Add New Class Success',
  props<{ paymentInfo: any }>()
);

export const studentAddNewClassFailure = createAction(
  '[Student] Student Add New Class Failure',
  props<{ error: any }>()
);

export const loadTutorAvailability = createAction(
  '[Student] Load Tutor Availability',
  props<{ id: number }>()
);

export const loadTutorAvailabilitySuccess = createAction(
  '[Student] Load Tutor Availability Success',
  props<{ tutorAvailability: any }>()
);

export const loadTutorAvailabilityFailure = createAction(
  '[Student] Load Tutor Availability Failure',
  props<{ error: any }>()
);

export const studentViewClass = createAction(
  '[Student] Student View Class',
  props<{ id: number }>()
);

export const studentViewClassSuccess = createAction(
  '[Student] Student View Class Success'
);

export const studentViewClassFailure = createAction(
  '[Student] Student View Class Failure',
  props<{ error: any }>()
);

export const loadStudentCertificate = createAction(
  '[Student] Load Student Certificate'
);

export const loadStudentCertificateSuccess = createAction(
  '[Student] Load Student Certificate Success',
  props<{ certificate: any }>()
);

export const loadStudentCertificateFailure = createAction(
  '[Student] Load Student Certificate Failure',
  props<{ error: any }>()
);

export const loadStudentCertificates = createAction(
  '[Student] Load Student Certificates'
);

export const loadStudentCertificatesSuccess = createAction(
  '[Student] Load Student Certificates Success',
  props<{ certificates: any }>()
);

export const loadStudentCertificatesFailure = createAction(
  '[Student] Load Student Certificates Failure',
  props<{ error: any }>()
);
