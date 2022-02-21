import { Component, Input, OnInit } from '@angular/core';
import { IStatistics } from 'src/app/core/models';

@Component({
  selector: 'metutors-facts-statistics',
  templateUrl: './facts-statistics.component.html',
  styleUrls: ['./facts-statistics.component.scss'],
})
export class FactsStatisticsComponent implements OnInit {
  @Input() statistics?: IStatistics[];

  constructor() {}

  ngOnInit(): void {}
}
