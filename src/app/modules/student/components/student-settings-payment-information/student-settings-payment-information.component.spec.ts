import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentSettingsPaymentInformationComponent } from './student-settings-payment-information.component';

describe('StudentSettingsPaymentInformationComponent', () => {
  let component: StudentSettingsPaymentInformationComponent;
  let fixture: ComponentFixture<StudentSettingsPaymentInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentSettingsPaymentInformationComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(
      StudentSettingsPaymentInformationComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
