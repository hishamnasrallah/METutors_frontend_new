import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { combineLatest, Observable } from 'rxjs';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import * as fromCore from '@metutor/core/state';

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

  openEditAssignmentModal(id: number): void {}

  ngOnInit(): void {
    this.isDeletingAssignment$ = this._store.select(
      fromCore.selectIsDeletingTutorAssignment
    );

    this.view$ = combineLatest([
      this._store.select(fromCore.selectTutorAssignment),
      this._store.select(fromCore.selectIsLoadingTutorAssignment),
    ]).pipe(map(([assignment, loading]) => ({ loading, assignment })));
  }
}
