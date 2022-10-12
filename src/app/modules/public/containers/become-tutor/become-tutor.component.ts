import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromCore from '@metutor/core/state';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'metutors-become-tutor',
  templateUrl: './become-tutor.component.html',
  styleUrls: ['./become-tutor.component.scss'],
})
export class BecomeTutorComponent implements OnInit {
  token$: Observable<string | undefined>;

  step?: string;
  selectedCourse: any;
  opportunities?: any[];
  whyTeachingUsList?: any[];
  requestCoursesList?: any[];

  constructor(private _store: Store<any>) {}

  ngOnInit(): void {
    this.token$ = this._store.select(fromCore.selectToken);

    this.whyTeachingUsList = [
      'WHY_TEACHING_US_OPTION_1',
      'WHY_TEACHING_US_OPTION_2',
      'WHY_TEACHING_US_OPTION_3',
      'WHY_TEACHING_US_OPTION_4',
      'WHY_TEACHING_US_OPTION_5',
      'WHY_TEACHING_US_OPTION_6',
      'WHY_TEACHING_US_OPTION_7',
      'WHY_TEACHING_US_OPTION_8',
    ];

    this.requestCoursesList = [
      {
        id: 1,
        number: 'Step one',
        title: 'Become a tutor',
        content:
          'long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has page when looking at its layout. The point of using Lorem.',
        videoUrl: 'http://static.videogular.com/a',
      },
      {
        id: 2,
        number: 'Step two',
        title: 'Complete course details',
        content:
          'long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has page when looking at its layout. The point of using Lorem.',
        videoUrl: 'http://static.videogular.com/a',
      },
      {
        id: 3,
        number: 'Step three',
        title: 'Submit your request for approval ',
        content:
          'long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has page when looking at its layout. The point of using Lorem.',
        videoUrl: 'http://static.videogular.com/a',
      },
      {
        id: 4,
        number: 'Step four',
        title: 'Start teaching',
        content:
          'long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has page when looking at its layout. The point of using Lorem.',
        videoUrl: 'http://static.videogular.com/a',
      },
    ];
    this.selectedCourse = this.requestCoursesList[0];
    this.step = 'STEP' + this.selectedCourse?.id;

    this.opportunities = [
      {
        id: 1,
        picture: '',
        content: 'WHAT_TUTORS_SAY_OPTION_1',
        postedBy: 'Kamran Khatti',
      },
      {
        id: 2,
        picture: '',
        content: 'WHAT_TUTORS_SAY_OPTION_2',
        postedBy: 'Michael Fine',
      },
      {
        id: 3,
        picture: '',
        content: 'WHAT_TUTORS_SAY_OPTION_3',
        postedBy: 'Dimitri',
      },
      {
        id: 4,
        picture: '',
        content: 'WHAT_TUTORS_SAY_OPTION_4',
        postedBy: 'Jorge Alvarado',
      },
    ];
  }
}
