import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'metutors-learning-made-easy',
  templateUrl: './learning-made-easy.component.html',
  styleUrls: ['./learning-made-easy.component.scss'],
})
export class LearningMadeEasyComponent implements OnInit {
  @Input() token: string;

  constructor() {}

  ngOnInit(): void {}
}
