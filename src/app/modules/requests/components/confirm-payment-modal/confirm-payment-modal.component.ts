import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'metutors-confirm-payment-modal',
  templateUrl: './confirm-payment-modal.component.html',
  styleUrls: ['./confirm-payment-modal.component.scss'],
})
export class ConfirmPaymentModalComponent implements OnInit {
  @Input() paymentInfo: any;
  @Input() showModal: boolean = false;

  @Output() payNow: EventEmitter<void> = new EventEmitter<void>();

  loading = true;
  constructor() {}

  ngOnInit(): void {
    // todo: hacky not recommended find a better solution read docs in detail
    let node = document.createElement('script');
    node.src = this.paymentInfo?.script_url;
    node.type = 'text/javascript';
    node.async = true;
    node.charset = 'utf-8';
    document.getElementsByTagName('head')[0].appendChild(node);

    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }
}
