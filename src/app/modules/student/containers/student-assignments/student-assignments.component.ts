import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {
  animate,
  group,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Store } from '@ngrx/store';

import { courseStatusLabel } from '@config';
import * as fromCore from '@metutor/core/state';
import * as fromStudent from '@metutor/modules/student/state';
import * as fromStudentActions from '@metutor/modules/student/state/actions';

@Component({
  selector: 'metutors-student-assignments',
  templateUrl: './student-assignments.component.html',
  styleUrls: ['./student-assignments.component.scss'],
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
export class StudentAssignmentsComponent implements OnInit {
  loading$: Observable<boolean>;
  assignments$: Observable<any>;
  showSubmitAssignmentModal$: Observable<boolean>;
  showAssignmentDetailsModal$: Observable<boolean>;
  showViewSubmitAssignmentModal$: Observable<boolean>;

  openBlock: boolean;
  selectedBlock: null;
  assignmentId: number;
  activeAssignment = true;
  statusLabel = courseStatusLabel;

  constructor(private _store: Store<any>) {}

  filterAssignments(status: string): void {
    this.activeAssignment = status === 'active';

    this.assignments$ = this._store.select(
      fromCore.selectStudentFilteredAssignments,
      {
        status,
      }
    );
  }

  onOpenAssignmentDetails(id: number): void {
    this.assignmentId = id;
    this._store.dispatch(
      fromStudentActions.openStudentViewAssignmentModal({ id })
    );
  }

  onCloseAssignmentDetails(): void {
    this._store.dispatch(fromStudentActions.closeStudentViewAssignmentModal());
  }

  onCloseSubmitAssignmentModal(): void {
    this._store.dispatch(fromStudentActions.closeSubmitAssignmentModal());
  }

  onCloseViewSubmittedAssignmentModal(): void {
    this._store.dispatch(
      fromStudentActions.closeViewSubmittedAssignmentModal()
    );
  }

  ngOnInit(): void {
    this._store.dispatch(fromCore.loadStudentAssignments());

    this.loading$ = this._store.select(
      fromCore.selectIsLoadingStudentAssignments
    );

    this.showAssignmentDetailsModal$ = this._store.select(
      fromStudent.selectViewAssignmentModal
    );

    this.showSubmitAssignmentModal$ = this._store.select(
      fromStudent.selectSubmitAssignmentModal
    );

    this.showViewSubmitAssignmentModal$ = this._store.select(
      fromStudent.selectViewSubmittedAssignmentModal
    );

    this.assignments$ = this._store.select(
      fromCore.selectStudentFilteredAssignments,
      {
        status: 'active',
      }
    );
  }
}
