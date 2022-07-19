import {
  state,
  style,
  group,
  trigger,
  animate,
  transition,
} from '@angular/animations';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';

import { environment } from '@environment';
import * as fromCore from '@metutor/core/state';
import * as fromTutor from '@metutor/modules/tutor/state';
import * as fromTutorAction from '@metutor/modules/tutor/state/actions';

@Component({
  selector: 'metutors-tutor-assignment',
  templateUrl: './tutor-assignment.component.html',
  styleUrls: ['./tutor-assignment.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('in', style({ height: '*', opacity: 0 })),
      transition(':leave', [
        style({ height: '*', opacity: 1 }),

        group([
          animate(300, style({ height: 0 })),
          animate('200ms ease-in-out', style({ opacity: '0' })),
        ]),
      ]),
      transition(':enter', [
        style({ height: '0', opacity: 0 }),

        group([
          animate(300, style({ height: '*' })),
          animate('400ms ease-in-out', style({ opacity: '1' })),
        ]),
      ]),
    ]),
  ],
})
export class TutorAssignmentComponent implements OnInit {
  showAddAssignmentModal$: Observable<boolean>;
  showAssignmentDetailsModal$: Observable<boolean>;
  showViewStudentAssignmentModal$: Observable<boolean>;
  showAcceptRejectAssignmentModal$: Observable<boolean>;

  loading$: Observable<boolean>;
  assignments$: Observable<any>;
  showConfirmModal$: Observable<boolean>;
  isDeletingAssignment$: Observable<boolean>;

  openBlock: boolean;
  selectedBlock: null;
  assignmentId: number;
  activeAssignment = true;
  imageUrl = environment.imageURL;

  constructor(private _store: Store<any>) {}

  onOpenAddAssignment() {
    const params = {
      heading: 'Add New Assignment',
    };
    this._store.dispatch(fromTutorAction.openTutorAddAssignmentModal());
    this._store.dispatch(fromTutorAction.setTutorStateParams({ params }));
  }

  onCloseAddAssignment() {
    this._store.dispatch(fromTutorAction.closeTutorAddAssignmentModal());
  }

  onOpenEditAssignmentModal(id: number): void {
    const params = {
      heading: 'Edit Assignment',
    };

    this._store.dispatch(fromTutorAction.setTutorStateParams({ params }));
    this._store.dispatch(fromTutorAction.openTutorEditAssignmentModal({ id }));
  }

  onOpenAssignmentDetails(id: number) {
    this._store.dispatch(
      fromTutorAction.openTutorAssignmentDetailsModal({ id })
    );
  }

  onCloseAssignmentDetails() {
    this._store.dispatch(fromTutorAction.closeTutorAssignmentDetailsModal());
  }

  onCloseAcceptRejectAssignmentModal() {
    this._store.dispatch(fromTutorAction.closeAcceptRejectAssignmentModal());
  }

  onCloseTutorViewStudentAssignmentModal() {
    this._store.dispatch(
      fromTutorAction.closeTutorViewStudentAssignmentModal()
    );
  }

  onOpenConfirmModal(assignmentId: number) {
    this.assignmentId = assignmentId;
    this._store.dispatch(fromTutorAction.openTutorConfirmModal());
  }

  onCloseConfirmModal() {
    this._store.dispatch(fromTutorAction.closeTutorConfirmModal());
  }

  onDeleteAssignment(id: number): void {
    this._store.dispatch(fromCore.deleteTutorAssignment({ id }));
  }

  openViewStudentAssignmentModal(id: number, assignee: any): void {
    if (
      assignee.status === 'submitted' ||
      assignee.status === 'completed' ||
      assignee.status === 'resubmitted'
    ) {
      const userId = assignee?.userId;

      this._store.dispatch(
        fromTutorAction.openTutorViewStudentAssignmentModal({ id, userId })
      );
    }
  }

  filterAssignments(status: string): void {
    this.activeAssignment = status === 'active';

    this.assignments$ = this._store.select(
      fromCore.selectTutorFilteredAssignments,
      {
        status,
      }
    );
  }

  ngOnInit(): void {
    this._store.dispatch(fromCore.loadTutorAssignments());

    this.showAddAssignmentModal$ = this._store.select(
      fromTutor.selectAddAssignmentModal
    );

    this.showViewStudentAssignmentModal$ = this._store.select(
      fromTutor.selectViewStudentAssignmentModal
    );

    this.showAssignmentDetailsModal$ = this._store.select(
      fromTutor.selectAssignmentDetailsModal
    );

    this.loading$ = this._store.select(
      fromCore.selectIsLoadingTutorAssignments
    );

    this.showAcceptRejectAssignmentModal$ = this._store.select(
      fromTutor.selectAcceptRejectAssignmentModal
    );

    this.showConfirmModal$ = this._store.select(
      fromTutor.selectTutorConfirmModal
    );

    this.isDeletingAssignment$ = this._store.select(
      fromCore.selectIsDeletingTutorAssignment
    );

    this.assignments$ = this._store.select(
      fromCore.selectTutorFilteredAssignments,
      {
        status: 'active',
      }
    );
  }
}
