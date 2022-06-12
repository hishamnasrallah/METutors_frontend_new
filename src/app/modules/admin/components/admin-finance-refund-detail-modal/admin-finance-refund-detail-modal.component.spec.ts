import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFinanceRefundDetailModalComponent } from './admin-finance-refund-detail-modal.component';

describe('AdminFinanceRefundDetailModalComponent', () => {
  let component: AdminFinanceRefundDetailModalComponent;
  let fixture: ComponentFixture<AdminFinanceRefundDetailModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminFinanceRefundDetailModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFinanceRefundDetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
