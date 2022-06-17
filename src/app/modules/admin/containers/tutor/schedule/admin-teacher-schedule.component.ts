import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromCore from '@metutor/core/state';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'metutors-admin-teacher-schedule',
  templateUrl: './admin-teacher-schedule.component.html',
  styleUrls: ['./admin-teacher-schedule.component.scss'],
})
export class AdminTeacherScheduleComponent implements OnInit {
  isLoading$: Observable<boolean>;
  schedule$: Observable<any | null>;

  days: any;

  constructor(private _store: Store<any>) {}

  ngOnInit(): void {
    this._prepareSchedule();
    this.days = this._prepareWeekDays();
  }

  private _prepareSchedule(): void {
    this._store.dispatch(fromCore.loadAdminTutorSchedule());
    this.schedule$ = this._store.select(fromCore.selectAdminTutorSchedule);
    this.isLoading$ = this._store.select(fromCore.selectIsLoadingTutorSchedule);
  }

  private _prepareWeekDays(date?: Date, days = 7): Date[] {
    const list: any[] = [];

    for (let i = 0; i < days; i++) {
      const result = date ? new Date(date) : new Date();

      list.push(result.setDate(result.getDate() + i));
    }

    return list;
  }
}
