import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'metutors-signin-email-verification-modal',
  templateUrl: './signin-email-verification-modal.component.html',
  styleUrls: ['./signin-email-verification-modal.component.scss'],
})
export class SigninEmailVerificationModalComponent implements OnInit {
  @Input() email?: string;
  @Input() loading: boolean;
  @Input() resendLoading: boolean;
  @Input() showModal: boolean = false;

  @Output() submitForm = new EventEmitter();
  @Output() resendEmail = new EventEmitter();
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}
}
