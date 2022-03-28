import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Observable, combineLatest } from 'rxjs';
import { Component, OnInit } from '@angular/core';

import { WEEK_DAYS } from '@config';
import * as fromCore from '@metutor/core/state';
import * as fromTutor from '@metutor/modules/tutor/state';
import * as fromTutorAction from '@metutor/modules/tutor/state/actions';

@Component({
  selector: 'metutors-tutor-resources',
  templateUrl: './tutor-resources.component.html',
  styleUrls: ['./tutor-resources.component.scss'],
})
export class TutorResourcesComponent implements OnInit {
  classId: string;
  heading = 'Add Resources';

  isSavingResource$: Observable<boolean>;
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
    this._store.dispatch(fromTutorAction.closeTutorAddClassResourceModal());
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
    /*    const formData = new FormData();
    formData.append('urls', urls);
    formData.append('classId', this.classId);
    formData.append('resourceId', resourceId);
    formData.append('description', description);
    formData.append('files', files.toString());*/

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

    this.isSavingResource$ = this._store.select(
      fromCore.selectIsAddingTutorResources
    );

    this.view$ = combineLatest([
      this._store.select(fromCore.selectTutorResources),
      this._store.select(fromCore.selectIsLoadingTutorResources),
    ]).pipe(map(([resources, loading]) => ({ loading, resources })));
  }
}
