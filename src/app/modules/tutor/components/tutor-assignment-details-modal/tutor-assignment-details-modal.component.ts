import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { combineLatest, Observable } from 'rxjs';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import * as fromCore from '@metutor/core/state';
import * as fromTutorAction from '@metutor/modules/tutor/state/actions';

@Component({
  selector: 'metutors-tutor-assignment-details-modal',
  templateUrl: './tutor-assignment-details-modal.component.html',
  styleUrls: ['./tutor-assignment-details-modal.component.scss'],
})
export class TutorAssignmentDetailsModalComponent implements OnInit {
  @Input() showModal: boolean = false;

  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  isDeletingAssignment$: Observable<boolean>;
  view$: Observable<{ loading: boolean; assignment: any }>;

  constructor(private _store: Store<any>) {}

  deleteAssignment(id: number): void {
    this._store.dispatch(fromCore.deleteTutorAssignment({ id }));
  }

  openEditAssignmentModal(id: number): void {
    const params = {
      heading: 'Edit Assignment',
    };

    this._store.dispatch(fromTutorAction.setTutorStateParams({ params }));
    this._store.dispatch(fromTutorAction.openTutorEditAssignmentModal({ id }));
  }

  ngOnInit(): void {
    this.isDeletingAssignment$ = this._store.select(
      fromCore.selectIsDeletingTutorAssignment
    );

    this.view$ = combineLatest([
      this._store.select(fromCore.selectTutorAssignment).pipe(
        map((assignment: any) => {
          const answerReceived = assignment?.assignment?.assignees.filter(
            (assignee: any) =>
              assignee?.status === 'submitted' ||
              assignee?.status === 'completed'
          );

          return {
            ...assignment?.assignment,
            answerReceived,
          };
        })
      ),
      this._store.select(fromCore.selectIsLoadingTutorAssignment),
    ]).pipe(map(([assignment, loading]) => ({ loading, assignment })));
  }
}
