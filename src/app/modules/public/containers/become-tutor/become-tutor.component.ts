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
      {
        id: 1,
        value: 'Simple & quick registration',
      },
      {
        id: 2,
        value: 'Teach your own courses',
      },
      {
        id: 3,
        value: 'Flexible pay-out options',
      },
      {
        id: 4,
        value: 'Useful teaching tools',
      },
      {
        id: 5,
        value: 'Choose your own schedule',
      },
      {
        id: 6,
        value: '24*7 Tutor Support',
      },
      {
        id: 7,
        value: 'Reach more students',
      },
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
        content:
          'MEtutors is the best place to apply for flexible, convenient part-time work as an online tutor.',
        postedBy: '@thepatwalls',
      },
      {
        id: 2,
        picture: '',
        content:
          'I love how MEtutors finds clients for me. I make money tutoring online from the comfort of my home or office and all I need is my high-speed internet connection.',
        postedBy: '@thepatwalls',
      },
      {
        id: 3,
        picture: '',
        content:
          'I enjoy tutoring with MEtutors because I simply sign in to see I’ve been matched with an ideal student',
        postedBy: '@thepatwalls',
      },
      {
        id: 4,
        picture: '',
        content:
          'I owe these guys my life. Already used their landing page templates for my latest two projects.',
        postedBy: '@thepatwalls',
      },
    ];
  }
}
