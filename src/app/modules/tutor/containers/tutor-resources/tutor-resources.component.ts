import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
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
    this._store.dispatch(fromTutorAction.openTutorAddClassResourceModal());
  }

  onOpenEditClassResource() {
    this._store.dispatch(fromTutorAction.openTutorEditClassResourceModal());
  }

  onCloseAddClassResource() {
    this._store.dispatch(fromTutorAction.closeTutorAddClassResourceModal());
  }

  onSaveResource(form: FormGroup): void {
    const { id, urls, files, description } = form.value;

    const filing = files.map((f: any) => f.file);
    console.log(filing);

    const formData = new FormData();
    formData.append('files', filing);
    formData.append('classId', this.classId);
    formData.append('description', description);
    formData.append('urls', JSON.stringify(urls.slice(0, -1)));

    if (id) {
    } else {
      this._store.dispatch(fromCore.addTutorResource({ formData }));
    }
  }

  ngOnInit(): void {
    this._store.dispatch(fromCore.loadTutorResources());
    this.showAddClassResourceModal$ = this._store.select(
      fromTutor.selectAddClassResourceModal
    );

    this.view$ = combineLatest([
      this._store.select(fromCore.selectTutorResources),
      this._store.select(fromCore.selectIsLoadingTutorResources),
    ]).pipe(map(([resources, loading]) => ({ loading, resources })));
  }
}
