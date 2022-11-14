import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorPaymentConfirmationModalComponent } from './tutor-payment-confirmation-modal.component';

describe('TutorPaymentConfirmationModalComponent', () => {
  let component: TutorPaymentConfirmationModalComponent;
  let fixture: ComponentFixture<TutorPaymentConfirmationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TutorPaymentConfirmationModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorPaymentConfirmationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
