import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import * as fromCore from '@metutor/core/state';
import { combineLatest, Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

import * as fromStudent from '@metutor/modules/student/state';
import * as fromStudentAction from '@metutor/modules/student/state/actions';

import {
  WEEK_DAYS,
  courseStatusLabel,
  AcademicTutoringTextbook,
} from '@config';

@Component({
  selector: 'metutors-student-resources',
  templateUrl: './student-resources.component.html',
  styleUrls: ['./student-resources.component.scss'],
})
export class StudentResourcesComponent implements OnInit {
  openViewResourceModal$: Observable<boolean>;
  view$: Observable<{ loading: boolean; resources: any }>;

  studentDocTab = true;
  statusLabel = courseStatusLabel;
  academicTutoringTextbook = AcademicTutoringTextbook;

  constructor(private _store: Store<any>) {}

  getDays(weekdays: string) {
    const listDays: any = [];
    const splitDays = weekdays?.split(',');

    if (splitDays?.length) {
      splitDays.forEach((day: any) => listDays.push(WEEK_DAYS[day]));
    }

    if (listDays.length) {
      return listDays.join(',');
    }

    return '';
  }

  openViewResourceModal(id: number): void {
    this._store.dispatch(
      fromStudentAction.openStudentViewResourceModal({ id })
    );
  }

  onCloseViewResourceModal(): void {
    this._store.dispatch(fromStudentAction.closeStudentViewResourceModal());
  }

  onOpenUploadDocModal(): void {}

  ngOnInit(): void {
    this._store.dispatch(fromCore.loadStudentResources());
    this.openViewResourceModal$ = this._store.select(
      fromStudent.selectViewResourceModal
    );

    this.view$ = combineLatest([
      this._store.select(fromCore.selectStudentResources),
      this._store.select(fromCore.selectIsLoadingStudentResources),
    ]).pipe(map(([resources, loading]) => ({ loading, resources })));
  }
}
