import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'metutors-learning-environment',
  templateUrl: './learning-environment.component.html',
  styleUrls: ['./learning-environment.component.scss'],
})
export class LearningEnvironmentComponent implements OnInit {
  @Input() courseFieldSubject: any[] = [];

  constructor() {}

  ngOnInit(): void {}
}
