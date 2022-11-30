import { IClassroom } from '@metutor/core/models';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'metutors-invoice-classroom-details',
  templateUrl: './invoice-classroom-details.component.html',
  styleUrls: ['./invoice-classroom-details.component.scss'],
})
export class InvoiceClassroomDetailsComponent implements OnInit {
  @Input() classroom: IClassroom | null;

  constructor() {}

  ngOnInit(): void {}
}
