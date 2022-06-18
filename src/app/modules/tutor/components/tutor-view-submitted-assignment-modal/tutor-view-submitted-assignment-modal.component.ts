import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { combineLatest, Observable } from 'rxjs';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { environment } from '@environment';
import * as fromCore from '@metutor/core/state';
import * as fromTutorActions from '@metutor/modules/tutor/state/actions';

@Component({
  selector: 'metutors-tutor-view-submitted-assignment-modal',
  templateUrl: './tutor-view-submitted-assignment-modal.component.html',
  styleUrls: ['./tutor-view-submitted-assignment-modal.component.scss'],
})
export class TutorViewSubmittedAssignmentModalComponent implements OnInit {
  @Input() showModal: boolean = false;

  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  view$: Observable<{ loading: boolean; assignment: any }>;

  imageUrl = environment.imageURL;

  constructor(private _store: Store<any>) {}

  onBack(): void {
    this._store.dispatch(fromTutorActions.closeAcceptRejectAssignmentModal());
    this._store.dispatch(
      fromTutorActions.closeTutorViewStudentAssignmentModal()
    );
  }

  onOpenAcceptRejectAssignmentModal(assignments: any, isReject = false): void {
    const id = assignments[assignments.length - 1]?.id;
    const userId = assignments[assignments.length - 1]?.userId;
    const assignmentId = assignments[assignments.length - 1]?.assignmentId;

    const params = { id, userId, isReject, heading: '', assignmentId };

    params.heading = isReject
      ? 'Rejection Reason'
      : "Feedback on Student's Solution:";

    this._store.dispatch(fromTutorActions.openAcceptRejectAssignmentModal());
    this._store.dispatch(fromTutorActions.setTutorStateParams({ params }));
  }

  ngOnInit(): void {
    this.view$ = combineLatest([
      this._store.select(fromCore.selectTutorViewStudentAssignment),
      this._store.select(fromCore.selectIsLoadingTutorViewStudentAssignment),
    ]).pipe(map(([assignment, loading]) => ({ loading, assignment })));
  }
}
