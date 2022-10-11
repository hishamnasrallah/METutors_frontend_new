import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromCore from '@metutor/core/state';
import { Component, OnInit } from '@angular/core';
import { IStatistics } from '@metutor/core/models';

@Component({
  selector: 'metutors-study',
  templateUrl: './study.component.html',
  styleUrls: ['./study.component.scss'],
})
export class StudyComponent implements OnInit {
  token$: Observable<string | undefined>;

  testmonials?: any[];
  academicStatistics?: IStatistics[];

  constructor(private _store: Store<any>) {}

  ngOnInit(): void {
    this.token$ = this._store.select(fromCore.selectToken);

    this.academicStatistics = [
      {
        id: 1,
        icon: 'assets/svg/marketing.svg',
        value: '340',
        type: 'COURSES_CREATED',
      },
      {
        id: 1,
        icon: 'assets/svg/create-new.svg',
        value: '30K',
        type: 'STUDENTS_ENROLLED',
      },
      {
        id: 1,
        icon: 'assets/svg/pen.svg',
        value: '10K',
        type: 'CLASSROOMS_ATTENDED',
      },
      {
        id: 1,
        icon: 'assets/svg/headset.svg',
        value: '300+',
        type: 'TEACHER_PROFILES',
      },
    ];

    this.testmonials = [
      {
        id: 1,
        rate: 5,
        content: 'SUCCESS_STORIES_OPTION_1',
        picture: '',
        postedBy: 'Viola Manisa',
        isVerified: true,
      },
      {
        id: 2,
        rate: 5,
        content: 'SUCCESS_STORIES_OPTION_2',
        picture: '',
        postedBy: 'Bryan Arnoldy',
        isVerified: true,
      },
      {
        id: 3,
        rate: 5,
        content: 'SUCCESS_STORIES_OPTION_3',
        picture: '',
        postedBy: 'Joshua William',
        isVerified: true,
      },
      {
        id: 4,
        rate: 5,
        content: 'SUCCESS_STORIES_OPTION_4',
        picture: '',
        postedBy: 'George Scott',
        isVerified: true,
      },
    ];
  }
}
