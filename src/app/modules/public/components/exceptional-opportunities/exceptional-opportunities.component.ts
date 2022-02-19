import { Component, Input, OnInit } from '@angular/core';
import { IStatistics } from 'src/app/core/models';

@Component({
  selector: 'metutors-exceptional-opportunities',
  templateUrl: './exceptional-opportunities.component.html',
  styleUrls: ['./exceptional-opportunities.component.scss'],
})
export class ExceptionalOpportunitiesComponent implements OnInit {
  @Input() tutorStatistics?: IStatistics[];

  constructor() {}

  ngOnInit(): void {}
}
