import { IStatistics } from 'src/app/core/models';
import { Component, Input, OnInit } from '@angular/core';

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
