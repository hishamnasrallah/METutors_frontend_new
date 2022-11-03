import { createReducer, on } from '@ngrx/store';

import { IClassroom, ICourseRequest, IInvoiceDetails, ITutor } from '@models';
import * as userActions from '../actions/user.actions';
import * as requestActions from '../actions/request.actions';
import * as studentActions from '../actions/student.actions';

export interface State {
  // Estimated Price
  paymentInfo: any;
  isCreatingCourse: boolean;
  estimatedPrice: number | null;
  isLoadingEstimatedPrice: boolean;
  loadingEstimatedPriceFailure?: string;

  // Generate Tutors
  isGeneratingTutors: boolean;
  loadingTutorFailure: string;
  availableTutors: ITutor[] | null;
  suggestedTutors: ITutor[] | null;

  // Create Class
  isCreateClass: boolean;
  createClassFailure: string;
  createdClass: IClassroom | null;

  // Calculate Final Invoice
  isCalculateFinalInvoice: boolean;
  calculateFinalInvoiceFailure: string;
  invoiceDetails: IInvoiceDetails | null;

  // Load Requested Courses
  requestedCourses: ICourseRequest[];
  completedRequestedCourses: ICourseRequest[];
  isLoadingRequestedCourses: boolean;
  requestedCoursesCounts: any;

  // Request Course
  isRequestCourse: boolean;
  isChangeCourseRequest: boolean;

  // Get Invoice Email
  isGetInvoiceEmail: boolean;
}

export const initialState: State = {
  paymentInfo: null,
  createdClass: null,
  isCreateClass: false,
  invoiceDetails: null,
  estimatedPrice: null,
  requestedCourses: [],
  suggestedTutors: null,
  availableTutors: null,
  isRequestCourse: false,
  createClassFailure: '',
  loadingTutorFailure: '',
  isCreatingCourse: false,
  isGetInvoiceEmail: false,
  isGeneratingTutors: false,
  isChangeCourseRequest: false,
  completedRequestedCourses: [],
  isCalculateFinalInvoice: false,
  isLoadingEstimatedPrice: false,
  isLoadingRequestedCourses: false,
  calculateFinalInvoiceFailure: '',
  requestedCoursesCounts: {
    newCount: 0,
    completedCount: 0
  }
};

export const reducer = createReducer(
  initialState,
  on(requestActions.calculateEstimatedPrice, state => ({
    ...state,
    isLoadingEstimatedPrice: true
  })),

  on(
    requestActions.calculateEstimatedPriceSuccess,
    (state, { estimatedPrice }) => ({
      ...state,
      estimatedPrice,
      isLoadingEstimatedPrice: false
    })
  ),

  on(requestActions.calculateEstimatedPriceFailure, (state, { error }) => ({
    ...state,
    isLoadingEstimatedPrice: false,
    loadingEstimatedPriceFailure: error
  })),

  on(requestActions.generateTutors, state => ({
    ...state,
    isGeneratingTutors: true
  })),

  on(
    requestActions.generateTutorsSuccess,
    (state, { availableTutors, suggestedTutors }) => ({
      ...state,
      availableTutors,
      suggestedTutors,
      isGeneratingTutors: false
    })
  ),

  on(requestActions.generateTutorsFailure, (state, { error }) => ({
    ...state,
    isGeneratingTutors: false,
    loadingTutorFailure: error
  })),

  on(requestActions.createClass, state => ({
    ...state,
    isCreateClass: true
  })),

  on(requestActions.createClassSuccess, (state, { classroom }) => ({
    ...state,
    isCreateClass: false,
    createdClass: classroom
  })),

  on(requestActions.createClassFailure, (state, { error }) => ({
    ...state,
    isCreateClass: false,
    createClassFailure: error
  })),

  on(requestActions.createCourse, requestActions.createFreeCourse, state => ({
    ...state,
    isCreatingCourse: true
  })),

  on(
    requestActions.createCourseSuccess,
    requestActions.createFreeCourseSuccess,
    studentActions.studentAddNewClassSuccess,
    (state, { paymentInfo }) => ({
      ...state,
      paymentInfo,
      isCreatingCourse: true
    })
  ),

  on(
    requestActions.createCourseFailure,
    requestActions.createFreeCourseFailure,
    (state, { error }) => ({
      ...state,
      isCreatingCourse: false
    })
  ),

  on(requestActions.createClassLocalStorage, (state, { classroom }) => ({
    ...state,
    isCreateClass: false,
    createdClass: classroom
  })),

  on(userActions.enterRequestTutor, state => ({
    ...state,
    createdClass: null
  })),

  on(requestActions.calculateFinalInvoice, state => ({
    ...state,
    isCalculateFinalInvoice: true
  })),

  on(
    requestActions.calculateFinalInvoiceSuccess,
    (state, { invoiceDetails }) => ({
      ...state,
      isCalculateFinalInvoice: false,
      invoiceDetails
    })
  ),

  on(requestActions.calculateFinalInvoiceFailure, (state, { error }) => ({
    ...state,
    isCalculateFinalInvoice: false,
    calculateFinalInvoiceFailure: error
  })),

  on(requestActions.loadRequestedCourses, state => ({
    ...state,
    isLoadingRequestedCourses: true
  })),

  on(
    requestActions.loadRequestedCoursesSuccess,
    (
      state,
      { requestedCourses, completedCourses, requestedCoursesCounts }
    ) => ({
      ...state,
      isLoadingRequestedCourses: false,
      requestedCourses,
      completedRequestedCourses: completedCourses,
      requestedCoursesCounts: {
        ...state.requestedCoursesCounts,
        ...requestedCoursesCounts
      }
    })
  ),

  on(requestActions.loadRequestedCoursesFailure, state => ({
    ...state,
    isLoadingRequestedCourses: false
  })),

  on(requestActions.requestCourse, state => ({
    ...state,
    isRequestCourse: true
  })),

  on(
    requestActions.requestCourseSuccess,
    requestActions.requestCourseFailure,
    state => ({
      ...state,
      isRequestCourse: false
    })
  ),

  on(requestActions.changeRequestStatus, state => ({
    ...state,
    isChangeCourseRequest: true
  })),

  on(requestActions.changeRequestStatusSuccess, (state, { status, id }) => {
    let request: any;

    if (state.requestedCourses && state.requestedCourses.length) {
      state.requestedCourses.forEach(item => {
        if (item.id === id) {
          request = { ...item, status };
        }
      });
    }

    return {
      ...state,
      isChangeCourseRequest: false,
      requestedCourses:
        state.requestedCourses && state.requestedCourses.length
          ? state.requestedCourses.filter(item => item.id !== id)
          : [],
      completedRequestedCourses:
        state.completedRequestedCourses &&
        state.completedRequestedCourses.length
          ? [{ ...request }, ...state.completedRequestedCourses]
          : [...request],
      requestedCoursesCounts: {
        ...state.requestedCoursesCounts,
        newCount: state.requestedCoursesCounts?.newCount
          ? state.requestedCoursesCounts.newCount - 1
          : 0,
        completedCount: state.requestedCoursesCounts?.completedCount
          ? state.requestedCoursesCounts.completedCount + 1
          : 1
      }
    };
  }),

  on(requestActions.changeRequestStatusFailure, state => ({
    ...state,
    isChangeCourseRequest: false
  })),

  on(requestActions.getInvoiceEmail, state => ({
    ...state,
    isGetInvoiceEmail: true
  })),

  on(
    requestActions.getInvoiceEmailSuccess,
    requestActions.getInvoiceEmailFailure,
    state => ({
      ...state,
      isGetInvoiceEmail: false
    })
  )
);

