import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorSettingsPaymentInformationComponent } from './tutor-settings-payment-information.component';

describe('TutorSettingsPaymentInformationComponent', () => {
  let component: TutorSettingsPaymentInformationComponent;
  let fixture: ComponentFixture<TutorSettingsPaymentInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TutorSettingsPaymentInformationComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorSettingsPaymentInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
