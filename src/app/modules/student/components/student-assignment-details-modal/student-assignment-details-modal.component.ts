import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import * as fromCore from '@metutor/core/state';
import { combineLatest, Observable, tap } from 'rxjs';
import * as fromStudentActions from '@metutor/modules/student/state/actions';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'; 

@Component({
  selector: 'metutors-student-assignment-details-modal',
  templateUrl: './student-assignment-details-modal.component.html',
  styleUrls: ['./student-assignment-details-modal.component.scss'],
})
export class StudentAssignmentDetailsModalComponent implements OnInit {
  @Input() showModal: boolean = false;

  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  status: string;
  view$: Observable<{ loading: boolean; assignment: any }>;

  constructor(private _store: Store<any>) {}

  onOpenSubmitAssignmentModal(): void {
    this._store.dispatch(fromStudentActions.openSubmitAssignmentModal());
    this._store.dispatch(fromStudentActions.closeStudentViewAssignmentModal());
  }

  onOpenSubmittedAssignmentModal(assignees: any): void {
    const id = assignees[assignees.length - 1]?.id;

    this._store.dispatch(
      fromStudentActions.openViewSubmittedAssignmentModal({ id })
    );
  }

  ngOnInit(): void {
    this.view$ = combineLatest([
      this._store
        .select(fromCore.selectStudentAssignment)
        .pipe(tap((data: any) => (this.status = data?.assignment?.status))),
      this._store.select(fromCore.selectIsLoadingStudentAssignment),
    ]).pipe(map(([assignment, loading]) => ({ loading, assignment })));
  }
}
