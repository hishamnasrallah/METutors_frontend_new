import { Component, Input, OnInit } from '@angular/core';
import { calculateDurationTime, ClassroomType } from 'src/app/config';
import { IClassroom } from 'src/app/core/models';

@Component({
  selector: 'metutors-classroom-item',
  templateUrl: './classroom-item.component.html',
  styleUrls: ['./classroom-item.component.scss'],
})
export class ClassroomItemComponent implements OnInit {
  @Input() classroom!: IClassroom | null;

  classroomType = ClassroomType;
  openClassroomDetailsPopop = false;

  constructor() {}

  ngOnInit(): void {}

  // calculateDurationTime(startTime?: Date, endTime?: Date): number {
  //   return calculateDurationTime(startTime, endTime);
  // }
}
