import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { combineLatest, Observable } from 'rxjs';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

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

  constructor(private _store: Store<any>) {}

  onBack(): void {
    this._store.dispatch(fromTutorActions.closeAcceptRejectAssignmentModal());
    this._store.dispatch(
      fromTutorActions.closeTutorViewStudentAssignmentModal()
    );
  }

  onOpenAcceptRejectAssignmentModal(
    id: number,
    userId: number,
    isReject = false
  ): void {
    const params = { id, userId, isReject, heading: '' };

    params.heading = isReject
      ? 'Rejection Reason'
      : 'Feedback On Students Solution';

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
