import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorPaymentRecordsComponent } from './tutor-payment-records.component';

describe('TutorPaymentRecordsComponent', () => {
  let component: TutorPaymentRecordsComponent;
  let fixture: ComponentFixture<TutorPaymentRecordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TutorPaymentRecordsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorPaymentRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
