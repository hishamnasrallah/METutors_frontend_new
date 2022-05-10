import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAllBookingClassroomsComponent } from './admin-all-booking-classrooms.component';

describe('AdminAllBookingClassroomsComponent', () => {
  let component: AdminAllBookingClassroomsComponent;
  let fixture: ComponentFixture<AdminAllBookingClassroomsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminAllBookingClassroomsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAllBookingClassroomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
