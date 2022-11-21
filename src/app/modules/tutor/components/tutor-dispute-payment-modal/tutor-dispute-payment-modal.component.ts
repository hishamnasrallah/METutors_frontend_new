import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { animate, style, transition, trigger } from '@angular/animations';

import {
  Input,
  OnInit,
  Output,
  ViewChild,
  Component,
  EventEmitter,
} from '@angular/core';

import { IUser } from '@models';
import { NgxAutoScroll } from 'ngx-auto-scroll';

@Component({
  selector: 'metutors-tutor-dispute-payment-modal',
  templateUrl: './tutor-dispute-payment-modal.component.html',
  styleUrls: ['./tutor-dispute-payment-modal.component.scss'],
  animations: [
    trigger('dropMenuAnimate', [
      transition('void => *', [
        style({ transform: 'translateY(20PX)' }),
        animate(700, style({ transform: 'translateY(0)' })),
      ]),
    ]),
  ],
})
export class TutorDisputePaymentModalComponent implements OnInit {
  @ViewChild(NgxAutoScroll) ngxAutoScroll?: NgxAutoScroll;

  @Input() user: IUser;
  @Input() disputeDetails: any;
  @Input() isAddingComment: boolean;
  @Input() loading: boolean = false;
  @Input() showModal: boolean = false;

  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();
  @Output() submitComment: EventEmitter<any> = new EventEmitter<any>();

  messageForm: FormGroup;

  constructor(private _fb: FormBuilder) {}

  onSubmit(form: FormGroup, dispute_id: number): void {
    if (form.valid) {
      const body = {
        ...form.value,
        dispute_id,
      };
      this.submitComment.emit(body);
    }
  }

  ngOnInit(): void {
    this.messageForm = this._fb.group({
      comment: [null, Validators.required],
    });
  }
}
