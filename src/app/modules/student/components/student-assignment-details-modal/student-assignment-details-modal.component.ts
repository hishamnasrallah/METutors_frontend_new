import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { combineLatest, Observable } from 'rxjs';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import * as fromCore from '@metutor/core/state';
import * as fromStudentActions from '@metutor/modules/student/state/actions';

@Component({
  selector: 'metutors-student-assignment-details-modal',
  templateUrl: './student-assignment-details-modal.component.html',
  styleUrls: ['./student-assignment-details-modal.component.scss'],
})
export class StudentAssignmentDetailsModalComponent implements OnInit {
  @Input() showModal: boolean = false;

  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  view$: Observable<{ loading: boolean; assignment: any }>;

  constructor(private _store: Store<any>) {}

  onOpenSubmitAssignment(id: number): void {
    this._store.dispatch(fromStudentActions.openSubmitAssignmentModal());
    this._store.dispatch(fromStudentActions.closeStudentViewAssignmentModal());
  }

  ngOnInit(): void {
    this.view$ = combineLatest([
      this._store.select(fromCore.selectStudentAssignment),
      this._store.select(fromCore.selectIsLoadingStudentAssignment),
    ]).pipe(map(([assignment, loading]) => ({ loading, assignment })));
  }
}
