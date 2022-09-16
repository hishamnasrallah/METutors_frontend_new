import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'metutors-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss'],
})
export class ConfirmModalComponent implements OnInit {
  @Input() heading: string;
  @Input() loading: boolean;
  @Input() showModal = false;
  @Input() icon = 'trash.svg';
  @Input() cancelLabel = 'Cancel';
  @Input() confirmLabel = 'Delete';
  @Input() subHeading = 'Do you really want to delete?';

  @Output() confirm: EventEmitter<void> = new EventEmitter<void>();
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}
}
