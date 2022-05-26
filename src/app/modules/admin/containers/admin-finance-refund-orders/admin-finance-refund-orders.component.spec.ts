import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFinanceRefundOrdersComponent } from './admin-finance-refund-orders.component';

describe('AdminFinanceRefundOrdersComponent', () => {
  let component: AdminFinanceRefundOrdersComponent;
  let fixture: ComponentFixture<AdminFinanceRefundOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminFinanceRefundOrdersComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFinanceRefundOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
