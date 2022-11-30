import { AbstractControl, FormGroup } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'metutors-send-feedback',
  templateUrl: './send-feedback.component.html',
  styleUrls: ['./send-feedback.component.scss'],
})
export class SendFeedbackComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() buttonLabel: string;
  @Input() messageLabel: string;
  @Input() feedbackOptions: any;
  @Input() isSubmitting: boolean;

  @Output() submitFeedback: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  get review(): AbstractControl | null {
    return this.form.get('review');
  }

  ngOnInit(): void {}
}
