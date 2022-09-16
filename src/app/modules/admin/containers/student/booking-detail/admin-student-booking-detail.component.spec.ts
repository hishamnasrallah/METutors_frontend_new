import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStudentBookingDetailComponent } from './admin-student-booking-detail.component';

describe('AdminStudentBookingDetailComponent', () => {
  let component: AdminStudentBookingDetailComponent;
  let fixture: ComponentFixture<AdminStudentBookingDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminStudentBookingDetailComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStudentBookingDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
