import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { combineLatest, Observable } from 'rxjs';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { environment } from '@environment';
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
  @Output() deleteAssignment: EventEmitter<number> = new EventEmitter<number>();

  imageUrl = environment.imageURL;
  view$: Observable<{ loading: boolean; assignment: any }>;

  constructor(private _store: Store<any>) {}

  openEditAssignmentModal(id: number): void {
    const params = {
      heading: 'Edit Assignment',
    };

    this._store.dispatch(fromTutorAction.setTutorStateParams({ params }));
    this._store.dispatch(fromTutorAction.openTutorEditAssignmentModal({ id }));
  }

  ngOnInit(): void {
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
