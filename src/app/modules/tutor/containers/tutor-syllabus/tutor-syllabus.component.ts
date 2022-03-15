import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  group,
  animate,
} from '@angular/animations';
import { Observable, Subscription, combineLatest } from 'rxjs';
import { IClassroom, ISyllabus } from 'src/app/core/models';
import { Title } from '@angular/platform-browser';
import { CoursesService } from 'src/app/core/services';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ClassroomType, WEEK_DAYS } from '@metutor/config';
import { Store } from '@ngrx/store';
import * as fromCore from '@metutor/core/state';
import { map } from 'rxjs/operators';

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
export class TutorSyllabusComponent implements OnInit {
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

  view$: Observable<{ loading: boolean; syllabus: any }>;

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
    this._store.dispatch(fromCore.loadTutorSyllabus());
    this.view$ = combineLatest([
      this._store.select(fromCore.selectTutorSyllabus),
      this._store.select(fromCore.selectIsLoadingTutorSyllabus),
    ]).pipe(map(([syllabus, loading]) => ({ loading, syllabus })));
  }
}
