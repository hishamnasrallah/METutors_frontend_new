import { Component, Input, OnInit } from '@angular/core';
import { COURSE_TAGS_CONST } from '@metutor/config';
import { ICourse } from '@metutor/core/models';

@Component({
  selector: 'metutors-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss'],
})
export class CourseCardComponent implements OnInit {
  @Input() course?: ICourse;

  courseTags = COURSE_TAGS_CONST;

  constructor() {}

  ngOnInit(): void {}
}
