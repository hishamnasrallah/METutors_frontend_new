import {
  state,
  style,
  group,
  trigger,
  animate,
  transition,
} from '@angular/animations';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Observable, combineLatest } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import * as fromTutor from '@metutor/modules/tutor/state';
import * as fromTutorAction from '@metutor/modules/tutor/state/actions';

import * as fromCore from '@metutor/core/state';

@Component({
  selector: 'metutors-tutor-assignment',
  templateUrl: './tutor-assignment.component.html',
  styleUrls: ['./tutor-assignment.component.scss'],
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
export class TutorAssignmentComponent implements OnInit {
  showAddAssignmentModal$: Observable<boolean>;
  showAssignmentDetailsModal$: Observable<boolean>;

  view$: Observable<{ loading: boolean; assignments: any }>;

  openBlock: boolean;

  constructor(private _store: Store<any>) {}

  onOpenAddAssignment() {
    this._store.dispatch(fromTutorAction.openTutorAddAssignmentModal());
  }

  onCloseAddAssignment() {
    this._store.dispatch(fromTutorAction.closeTutorAddAssignmentModal());
  }

  onOpenAssignmentDetails(id: number) {
    this._store.dispatch(
      fromTutorAction.openTutorAssignmentDetailsModal({ id })
    );
  }

  onCloseAssignmentDetails() {
    this._store.dispatch(fromTutorAction.closeTutorAssignmentDetailsModal());
  }

  ngOnInit(): void {
    this._store.dispatch(fromCore.loadTutorAssignments());

    this.showAddAssignmentModal$ = this._store.select(
      fromTutor.selectAddAssignmentModal
    );

    this.showAssignmentDetailsModal$ = this._store.select(
      fromTutor.selectAssignmentDetailsModal
    );

    this.view$ = combineLatest([
      this._store.select(fromCore.selectTutorAssignments),
      this._store.select(fromCore.selectIsLoadingTutorAssignments),
    ]).pipe(map(([assignments, loading]) => ({ loading, assignments })));
  }
}
