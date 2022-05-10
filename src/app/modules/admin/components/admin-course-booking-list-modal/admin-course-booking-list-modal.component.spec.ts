import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCourseBookingListModalComponent } from './admin-course-booking-list-modal.component';

describe('AdminCourseBookingListModalComponent', () => {
  let component: AdminCourseBookingListModalComponent;
  let fixture: ComponentFixture<AdminCourseBookingListModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminCourseBookingListModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCourseBookingListModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
