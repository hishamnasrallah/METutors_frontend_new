import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { environment } from '@environment';

@Component({
  selector: 'metutors-tutor-view-kudos-points-detail',
  templateUrl: './tutor-view-kudos-points-detail.component.html',
  styleUrls: ['./tutor-view-kudos-points-detail.component.scss'],
})
export class TutorViewKudosPointsDetailComponent implements OnInit {
  @Input() loading: boolean;
  @Input() kudosPoints: any;
  @Input() showModal: boolean = false;

  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}
}
