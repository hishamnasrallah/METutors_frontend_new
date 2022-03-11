import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  group,
  animate,
} from '@angular/animations';
import { Subscription } from 'rxjs';
import { IClassroom, ISyllabus } from 'src/app/core/models';
import { Title } from '@angular/platform-browser';
import { CoursesService } from 'src/app/core/services';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ClassroomType } from '@metutor/config';

@Component({
  selector: 'metutors-tutor-syllabus',
  templateUrl: './tutor-syllabus.component.html',
  styleUrls: ['./tutor-syllabus.component.scss'],
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
export class TutorSyllabusComponent implements OnInit, OnDestroy {
  classsroomId: string;
  // classroom: IClassroom;
  selectedCourse?: number;
  loadingSyllabus: boolean;
  syllabusSub: Subscription;
  loadingClassroom: boolean;
  openCourse: boolean = false;
  classroomSub: Subscription;
  syllabuses: ISyllabus[] = [
    {
      id: 1,
      batch: 2,
      title: 'Matter and chemistry',
      description:
        'Have a fundamental understanding of the Python programming language',
      totalHours: 10,
      progress: 55,
      classes: [
        {
          id: 1,
          number: 2,
          subject: 'Life Advice Looking Through A Window',
          days: 'Sunday, Monday, Friday',
          date: 'Sunday',
          startTime: '12:00 PM',
          endTime: '2:00 PM',
          duration: 10,
        },
        {
          id: 1,
          number: 2,
          subject: 'Life Advice Looking Through A Window',
          days: 'Sunday, Monday, Friday',
          date: 'Sunday',
          startTime: '12:00 PM',
          endTime: '2:00 PM',
          duration: 10,
        },
        {
          id: 1,
          number: 2,
          subject: 'Life Advice Looking Through A Window',
          days: 'Sunday, Monday, Friday',
          date: 'Sunday',
          startTime: '12:00 PM',
          endTime: '2:00 PM',
          duration: 10,
        },
      ],
    },
    {
      id: 2,
      batch: 2,
      title: 'Matter and chemistry',
      description:
        'Have a fundamental understanding of the Python programming language',
      totalHours: 10,
      progress: 55,
      classes: [
        {
          id: 1,
          number: 2,
          subject: 'Life Advice Looking Through A Window',
          days: 'Sunday, Monday, Friday',
          date: 'Sunday',
          startTime: '12:00 PM',
          endTime: '2:00 PM',
          duration: 10,
        },
        {
          id: 1,
          number: 2,
          subject: 'Life Advice Looking Through A Window',
          days: 'Sunday, Monday, Friday',
          date: 'Sunday',
          startTime: '12:00 PM',
          endTime: '2:00 PM',
          duration: 10,
        },
        {
          id: 1,
          number: 2,
          subject: 'Life Advice Looking Through A Window',
          days: 'Sunday, Monday, Friday',
          date: 'Sunday',
          startTime: '12:00 PM',
          endTime: '2:00 PM',
          duration: 10,
        },
      ],
    },
    {
      id: 3,
      batch: 2,
      title: 'Matter and chemistry',
      description:
        'Have a fundamental understanding of the Python programming language',
      totalHours: 10,
      progress: 55,
      classes: [
        {
          id: 1,
          number: 2,
          subject: 'Life Advice Looking Through A Window',
          days: 'Sunday, Monday, Friday',
          date: 'Sunday',
          startTime: '12:00 PM',
          endTime: '2:00 PM',
          duration: 10,
        },
        {
          id: 1,
          number: 2,
          subject: 'Life Advice Looking Through A Window',
          days: 'Sunday, Monday, Friday',
          date: 'Sunday',
          startTime: '12:00 PM',
          endTime: '2:00 PM',
          duration: 10,
        },
        {
          id: 1,
          number: 2,
          subject: 'Life Advice Looking Through A Window',
          days: 'Sunday, Monday, Friday',
          date: 'Sunday',
          startTime: '12:00 PM',
          endTime: '2:00 PM',
          duration: 10,
        },
      ],
    },
  ];

  classroom: IClassroom = {
    id: 1,
    startDate: '2022-12-12',
    endDate: '2022-12-30',
    name: 'Python for Data Science and Machine Learning Boo …',
    type: ClassroomType.one,
    listDays: ['Fri', 'Sat', 'Sun'],
    completedClasses: 10,
    hours: 30,
    startTime: new Date(),
    endTime: new Date(),
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

  constructor(
    private _route: ActivatedRoute,
    private _coursesService: CoursesService,
    private _title: Title
  ) {}

  ngOnInit(): void {
    this._route.paramMap.subscribe((res: ParamMap) => {
      this.classsroomId = res.get('id') || '';
      // this.loadingClassroom = true;
      // this.classroomSub = this._coursesService
      //   .getClassroomById(this.classsroomId)
      //   .subscribe(
      //     (response) => {
      //       this.loadingClassroom = false;
      //       this.classroom = response;
      //       this._title.setTitle(this.classroom?.name || '');
      //     },
      //     (error) => {
      //       this.loadingClassroom = false;
      //     }
      //   );

      // this.loadingSyllabus = true;
      // this.syllabusSub = this._coursesService
      //   .getSyllabusByCourseId(this.classsroomId)
      //   .subscribe(
      //     (response) => {
      //       this.syllabuses = response;
      //       this.loadingSyllabus = false;
      //     },
      //     (error) => {
      //       this.loadingSyllabus = false;
      //     }
      //   );
    });
  }

  // calculateDurationTime(startTime: Date, endTime: Date): number {
  //   return calculateDurationTime(startTime, endTime);
  // }

  changeOpenSelection(id: number): void {
    if (this.selectedCourse === id) {
      this.openCourse = false;
      this.selectedCourse = undefined;
    } else {
      this.openCourse = true;
      this.selectedCourse = id;
    }
  }

  ngOnDestroy(): void {
    this.classroomSub?.unsubscribe();
    this.syllabusSub?.unsubscribe();
  }
}
