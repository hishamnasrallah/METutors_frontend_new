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
    this.form = this._fb.group({
      name: [null, Validators.required],
      discount: [0, Validators.required],
      expiry_date: [null, Validators.required],
      description: [null, Validators.required],
    });

    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.minDate = tomorrow;
  }
}
