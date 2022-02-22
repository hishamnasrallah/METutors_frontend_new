import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'metutors-request-post-course',
  templateUrl: './request-post-course.component.html',
  styleUrls: ['./request-post-course.component.scss'],
})
export class RequestPostCourseComponent implements OnInit {
  @Input() step?: string;
  @Input() selectedCourse: any;
  @Input() requestCoursesList?: any[];

  constructor() {}

  ngOnInit(): void {}
}
