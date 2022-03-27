import { Store } from '@ngrx/store';
import { WEEK_DAYS } from '@config';
import { map } from 'rxjs/operators';
import { combineLatest, Observable } from 'rxjs';

import { Component, OnInit } from '@angular/core';
import * as fromCore from '@metutor/core/state';

@Component({
  selector: 'metutors-student-resources',
  templateUrl: './student-resources.component.html',
  styleUrls: ['./student-resources.component.scss'],
})
export class StudentResourcesComponent implements OnInit {
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

  ngOnInit(): void {
    this._store.dispatch(fromCore.loadStudentResources());

    this.view$ = combineLatest([
      this._store.select(fromCore.selectStudentResources),
      this._store.select(fromCore.selectIsLoadingStudentResources),
    ]).pipe(map(([resources, loading]) => ({ loading, resources })));
  }
}
