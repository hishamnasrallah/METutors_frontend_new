import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Observable, combineLatest } from 'rxjs';
import { Component, OnInit } from '@angular/core';

import * as fromCore from '@metutor/core/state';
import { courseStatusLabel, WEEK_DAYS } from '@config';
import * as fromTutor from '@metutor/modules/tutor/state';
import * as fromTutorAction from '@metutor/modules/tutor/state/actions';

@Component({
  selector: 'metutors-tutor-resources',
  templateUrl: './tutor-resources.component.html',
  styleUrls: ['./tutor-resources.component.scss'],
})
export class TutorResourcesComponent implements OnInit {
  classId: string;
  resourceId: number;
  heading = 'Add Resources';

  statusLabel = courseStatusLabel;
  isSavingResource$: Observable<boolean>;
  showConfirmModal$: Observable<boolean>;
  isDeletingResource$: Observable<boolean>;
  showAddClassResourceModal$: Observable<boolean>;
  view$: Observable<{ loading: boolean; resources: any }>;

  constructor(private _store: Store<any>) {}

  getDays(weekdays: string) {
    const listDays: any = [];
    const splitDays = weekdays.split(',');
    if (splitDays.length) {
      splitDays.forEach((day: any) => listDays.push(WEEK_DAYS[day]));
    }

    return listDays;
  }

  onOpenAddClassResource(classId: string) {
    this.classId = classId;
    this.heading = 'Add Resources';
    this._store.dispatch(fromTutorAction.openTutorAddClassResourceModal());
  }

  onOpenEditClassResource(id: number) {
    this.heading = 'Edit Resources';
    this._store.dispatch(
      fromTutorAction.openTutorEditClassResourceModal({ id })
    );
  }

  onCloseAddClassResource() {
    console.log('rsoucr');
    this._store.dispatch(fromTutorAction.closeTutorAddClassResourceModal());
  }

  onOpenConfirmModal(resourceId: number) {
    this.resourceId = resourceId;
    this._store.dispatch(fromTutorAction.openTutorConfirmModal());
  }

  onCloseConfirmModal() {
    console.log('confirm');
    this._store.dispatch(fromTutorAction.closeTutorConfirmModal());
  }

  onDeleteResource(id: number): void {
    this._store.dispatch(fromCore.deleteTutorResource({ id }));
  }

  onSaveResource(data: any): void {
    const { resourceId, urls, files, description } = data;

    const body = {
      urls,
      files,
      resourceId,
      description,
      classId: this.classId,
    };

    if (resourceId) {
      this._store.dispatch(fromCore.editTutorResource({ body }));
    } else {
      this._store.dispatch(fromCore.addTutorResource({ body }));
    }
  }

  ngOnInit(): void {
    this._store.dispatch(fromCore.loadTutorResources());
    this.showAddClassResourceModal$ = this._store.select(
      fromTutor.selectAddClassResourceModal
    );

    this.showConfirmModal$ = this._store.select(
      fromTutor.selectTutorConfirmModal
    );

    this.isSavingResource$ = this._store.select(
      fromCore.selectIsAddingTutorResources
    );

    this.isDeletingResource$ = this._store.select(
      fromCore.selectIsDeletingResource
    );

    this.view$ = combineLatest([
      this._store.select(fromCore.selectTutorResources),
      this._store.select(fromCore.selectIsLoadingTutorResources),
    ]).pipe(map(([resources, loading]) => ({ loading, resources })));
  }
}
