import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFinanceRefundModalComponent } from './admin-finance-refund-modal.component';

describe('AdminFinanceRefundModalComponent', () => {
  let component: AdminFinanceRefundModalComponent;
  let fixture: ComponentFixture<AdminFinanceRefundModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminFinanceRefundModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFinanceRefundModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
