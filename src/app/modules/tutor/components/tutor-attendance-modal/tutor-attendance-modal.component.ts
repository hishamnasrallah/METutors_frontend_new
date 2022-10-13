import { WEEK_DAYS } from '@config';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import * as fromCore from '@metutor/core/state';
import { combineLatest, Observable } from 'rxjs';
import * as fromTutorAction from '@metutor/modules/tutor/state/actions';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'metutors-tutor-attendance-modal',
  templateUrl: './tutor-attendance-modal.component.html',
  styleUrls: ['./tutor-attendance-modal.component.scss'],
})
export class TutorAttendanceModalComponent implements OnInit {
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

  onOpenFeedbackModal(studentId: number): void {
    const params = { studentId };
    this._store.dispatch(fromTutorAction.openTutorSendFeedbackModal());
    this._store.dispatch(fromTutorAction.closeTutorCourseAttendanceModal());
    this._store.dispatch(fromTutorAction.setTutorStateParams({ params }));
  }

  ngOnInit(): void {
    this.view$ = combineLatest([
      this._store.select(fromCore.selectTutorAttendance),
      this._store.select(fromCore.selectIsLoadingTutorAttendance),
    ]).pipe(map(([attendance, loading]) => ({ loading, attendance })));
  }
}
