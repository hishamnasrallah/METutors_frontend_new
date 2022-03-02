import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { calculateDurationTime } from 'src/app/config';
import { IClassroom } from 'src/app/core/models';
import { CoursesService } from 'src/app/core/services';
import { ClassroomType } from '@metutor/config';

@Component({
  selector: 'metutors-tutor-classes',
  templateUrl: './tutor-classes.component.html',
  styleUrls: ['./tutor-classes.component.scss'],
})
export class TutorClassesComponent implements OnInit {
  classsroomId?: string;
  // classroom?: IClassroom;
  loadingClassroom?: boolean;
  classroomSub?: Subscription;
  openLeaveFeedbackPopop = false;
  openClassroomAttendancesPopop = false;

  classroom: IClassroom = {
    id: 1,
    startDate: '2022-12-12',
    expectedEndDate: '2022-12-30',
    name: 'Python for Data Science and Machine Learning Boo …',
    type: ClassroomType.group,
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

  constructor(
    private _route: ActivatedRoute,
    private _coursesService: CoursesService,
    private _title: Title
  ) {}

  ngOnInit(): void {
    this._route.paramMap.subscribe((res: ParamMap) => {
      this.classsroomId = res.get('id') || '';
      this.loadingClassroom = true;
      this.classroomSub = this._coursesService
        .getClassroomById(this.classsroomId)
        .subscribe(
          (response) => {
            this.classroom = response;
            this.loadingClassroom = false;
            this._title.setTitle(this.classroom?.name || '');
          },
          (error) => {
            this.loadingClassroom = false;
          }
        );
    });
  }

  // calculateDurationTime(startTime?: Date, endTime?: Date): number {
  //   return calculateDurationTime(startTime, endTime);
  // }

  ngOnDestroy(): void {
    this.classroomSub?.unsubscribe();
  }
}
