import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { combineLatest, Observable, tap } from 'rxjs';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import * as fromCore from '@metutor/core/state';
import * as fromStudentActions from '@metutor/modules/student/state/actions';

@Component({
  selector: 'metutors-student-view-submitted-assignment-modal',
  templateUrl: './student-view-submitted-assignment-modal.component.html',
  styleUrls: ['./student-view-submitted-assignment-modal.component.scss'],
})
export class StudentViewSubmittedAssignmentModalComponent implements OnInit {
  @Input() showModal: boolean = false;

  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  status: string;
  view$: Observable<{ loading: boolean; assignment: any }>;

  constructor(private _store: Store<any>) {}

  onBack(id: number): void {
    this._store.dispatch(
      fromStudentActions.closeViewSubmittedAssignmentModal()
    );
    this._store.dispatch(
      fromStudentActions.openStudentViewAssignmentModal({ id })
    );
  }

  ngOnInit(): void {
    this.view$ = combineLatest([
      this._store.select(fromCore.selectIsLoadingStudentSubmittedAssignment),
      this._store
        .select(fromCore.selectStudentSubmittedAssignment)
        .pipe(tap((data: any) => (this.status = data?.assignment?.status))),
    ]).pipe(map(([loading, assignment]) => ({ loading, assignment })));
  }
}
