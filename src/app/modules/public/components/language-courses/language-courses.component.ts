import { Component, Input, OnInit } from '@angular/core';
import { ICategory, ICourse } from 'src/app/core/models';

@Component({
  selector: 'metutors-language-courses',
  templateUrl: './language-courses.component.html',
  styleUrls: ['./language-courses.component.scss'],
})
export class LanguageCoursesComponent implements OnInit {
  @Input() courses?: ICourse[];
  @Input() category?: ICategory;

  constructor() {}

  ngOnInit(): void {}
}
