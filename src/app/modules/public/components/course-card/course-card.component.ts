import { COURSE_TAGS_CONST } from '@metutor/config';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'metutors-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss'],
})
export class CourseCardComponent implements OnInit {
  @Input() course?: any;

  courseTags = COURSE_TAGS_CONST;

  constructor() {}

  ngOnInit(): void {}
}
