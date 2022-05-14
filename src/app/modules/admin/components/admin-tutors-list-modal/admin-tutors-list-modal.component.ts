import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { ITutor } from '@models';

@Component({
  selector: 'metutors-admin-tutors-list-modal',
  templateUrl: './admin-tutors-list-modal.component.html',
  styleUrls: ['./admin-tutors-list-modal.component.scss'],
})
export class AdminTutorsListModalComponent implements OnInit {
  @Input() showModal: boolean = false;
  @Input() heading = '';
  @Input() subHeading = '';
  @Input() tutors: ITutor[];
  @Input() loading: boolean;

  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();
  @Output() tutorAvailability: EventEmitter<number> =
    new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {}
}
