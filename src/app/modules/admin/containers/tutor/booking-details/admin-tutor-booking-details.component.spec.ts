import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTutorBookingDetailsComponent } from './admin-tutor-booking-details.component';

describe('AdminTutorBookingDetailsComponent', () => {
  let component: AdminTutorBookingDetailsComponent;
  let fixture: ComponentFixture<AdminTutorBookingDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminTutorBookingDetailsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTutorBookingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
