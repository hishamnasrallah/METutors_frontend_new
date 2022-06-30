import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentInvoiceDetailsComponent } from './payment-invoice-details.component';

describe('PaymentInvoiceDetailsComponent', () => {
  let component: PaymentInvoiceDetailsComponent;
  let fixture: ComponentFixture<PaymentInvoiceDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaymentInvoiceDetailsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentInvoiceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
