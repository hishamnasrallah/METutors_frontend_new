import { Component, Input, OnInit } from '@angular/core';
import { COURSE_TAGS_CONST, TuitionType } from 'src/app/config';
import { IClassroom } from 'src/app/core/models';

@Component({
  selector: 'metutors-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.scss'],
})
export class CourseItemComponent implements OnInit {
  @Input() classroom?: IClassroom;

  tuitionType = TuitionType;
  courseTags = COURSE_TAGS_CONST;

  constructor() {}

  ngOnInit(): void {}
}
