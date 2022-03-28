import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHourlyRatePerSubjectModalComponent } from './admin-hourly-rate-per-subject-modal.component';

describe('AdminHourlyRatePerSubjectModalComponent', () => {
  let component: AdminHourlyRatePerSubjectModalComponent;
  let fixture: ComponentFixture<AdminHourlyRatePerSubjectModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminHourlyRatePerSubjectModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminHourlyRatePerSubjectModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
