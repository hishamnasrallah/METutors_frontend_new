import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorDisputePaymentModalComponent } from './tutor-dispute-payment-modal.component';

describe('TutorDisputePaymentModalComponent', () => {
  let component: TutorDisputePaymentModalComponent;
  let fixture: ComponentFixture<TutorDisputePaymentModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TutorDisputePaymentModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorDisputePaymentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
