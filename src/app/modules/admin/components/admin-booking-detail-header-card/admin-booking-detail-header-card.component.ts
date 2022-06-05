import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { environment } from '@environment';
import { courseStatusLabel } from '@config';

@Component({
  selector: 'metutors-admin-booking-detail-header-card',
  templateUrl: './admin-booking-detail-header-card.component.html',
  styleUrls: ['./admin-booking-detail-header-card.component.scss'],
})
export class AdminBookingDetailHeaderCardComponent implements OnInit {
  @Input() course: any;
  @Input() type: any = null;

  @Output() clicked: EventEmitter<string> = new EventEmitter<string>();

  statusLabel = courseStatusLabel;
  imageURL = environment.imageURL;

  constructor() {}

  ngOnInit(): void {}
}
