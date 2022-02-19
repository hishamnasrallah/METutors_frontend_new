import { Component, Input, OnInit } from '@angular/core';
import { ICategory } from 'src/app/core/models';

@Component({
  selector: 'metutors-languages-slide',
  templateUrl: './languages-slide.component.html',
  styleUrls: ['./languages-slide.component.scss'],
})
export class LanguagesSlideComponent implements OnInit {
  @Input() category?: ICategory;

  constructor() {}

  ngOnInit(): void {}
}
