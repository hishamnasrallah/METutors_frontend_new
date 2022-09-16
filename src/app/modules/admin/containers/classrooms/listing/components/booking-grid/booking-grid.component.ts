import { Component, OnInit, Input } from '@angular/core';

import { ICourse } from '@models';
import { courseStatusLabel } from '@config';

@Component({
  selector: 'metutors-booking-grid',
  templateUrl: './booking-grid.component.html',
  styleUrls: ['./booking-grid.component.scss'],
})
export class BookingGridComponent implements OnInit {
  @Input() bookings: any;
  @Input() loading: boolean;

  statusLabel = courseStatusLabel;

  constructor() {}

  ngOnInit(): void {}
}
