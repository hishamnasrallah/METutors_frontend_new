import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { DatePipe } from '@angular/common';
import * as fromCore from '@metutor/core/state';
import { Component, OnInit } from '@angular/core';
import { ISchedule } from '@metutor/core/models';

@Component({
  selector: 'metutors-admin-teacher-schedule',
  templateUrl: './admin-teacher-schedule.component.html',
  styleUrls: ['./admin-teacher-schedule.component.scss'],
  providers: [DatePipe],
})
export class AdminTeacherScheduleComponent implements OnInit {
  isLoading$: Observable<boolean>;
  schedule$: Observable<ISchedule | null>;

  constructor(private _store: Store<any>, private _datePipe: DatePipe) {}

  ngOnInit(): void {
    this._prepareSchedule();
  }

  onChangeDateDay(event: any): void {
    this._store.dispatch(
      fromCore.loadAdminTutorSchedule({
        startingDate: this._datePipe.transform(event.value, 'yyyy-MM-dd') || '',
      })
    );
  }

  checkIsToday(date: string): boolean {
    if (new Date().toDateString() == new Date(date).toDateString()) return true;

    return false;
  }

  private _prepareSchedule(): void {
    this._store.dispatch(fromCore.loadAdminTutorSchedule({}));
    this.schedule$ = this._store.select(fromCore.selectAdminTutorSchedule);
    this.isLoading$ = this._store.select(fromCore.selectIsLoadingTutorSchedule);
  }
}
