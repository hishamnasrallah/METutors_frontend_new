import { ClassroomType } from 'src/app/config';
import { IClassroom } from 'src/app/core/models';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'metutors-classroom-item-horizental',
  templateUrl: './classroom-item-horizental.component.html',
  styleUrls: ['./classroom-item-horizental.component.scss'],
})
export class ClassroomItemHorizentalComponent implements OnInit {
  @Input() classroom?: IClassroom;

  classroomType = ClassroomType;
  openClassroomDetailsPopop = false;

  constructor() {}

  ngOnInit(): void {}
}
