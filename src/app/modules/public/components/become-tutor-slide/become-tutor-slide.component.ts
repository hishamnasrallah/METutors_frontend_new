import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'metutors-become-tutor-slide',
  templateUrl: './become-tutor-slide.component.html',
  styleUrls: ['./become-tutor-slide.component.scss'],
})
export class BecomeTutorSlideComponent implements OnInit {
  @Input() token: string;

  constructor() {}

  ngOnInit(): void {}
}
