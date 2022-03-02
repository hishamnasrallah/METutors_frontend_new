import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';

import { IClassroom, ITutor } from '@models';
import * as fromCore from '@metutor/core/state';
import { ClassroomType } from '@metutor/config';

@Component({
  selector: 'metutors-tutor-dashboard',
  templateUrl: './tutor-dashboard.component.html',
  styleUrls: ['./tutor-dashboard.component.scss'],
})
export class TutorDashboardComponent implements OnInit {
  rate = 4;

  tutor$: Observable<ITutor | null>;
  loadingTutor$: Observable<boolean>;

  classroom: IClassroom = {
    id: 1,
    startDate: '2022-12-12',
    expectedEndDate: '2022-12-30',
    name: 'Python for Data Science and Machine Learning Boo …',
    type: ClassroomType.one,
    listDays: ['Fri', 'Sat', 'Sun'],
    completedClasses: 10,
    totalHours: 30,
    startETime: new Date(),
    endETime: new Date(),
    remainingClasses: 10,
    progress: 30,
    enrolledStudents: [
      {
        id: 1,
        avatar: 'https://logo.clearbit.com/tarjama.com',
      },
      {
        id: 2,
        avatar: 'https://logo.clearbit.com/noon.ae',
      },
      {
        id: 3,
        avatar: 'https://logo.clearbit.com/tamatem.co',
      },
      {
        id: 4,
        avatar: '',
      },
    ],
  };

  constructor(private _store: Store<any>) {}

  ngOnInit(): void {
    this._store.dispatch(fromCore.loadTutor({ id: 1145 }));
    this.tutor$ = this._store.select(fromCore.selectTutor);
    this.loadingTutor$ = this._store.select(fromCore.selectIsLoadingTutor);
  }
}
