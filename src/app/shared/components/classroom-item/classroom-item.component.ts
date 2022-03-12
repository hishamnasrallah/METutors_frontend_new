import { Component, Input, OnInit } from '@angular/core';

import { ClassroomType } from 'src/app/config';

@Component({
  selector: 'metutors-classroom-item',
  templateUrl: './classroom-item.component.html',
  styleUrls: ['./classroom-item.component.scss'],
})
export class ClassroomItemComponent implements OnInit {
  @Input() classroom!: any;
  @Input() completeCourse: boolean;
  @Input() url = '/student/classroom/syllabus/';

  classroomType = ClassroomType;
  openClassroomDetailsPopop = false;

  constructor() {}

  ngOnInit(): void {}

  // calculateDurationTime(startTime?: Date, endTime?: Date): number {
  //   return calculateDurationTime(startTime, endTime);
  // }
}
