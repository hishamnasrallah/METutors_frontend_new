import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'metutors-academic-learning-environment',
  templateUrl: './academic-learning-environment.component.html',
  styleUrls: ['./academic-learning-environment.component.scss'],
})
export class AcademicLearningEnvironmentComponent implements OnInit {
  @Output() requestCourse = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}
}
