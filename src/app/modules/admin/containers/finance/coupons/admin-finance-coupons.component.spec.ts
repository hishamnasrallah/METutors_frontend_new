import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFinanceCouponsComponent } from './admin-finance-coupons.component';

describe('AdminFinanceCouponsComponent', () => {
  let component: AdminFinanceCouponsComponent;
  let fixture: ComponentFixture<AdminFinanceCouponsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminFinanceCouponsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFinanceCouponsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
