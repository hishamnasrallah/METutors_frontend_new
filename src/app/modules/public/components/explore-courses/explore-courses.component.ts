import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'metutors-explore-courses',
  templateUrl: './explore-courses.component.html',
  styleUrls: ['./explore-courses.component.scss'],
})
export class ExploreCoursesComponent implements OnInit {
  @Input() loading: boolean;

  @Output() filterCourses = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}
}
