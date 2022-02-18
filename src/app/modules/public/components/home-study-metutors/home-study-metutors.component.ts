import { Component, Input, OnInit } from '@angular/core';
import { ICategory } from 'src/app/core/models';

@Component({
  selector: 'metutors-home-study-metutors',
  templateUrl: './home-study-metutors.component.html',
  styleUrls: ['./home-study-metutors.component.scss'],
})
export class HomeStudyMetutorsComponent implements OnInit {
  @Input() categories?: ICategory[];

  constructor() {}

  ngOnInit(): void {}
}
