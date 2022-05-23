import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'metutors-change-status-modal',
  templateUrl: './change-status-modal.component.html',
  styleUrls: ['./change-status-modal.component.scss'],
})
export class ChangeStatusModalComponent implements OnInit {
  @Input() showModal = false;
  @Input() submitting: boolean;

  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  form: FormGroup;

  constructor(private _fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this._fb.group({
      reason: [null, [Validators.required, Validators.minLength(3)]],
    });
  }
}
