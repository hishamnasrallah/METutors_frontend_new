import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'metutors-tutor-dispute-modal',
  templateUrl: './tutor-dispute-modal.component.html',
  styleUrls: ['./tutor-dispute-modal.component.scss'],
})
export class TutorDisputeModalComponent implements OnInit {
  @Input() data: any;
  @Input() submitting: boolean;
  @Input() showModal: boolean = false;

  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();
  @Output() submitReason: EventEmitter<any> = new EventEmitter<any>();

  form: FormGroup;

  constructor(private _fb: FormBuilder) {}

  get disputeReason(): AbstractControl | null {
    return this.form.get('reason');
  }

  ngOnInit(): void {
    this.form = this._fb.group({
      reason: [null, [Validators.required, Validators.maxLength(800)]],
    });
  }
}
