import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentComingSoonModalComponent } from '@metutor/modules/requests/components';

describe('PaymentComingSoonModalComponent', () => {
  let component: PaymentComingSoonModalComponent;
  let fixture: ComponentFixture<PaymentComingSoonModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaymentComingSoonModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentComingSoonModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
