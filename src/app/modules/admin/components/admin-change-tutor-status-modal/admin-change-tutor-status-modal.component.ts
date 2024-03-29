import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TutorStatus } from '@metutor/config';

@Component({
  selector: 'metutors-admin-change-tutor-status-modal',
  templateUrl: './admin-change-tutor-status-modal.component.html',
  styleUrls: ['./admin-change-tutor-status-modal.component.scss'],
})
export class AdminChangeTutorStatusModalComponent implements OnInit {
  @Input() tutorId: number;
  @Input() showModal = false;
  @Input() changeStatus: any;
  @Input() isSubmitting: boolean;

  @Output() submitted: EventEmitter<any> = new EventEmitter<any>();
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  form: FormGroup;
  tutorStatus = TutorStatus;

  constructor(private _fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this._fb.group({
      reason: [null, [Validators.required, Validators.minLength(3)]],
    });
  }

  onSubmit(form: FormGroup): void {
    if (form.valid) {
      const value = {
        ...form.value,
        tutorId: this.tutorId,
        status: this.changeStatus?.newStatus,
      };

      this.submitted.emit(value);
    }
  }
}
