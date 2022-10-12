import { Store } from '@ngrx/store';
import { WEEK_DAYS } from '@config';
import { map } from 'rxjs/operators';
import * as fromCore from '@metutor/core/state';
import { combineLatest, Observable } from 'rxjs';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'metutors-student-attendance-modal',
  templateUrl: './student-attendance-modal.component.html',
  styleUrls: ['./student-attendance-modal.component.scss'],
})
export class StudentAttendanceModalComponent implements OnInit {
  @Input() showModal = false;

  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  view$: Observable<{ loading: boolean; attendance: any }>;

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
    this.view$ = combineLatest([
      this._store.select(fromCore.selectStudentAttendance),
      this._store.select(fromCore.selectIsLoadingStudentAttendance),
    ]).pipe(map(([attendance, loading]) => ({ loading, attendance })));
  }
}
