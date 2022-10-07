import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import {
  FormGroup,
  Validators,
  FormBuilder,
  AbstractControl,
} from '@angular/forms';

import { CLASSROOM_TOPICS_SCALE } from '@config';

@Component({
  selector: 'metutors-student-add-highlighted-topic-modal',
  templateUrl: './student-add-highlighted-topic-modal.component.html',
  styleUrls: ['./student-add-highlighted-topic-modal.component.scss'],
})
export class StudentAddHighlightedTopicModalComponent implements OnInit {
  @Input() topic: any;
  @Input() showModal = false;
  @Input() isSubmitting = false;

  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();
  @Output() submitted: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  form: FormGroup;
  topicsScale = CLASSROOM_TOPICS_SCALE;

  constructor(private _formBuilder: FormBuilder) {}

  get topicName(): AbstractControl | null {
    return this.form.get('name');
  }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      confidence_scale: [
        this.topic ? this.topic?.confidenceScale : 2,
        [Validators.required],
      ],
      name: [
        this.topic ? this.topic?.name : null,
        [Validators.required, Validators.maxLength(120)],
      ],
    });
  }
}