export const selectGeneratingAvailableTutors = (
  state: State
): ITutor[] | null => state.availableTutors;

export const selectGeneratingSuggestedTutors = (
  state: State
): ITutor[] | null => state.suggestedTutors;

export const selectIsGeneratingTutors = (state: State): boolean =>
  state.isGeneratingTutors;

export const selectEstimatedPrice = (state: State): number | null =>
  state.estimatedPrice;

export const selectIsLoadingEstimatedPrice = (state: State): boolean =>
  state.isLoadingEstimatedPrice;

export const selectIsCreateClass = (state: State): boolean =>
  state.isCreateClass;

export const selectCreatedClass = (state: State): IClassroom | null =>
  state.createdClass;

export const selectIsCalculateFinalInvoice = (state: State): boolean =>
  state.isCalculateFinalInvoice;

export const selectIsChangeCourseRequest = (state: State): boolean =>
  state.isChangeCourseRequest;

export const selectIsRequestCourse = (state: State): boolean =>
  state.isRequestCourse;

export const selectInvoiceDetails = (state: State): IInvoiceDetails | null =>
  state.invoiceDetails;

export const selectIsLoadingRequestedCourses = (state: State): boolean =>
  state.isLoadingRequestedCourses;

export const selectRequestedCourses = (state: State): ICourseRequest[] | null =>
  state.requestedCourses;

export const selectCompletedRequestedCourses = (
  state: State
): ICourseRequest[] | null => state.completedRequestedCourses;

export const selectRequestedCoursesCount = (state: State): any =>
  state.requestedCoursesCounts;

export const selectRequestPaymentInfo = (state: State): any =>
  state.paymentInfo;

export const selectRequestedIsCreatingCourse = (state: State): any =>
  state.isCreatingCourse;

export const selectIsGetInvoiceEmail = (state: State): boolean =>
  state.isGetInvoiceEmail;

export const selectFilteredGeneratingAvailableTutors = (
  state: State,
  props?: any
): ITutor[] | null => {
  let tutors: ITutor[] = state.availableTutors || [];

  if (state.availableTutors && state.availableTutors.length && props) {
    tutors = props?.name
      ? state.availableTutors.filter(tutor =>
          tutor?.name?.toLowerCase().includes(props.name.toLowerCase())
        )
      : state.availableTutors;
  }

  return tutors;
};

export const selectFilteredGeneratingSuggestedTutors = (
  state: State,
  props?: any
): ITutor[] | null => {
  let tutors: ITutor[] = state.suggestedTutors || [];

  if (state.suggestedTutors && state.suggestedTutors.length && props) {
    tutors = props?.name
      ? state.suggestedTutors.filter(tutor =>
          tutor?.name?.toLowerCase().includes(props.name.toLowerCase())
        )
      : state.suggestedTutors;
  }

  return tutors;
};
