import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TICKET_STATUSES_CONST } from '@metutor/config';

@Component({
  selector: 'metutors-change-ticket-status-modal',
  templateUrl: './change-ticket-status-modal.component.html',
  styleUrls: ['./change-ticket-status-modal.component.scss'],
})
export class ChangeTicketStatusModalComponent implements OnInit {
  @Input() ticketId: string;
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
        ticketId: this.ticketId,
        status: form.value.status,
      });
    }
  }
}
