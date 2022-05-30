import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ICourseRequest } from '@metutor/core/models';

@Component({
  selector: 'metutors-admin-request-details-modal',
  templateUrl: './admin-request-details-modal.component.html',
  styleUrls: ['./admin-request-details-modal.component.scss'],
})
export class AdminRequestDetailsModalComponent implements OnInit {
  @Input() showModal: boolean = false;
  @Input() requestDetails: ICourseRequest;

  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}
}
