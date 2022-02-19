import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'metutors-languages-introducing',
  templateUrl: './languages-introducing.component.html',
  styleUrls: ['./languages-introducing.component.scss'],
})
export class LanguagesIntroducingComponent implements OnInit {
  @Input() langCourseIntro: any;

  constructor() {}

  ngOnInit(): void {}
}
