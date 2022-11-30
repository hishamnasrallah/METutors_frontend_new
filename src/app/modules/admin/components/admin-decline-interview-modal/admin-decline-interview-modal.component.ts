import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'metutors-admin-decline-interview-modal',
  templateUrl: './admin-decline-interview-modal.component.html',
  styleUrls: ['./admin-decline-interview-modal.component.scss'],
})
export class AdminDeclineInterviewModalComponent implements OnInit {
  @Input() tutor: any;
  @Input() showModal = false;
  @Input() isDeclineRequest: boolean;

  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();
  @Output() submitted: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  form: FormGroup;

  constructor(private _fb: FormBuilder) {}

  ngOnInit(): void {
    const message = `Hi ${this.tutor?.name}, \nUnfortunately, at this time you have not been accepted to teach on MEtutors. This could be for many reasons. We encourage you to try again in the future. \n\n\nTalent Acquisition Team \nMEtutors`;

    this.form = this._fb.group({
      message: [message, [Validators.required, Validators.minLength(10)]],
    });

    this.form.markAsDirty();
  }
}
