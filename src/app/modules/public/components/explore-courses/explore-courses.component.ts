import { environment } from '@environment';
import { IProgram } from '@metutor/core/models';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'metutors-explore-courses',
  templateUrl: './explore-courses.component.html',
  styleUrls: ['./explore-courses.component.scss'],
})
export class ExploreCoursesComponent implements OnInit {
  @Input() loading: boolean;
  @Input() program: IProgram;

  @Output() filterCourses = new EventEmitter();

  programImage = environment.programImage;

  constructor() {}

  ngOnInit(): void {}
}
