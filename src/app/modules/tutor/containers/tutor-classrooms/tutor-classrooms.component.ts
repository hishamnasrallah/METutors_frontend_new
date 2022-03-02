import {
  animate,
  group,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ClassroomType } from '@metutor/config';
import { IClassroom } from 'src/app/core/models';
import { CoursesService } from 'src/app/core/services';

@Component({
  selector: 'metutors-tutor-classrooms',
  templateUrl: './tutor-classrooms.component.html',
  styleUrls: ['./tutor-classrooms.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('in', style({ height: '*', opacity: 0 })),
      transition(':leave', [
        style({ height: '*', opacity: 1 }),

        group([
          animate(300, style({ height: 0 })),
          animate('200ms ease-in-out', style({ opacity: '0' })),
        ]),
      ]),
      transition(':enter', [
        style({ height: '0', opacity: 0 }),

        group([
          animate(300, style({ height: '*' })),
          animate('400ms ease-in-out', style({ opacity: '1' })),
        ]),
      ]),
    ]),
  ],
})
export class TutorClassroomsComponent implements OnInit {
  openActive = true;
  isLoading?: boolean;
  openCompleted = true;
  // activeClassrooms: IClassroom[] = [];
  // completedClassrooms: IClassroom[] = [];

  activeClassrooms: IClassroom[] = [
    {
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
    },
    {
      id: 2,
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
    },
    {
      id: 3,
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
    },
  ];

  completedClassrooms: IClassroom[] = [
    {
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
    },
    {
      id: 2,
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
    },
    {
      id: 3,
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
    },
  ];

  constructor(private _courseService: CoursesService) {}

  ngOnInit(): void {
    // this.isLoading = true;
    // this._courseService.fetchMyClassrooms().subscribe(
    //   (response) => {
    //     this.isLoading = false;
    //     if (response && response.length) {
    //       this.activeClassrooms = response.filter(
    //         (classroom: any) => classroom?.isComplete === false
    //       );
    //       this.completedClassrooms = response.filter(
    //         (classroom: any) => classroom?.isComplete === true
    //       );
    //     }
    //   },
    //   (error) => {
    //     this.isLoading = false;
    //   }
    // );
  }
}
