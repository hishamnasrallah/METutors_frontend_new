import { Component, OnInit } from '@angular/core';
import * as fromTutor from '@metutor/modules/tutor/state';
import * as fromTutorAction from '@metutor/modules/tutor/state/actions';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'metutors-tutor-resources',
  templateUrl: './tutor-resources.component.html',
  styleUrls: ['./tutor-resources.component.scss'],
})
export class TutorResourcesComponent implements OnInit {
  showAddClassResourceModal$: Observable<boolean>;

  constructor(private _store: Store<any>) {}

  ngOnInit(): void {
    this.showAddClassResourceModal$ = this._store.select(
      fromTutor.selectAddClassResourceModal
    );
  }

  onOpenAddClassResource() {
    this._store.dispatch(fromTutorAction.openTutorAddClassResourceModal());
  }

  onCloseAddClassResource() {
    this._store.dispatch(fromTutorAction.closeTutorAddClassResourceModal());
  }
}
