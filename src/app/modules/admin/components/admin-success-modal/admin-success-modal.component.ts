import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'metutors-admin-success-modal',
  templateUrl: './admin-success-modal.component.html',
  styleUrls: ['./admin-success-modal.component.scss'],
})
export class AdminSuccessModalComponent implements OnInit {
  @Input() heading: string;
  @Input() routerLink: any;
  @Input() showModal: boolean;
  @Input() subHeading: string;
  @Input() buttonLabel: string;
  @Input() icon = 'checked-reward.svg';

  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}
}
