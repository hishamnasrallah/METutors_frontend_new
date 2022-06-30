import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'metutors-payment-modal',
  templateUrl: './payment-modal.component.html',
  styleUrls: ['./payment-modal.component.scss'],
})
export class PaymentModalComponent implements OnInit {
  @Input() paymentInfo: any;
  @Input() showModal: boolean = false;

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
