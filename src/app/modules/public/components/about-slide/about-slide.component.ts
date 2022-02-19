import { Component, Input, OnInit } from '@angular/core';
import { IStatistics } from 'src/app/core/models';

@Component({
  selector: 'metutors-about-slide',
  templateUrl: './about-slide.component.html',
  styleUrls: ['./about-slide.component.scss'],
})
export class AboutSlideComponent implements OnInit {
  @Input() aboutStatistics?: IStatistics[];

  constructor() {}

  ngOnInit(): void {}
}
