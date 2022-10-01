import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'metutors-study-slide',
  templateUrl: './study-slide.component.html',
  styleUrls: ['./study-slide.component.scss'],
})
export class StudySlideComponent implements OnInit {
  @Input() token: string;

  constructor() {}

  ngOnInit(): void {}
}
