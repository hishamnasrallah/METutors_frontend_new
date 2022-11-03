import {
  FormGroup,
  Validators,
  FormBuilder,
  AbstractControl,
} from '@angular/forms';

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'metutors-admin-add-coupon',
  templateUrl: './admin-add-coupon.component.html',
  styleUrls: ['./admin-add-coupon.component.scss'],
})
export class AdminAddCouponComponent implements OnInit {
  @Input() isAdding: boolean;
  @Input() selectedCoupon: any;
  @Input() showModal: boolean = false;

  @Output() submitForm: EventEmitter<any> = new EventEmitter<any>();
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  minDate: any;
  form: FormGroup;

  constructor(private _fb: FormBuilder) {}

  get name(): AbstractControl | null {
    return this.form.get('name');
  }

  get expiryDate(): AbstractControl | null {
    return this.form.get('expiry_date');
  }

  get description(): AbstractControl | null {
    return this.form.get('description');
  }

  get discount(): AbstractControl | null {
    return this.form.get('discount');
  }

  formatLabel(value: number) {
    return value + '%';
  }

  ngOnInit(): void {
    const id = this.selectedCoupon?.id ? this.selectedCoupon.id : null;
    const name = this.selectedCoupon?.name ? this.selectedCoupon.name : null;

    const expiry_date = this.selectedCoupon?.expiryDate
      ? this.selectedCoupon.expiryDate
      : null;

    const description = this.selectedCoupon?.description
      ? this.selectedCoupon.description
      : null;

    const discount = this.selectedCoupon?.discount
      ? this.selectedCoupon.discount
      : 0;

    this.form = this._fb.group({
      id: [id],
      discount: [discount, Validators.required],
      expiry_date: [expiry_date, Validators.required],
      name: [name, [Validators.required, Validators.maxLength(50)]],
      description: [
        description,
        [Validators.required, Validators.maxLength(150)],
      ],
    });

    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.minDate = tomorrow;
  }
}
