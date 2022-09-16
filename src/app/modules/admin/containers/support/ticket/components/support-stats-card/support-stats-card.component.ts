import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'metutors-support-stats-card',
  templateUrl: './support-stats-card.component.html',
  styleUrls: ['./support-stats-card.component.scss'],
})
export class SupportStatsCardComponent implements OnInit {
  @Input() counts: any;

  constructor() {}

  ngOnInit(): void {}
}
