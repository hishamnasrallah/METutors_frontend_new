import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStudentTotalBookingModalComponent } from './admin-student-total-booking-modal.component';

describe('AdminStudentTotalBookingModalComponent', () => {
  let component: AdminStudentTotalBookingModalComponent;
  let fixture: ComponentFixture<AdminStudentTotalBookingModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminStudentTotalBookingModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStudentTotalBookingModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
