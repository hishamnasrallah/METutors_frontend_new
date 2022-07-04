import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { generalConstants } from '@metutor/config';

@Component({
  selector: 'metutors-admin-decline-interview-modal',
  templateUrl: './admin-decline-interview-modal.component.html',
  styleUrls: ['./admin-decline-interview-modal.component.scss'],
})
export class AdminDeclineInterviewModalComponent implements OnInit {
  @Input() showModal = false;
  @Input() isDeclineRequest: boolean;

  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();
  @Output() submitted: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  form: FormGroup;
  reasons = generalConstants.rejectionReasons;

  constructor(private _fb: FormBuilder) {
    this.form = this._fb.group({
      message: [null, Validators.required],
    });
  }

  ngOnInit(): void {}
}
