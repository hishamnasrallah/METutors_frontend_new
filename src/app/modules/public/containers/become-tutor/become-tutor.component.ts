import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'metutors-become-tutor',
  templateUrl: './become-tutor.component.html',
  styleUrls: ['./become-tutor.component.scss'],
})
export class BecomeTutorComponent implements OnInit {
  step?: string;
  selectedCourse: any;
  opportunities?: any[];
  whyTeachingUsList?: any[];
  requestCoursesList?: any[];

  constructor() {}

  ngOnInit(): void {
    this.whyTeachingUsList = [
      {
        id: 1,
        value: 'Very competitive prices',
      },
      {
        id: 2,
        value: 'Personalized course design',
      },
      {
        id: 3,
        value: 'Powerful online tools and technology',
      },
      {
        id: 4,
        value: 'Highly trained and dynamic instructors',
      },
      {
        id: 5,
        value: 'Flexible scheduling for people on the go',
      },
      {
        id: 6,
        value: 'Attentive and responsive customer support',
      },
      {
        id: 7,
        value: 'Provide a relax yet professional learning environment',
      },
      {
        id: 8,
        value: 'Innovative, stimulating and efficacious lessons',
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
          'I owe these guys my life. Already used their landing page templates for my latest two projects.',
        postedBy: '@thepatwalls',
      },
      {
        id: 2,
        picture: '',
        content:
          "Time is the most precious thing you have when bootstrapping. You can't take time to ponder on design",
        postedBy: '@thepatwalls',
      },
      {
        id: 3,
        picture: '',
        content:
          'I owe these guys my life. Already used their landing page templates for my latest two projects.',
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
