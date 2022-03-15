import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'metutors-tutor-add-syllabus-topic-modal',
  templateUrl: './tutor-add-syllabus-topic-modal.component.html',
  styleUrls: ['./tutor-add-syllabus-topic-modal.component.scss'],
})
export class TutorAddSyllabusTopicModalComponent implements OnInit {
  @Input() showModal = false;

  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}
}
