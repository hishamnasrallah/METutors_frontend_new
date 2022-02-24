import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { calculateDurationTime } from 'src/app/config';
import { IClassroom } from 'src/app/core/models';
import { CoursesService } from 'src/app/core/services';

@Component({
  selector: 'metutors-student-classes',
  templateUrl: './student-classes.component.html',
  styleUrls: ['./student-classes.component.scss'],
})
export class StudentClassesComponent implements OnInit {
  classsroomId?: string;
  classroom?: IClassroom;
  loadingClassroom?: boolean;
  classroomSub?: Subscription;
  openLeaveFeedbackPopop = false;
  openClassroomAttendancesPopop = false;

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
