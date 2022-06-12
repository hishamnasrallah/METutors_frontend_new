import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFinanceRefundPaymentModalComponent } from './admin-finance-refund-payment-modal.component';

describe('AdminFinanceRefundPaymentModalComponent', () => {
  let component: AdminFinanceRefundPaymentModalComponent;
  let fixture: ComponentFixture<AdminFinanceRefundPaymentModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminFinanceRefundPaymentModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFinanceRefundPaymentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
