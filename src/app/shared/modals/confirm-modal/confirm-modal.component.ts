import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'metutors-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss'],
})
export class ConfirmModalComponent implements OnInit {
  @Input() icon: string;
  @Input() heading: string;
  @Input() loading: boolean;
  @Input() showModal = false;
  @Input() subHeading: string;
  @Input() cancelLabel = 'Cancel';
  @Input() confirmLabel = 'Delete';

  @Output() confirm: EventEmitter<void> = new EventEmitter<void>();
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}
}
