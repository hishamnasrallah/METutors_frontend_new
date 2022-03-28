import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'metutors-admin-hourly-rate-per-subject-modal',
  templateUrl: './admin-hourly-rate-per-subject-modal.component.html',
  styleUrls: ['./admin-hourly-rate-per-subject-modal.component.scss'],
})
export class AdminHourlyRatePerSubjectModalComponent implements OnInit {
  @Input() showModal = false;

  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();
  @Output() submitted: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  form: FormGroup;

  constructor(private _fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this._fb.group({
      message: [null, Validators.required]
    });
  }
}
