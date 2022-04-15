import { createAction, props } from '@ngrx/store';

export const loadAdminDocuments = createAction('[Admin] Load Admin Documents');

export const loadAdminDocumentsSuccess = createAction(
  '[Admin] Load Admin Documents Success',
  props<{ documents: any }>()
);

export const loadAdminDocumentsFailure = createAction(
  '[Admin] Load Admin Documents Failure',
  props<{ error: any }>()
);

export const loadAdminDocumentsEnded = createAction(
  '[Admin] Load Admin Documents Ended'
);

export const adminApproveDocument = createAction(
  '[Admin] Admin ApproveDocument',
  props<{ id: number }>()
);

export const adminApproveDocumentSuccess = createAction(
  '[Admin] Admin Approve Document Success',
  props<{ id: number; message: string }>()
);

export const adminApproveDocumentFailure = createAction(
  '[Admin] Admin Approve Document Failure',
  props<{ error: any }>()
);

export const adminRejectDocument = createAction(
  '[Admin] Admin Reject Document',
  props<{ id: number }>()
);

export const adminRejectDocumentSuccess = createAction(
  '[Admin] Admin Reject Document Success',
  props<{ id: number; message: string }>()
);

export const adminRejectDocumentFailure = createAction(
  '[Admin] Admin Reject Document Failure',
  props<{ error: any }>()
);
