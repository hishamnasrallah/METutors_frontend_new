import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorPaymentSuccessModalComponent } from './tutor-payment-success-modal.component';

describe('TutorPaymentSuccessModalComponent', () => {
  let component: TutorPaymentSuccessModalComponent;
  let fixture: ComponentFixture<TutorPaymentSuccessModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TutorPaymentSuccessModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorPaymentSuccessModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
