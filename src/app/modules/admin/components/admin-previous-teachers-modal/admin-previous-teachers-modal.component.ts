import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'metutors-admin-previous-teachers-modal',
  templateUrl: './admin-previous-teachers-modal.component.html',
  styleUrls: ['./admin-previous-teachers-modal.component.scss'],
})
export class AdminPreviousTeachersModalComponent implements OnInit {
  @Input() showModal = false;

  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}
}
