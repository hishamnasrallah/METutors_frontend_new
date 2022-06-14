import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { generalConstants } from '@metutor/config';
import { ITutor } from '@metutor/core/models';

@Component({
  selector: 'metutors-view-subject-details-modal',
  templateUrl: './view-subject-details-modal.component.html',
  styleUrls: ['./view-subject-details-modal.component.scss'],
})
export class ViewSubjectDetailsModalComponent implements OnInit {
  @Input() data: any;
  @Input() isLoading: boolean;
  @Input() teachers?: ITutor[];
  @Input() showModal: boolean = false;

  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  iconsImages = generalConstants.subjectsIcons;

  constructor() {}

  ngOnInit(): void {}
}
