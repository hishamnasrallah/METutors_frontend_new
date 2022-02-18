import { Component, Input, OnInit } from '@angular/core';
import { IClassroom } from 'src/app/core/models';

@Component({
  selector: 'metutors-home-courses',
  templateUrl: './home-courses.component.html',
  styleUrls: ['./home-courses.component.scss'],
})
export class HomeCoursesComponent implements OnInit {
  @Input() classroomsPrep: IClassroom[] = [];
  @Input() classroomsLang: IClassroom[] = [];

  constructor() {}

  ngOnInit(): void {}
}
