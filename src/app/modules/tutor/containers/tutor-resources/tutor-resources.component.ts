import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Observable, combineLatest } from 'rxjs';
import { Component, OnInit } from '@angular/core';

import * as fromCore from '@metutor/core/state';
import * as fromTutor from '@metutor/modules/tutor/state';
import * as fromTutorAction from '@metutor/modules/tutor/state/actions';
import { WEEK_DAYS } from '@config';

@Component({
  selector: 'metutors-tutor-resources',
  templateUrl: './tutor-resources.component.html',
  styleUrls: ['./tutor-resources.component.scss'],
})
export class TutorResourcesComponent implements OnInit {
  showAddClassResourceModal$: Observable<boolean>;

  view$: Observable<{ loading: boolean; resource: any }>;

  constructor(private _store: Store<any>) {}

  getDays(weekdays: string) {
    const listDays: any = [];
    const splitDays = weekdays.split(',');
    if (splitDays.length) {
      splitDays.forEach((day: any) => listDays.push(WEEK_DAYS[day]));
    }

    return listDays;
  }

  onOpenAddClassResource() {
    this._store.dispatch(fromTutorAction.openTutorAddClassResourceModal());
  }

  onCloseAddClassResource() {
    this._store.dispatch(fromTutorAction.closeTutorAddClassResourceModal());
  }

  onSaveResource(resource: any): void {
    console.log(resource.value);
  }

  ngOnInit(): void {
    this._store.dispatch(fromCore.loadTutorResources());
    this.showAddClassResourceModal$ = this._store.select(
      fromTutor.selectAddClassResourceModal
    );

    this.view$ = combineLatest([
      this._store.select(fromCore.selectTutorResource),
      this._store.select(fromCore.selectIsLoadingTutorResource),
    ]).pipe(map(([resource, loading]) => ({ loading, resource })));
  }
}
