import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { combineLatest, Observable } from 'rxjs';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import * as fromCore from '@metutor/core/state';

@Component({
  selector: 'metutors-student-view-submitted-assignment-modal',
  templateUrl: './student-view-submitted-assignment-modal.component.html',
  styleUrls: ['./student-view-submitted-assignment-modal.component.scss'],
})
export class StudentViewSubmittedAssignmentModalComponent implements OnInit {
  @Input() showModal: boolean = false;

  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  view$: Observable<{ loading: boolean; assignment: any }>;

  constructor(private _store: Store<any>) {}

  ngOnInit(): void {
    this.view$ = combineLatest([
      this._store.select(fromCore.selectStudentSubmittedAssignment),
      this._store.select(fromCore.selectIsLoadingStudentSubmittedAssignment),
    ]).pipe(map(([assignment, loading]) => ({ loading, assignment })));
  }
}
