import { Component, Input, OnInit } from '@angular/core';
import { COURSE_TAGS_CONST, TuitionType } from 'src/app/config';
import { ICourse } from 'src/app/core/models';

@Component({
  selector: 'metutors-course-item-horizental',
  templateUrl: './course-item-horizental.component.html',
  styleUrls: ['./course-item-horizental.component.scss'],
})
export class CourseItemHorizentalComponent implements OnInit {
  @Input() course?: ICourse;
  tuitionType = TuitionType;
  openCourseDetailsPopop = false;
  courseTags = COURSE_TAGS_CONST;

  constructor() {}

  ngOnInit(): void {}
}
