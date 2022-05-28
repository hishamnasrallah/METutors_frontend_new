import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TICKET_STATUSES_CONST } from '@metutor/config';

@Component({
  selector: 'metutors-admin-change-status-modal',
  templateUrl: './admin-change-status-modal.component.html',
  styleUrls: ['./admin-change-status-modal.component.scss'],
})
export class AdminChangeStatusModalComponent implements OnInit {
  @Input() showModal = false;
  @Input() isSubmitting: boolean;

  @Output() submitted: EventEmitter<any> = new EventEmitter<any>();
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  form: FormGroup;
  ticketStatuses = TICKET_STATUSES_CONST;

  constructor(private _fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this._fb.group({
      status: [null, Validators.required],
    });
  }

  onSubmit(form: FormGroup): void {
    if (form.valid) {
      this.submitted.emit({
        status: form.value.status,
      });
    }
  }
}
