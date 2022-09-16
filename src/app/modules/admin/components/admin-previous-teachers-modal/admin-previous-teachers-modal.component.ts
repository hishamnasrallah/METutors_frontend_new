import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { environment } from '@environment';

@Component({
  selector: 'metutors-admin-previous-teachers-modal',
  templateUrl: './admin-previous-teachers-modal.component.html',
  styleUrls: ['./admin-previous-teachers-modal.component.scss'],
})
export class AdminPreviousTeachersModalComponent implements OnInit {
  @Input() loading = false;
  @Input() showModal = false;
  @Input() previousTutors: any;

  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  imagePath = environment.imageURL;

  constructor() {}

  ngOnInit(): void {}
}
