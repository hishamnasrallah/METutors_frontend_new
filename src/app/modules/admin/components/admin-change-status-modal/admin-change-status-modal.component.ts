import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TICKET_STATUSES_CONST } from '@metutor/config';

@Component({
  selector: 'metutors-admin-change-status-modal',
  templateUrl: './admin-change-status-modal.component.html',
  styleUrls: ['./admin-change-status-modal.component.scss'],
})
export class AdminChangeStatusModalComponent implements OnInit {
  @Input() status = '';
  @Input() showModal = false;
  @Input() isSubmitting: boolean;
  @Input() statusList = TICKET_STATUSES_CONST;
  @Input() heading = 'Do you want to change the status?';

  @Output() submitted: EventEmitter<any> = new EventEmitter<any>();
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  form: FormGroup;

  constructor(private _fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this._fb.group({
      status: [this.status, Validators.required],
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
