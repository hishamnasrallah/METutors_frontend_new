import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFinanceOrdersComponent } from './admin-finance-orders.component';

describe('AdminFinanceOrdersComponent', () => {
  let component: AdminFinanceOrdersComponent;
  let fixture: ComponentFixture<AdminFinanceOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminFinanceOrdersComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFinanceOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
