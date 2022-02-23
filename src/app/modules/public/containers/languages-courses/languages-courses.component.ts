import { Component, OnInit } from '@angular/core';
import {
  COURSE_TAGS_CONST,
  COURSE_TUITION_TYPES_CONST,
  TuitionType,
} from 'src/app/config';
import { ICourse } from 'src/app/core/models';

@Component({
  selector: 'metutors-languages-courses',
  templateUrl: './languages-courses.component.html',
  styleUrls: ['./languages-courses.component.scss'],
})
export class LanguagesCoursesComponent implements OnInit {
  testmonials: any;
  courses!: ICourse[];

  constructor() {}

  ngOnInit(): void {
    this.courses = [
      {
        id: 1,
        picture: '',
        tag: COURSE_TAGS_CONST.new,
        name: 'The Web Developer Bootcamp 2020',
        tuitionType: TuitionType.one,
        rate: 4.5,
        reviewsCount: 20,
        description:
          'Understand Bitcoin’s real-life applications and learn how to attack and destroy Bitcoin, Ethereum, smart contracts and Dapps, and alternatives to Bitcoin’s Proof-of-Work',
        duration: 30,
        classroomNumber: 3,
        tuitionValue: COURSE_TUITION_TYPES_CONST.one,
        priceRange: {
          min: 23.9,
          max: 34.5,
        },
      },
      {
        id: 2,
        picture: '',
        tag: COURSE_TAGS_CONST.pop,
        name: 'The Web Developer Bootcamp 2020',
        tuitionType: TuitionType.group,
        rate: 4.5,
        reviewsCount: 20,
        description:
          'Understand Bitcoin’s real-life applications and learn how to attack and destroy Bitcoin, Ethereum, smart contracts and Dapps, and alternatives to Bitcoin’s Proof-of-Work',
        duration: 30,
        classroomNumber: 3,
        tuitionValue: COURSE_TUITION_TYPES_CONST.group,
        priceRange: {
          min: 23.9,
          max: 34.5,
        },
      },
      {
        id: 1,
        picture: '',
        tag: COURSE_TAGS_CONST.top,
        name: 'The Web Developer Bootcamp 2020',
        tuitionType: TuitionType.both,
        rate: 4.5,
        reviewsCount: 20,
        description:
          'Understand Bitcoin’s real-life applications and learn how to attack and destroy Bitcoin, Ethereum, smart contracts and Dapps, and alternatives to Bitcoin’s Proof-of-Work',
        duration: 30,
        classroomNumber: 3,
        tuitionValue: COURSE_TUITION_TYPES_CONST.both,
        priceRange: {
          min: 23.9,
          max: 34.5,
        },
      },
    ];

    this.testmonials = [
      {
        id: 1,
        content:
          '“Their UI/UX skills and experience, were key to identifying potential friction points within our Business Processes, which they fixed or streamlined beautifull”.',
        picture: '',
        postedBy: 'Jaquon Hart',
        role: 'Student',
      },
      {
        id: 2,
        content:
          'Ehya pushed us to think beyond our initial scope and imagination while ensuring that the design and shape of the platform are continually adjusted based on data.',
        picture: '',
        postedBy: 'Valdemar Forsberg',
        role: 'Student',
      },
      {
        id: 3,
        content:
          '“Their UI/UX skills and experience, were key to identifying potential friction points within our Business Processes, which they fixed or streamlined beautifull”.',
        picture: '',
        postedBy: 'Jaquon Hart',
        role: 'Student',
      },
      {
        id: 4,
        content:
          'Ehya pushed us to think beyond our initial scope and imagination while ensuring that the design and shape of the platform are continually adjusted based on data.',
        picture: '',
        postedBy: 'Valdemar Forsberg',
        role: 'Student',
      },
    ];
  }

  ngOnDestroy(): void {}
}
