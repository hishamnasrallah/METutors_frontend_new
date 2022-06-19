import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'metutors-student-success-slide',
  templateUrl: './student-success-slide.component.html',
  styleUrls: ['./student-success-slide.component.scss'],
})
export class StudentSuccessSlideComponent implements OnInit {
  @Input() token: string;

  constructor() {}

  ngOnInit(): void {}
}
