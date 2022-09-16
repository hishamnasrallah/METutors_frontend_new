import { Component, Input } from '@angular/core';

@Component({
  selector: 'metutors-start-learning-now',
  templateUrl: './start-learning-now.component.html',
  styleUrls: ['./start-learning-now.component.scss'],
})
export class StartLearningNowComponent {
  @Input() desc: string;
  @Input() token: string;
  @Input() title: string;
  @Input() btnText: string;
}
