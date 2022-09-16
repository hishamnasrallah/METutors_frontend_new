import { Store } from '@ngrx/store';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';

import * as fromCore from '@metutor/core/state';
import { ISchedule } from '@metutor/core/models';

@Component({
  selector: 'metutors-admin-teacher-schedule',
  templateUrl: './admin-teacher-schedule.component.html',
  styleUrls: ['./admin-teacher-schedule.component.scss'],
  providers: [DatePipe],
})
export class AdminTeacherScheduleComponent implements OnInit {
  view$: Observable<{ loading: boolean; schedule: ISchedule | null }>;

  perPage = 10;

  constructor(private _store: Store<any>, private _datePipe: DatePipe) {}

  ngOnInit(): void {
    this._store.dispatch(
      fromCore.loadAdminTutorSchedule({ params: { page: 1, search: '' } })
    );

    this.view$ = combineLatest([
      this._store.select(fromCore.selectAdminTutorSchedule),
      this._store.select(fromCore.selectIsLoadingTutorSchedule),
    ]).pipe(map(([schedule, loading]) => ({ loading, schedule })));
  }

  onChangeDateDay(event: any): void {
    this._store.dispatch(
      fromCore.loadAdminTutorSchedule({
        params: { page: 1, search: '' },
        startingDate: this._datePipe.transform(event.value, 'yyyy-MM-dd') || '',
      })
    );
  }

  checkIsToday(date: string): boolean {
    return new Date().toDateString() == new Date(date).toDateString();
  }

  onPageChange({ page }: any): void {
    this._store.dispatch(
      fromCore.loadAdminTutorSchedule({ params: { page, search: '' } })
    );
  }
}
