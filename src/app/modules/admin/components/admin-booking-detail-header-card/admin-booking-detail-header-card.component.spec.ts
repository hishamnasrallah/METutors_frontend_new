import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBookingDetailHeaderCardComponent } from './admin-booking-detail-header-card.component';

describe('AdminBookingDetailHeaderCardComponent', () => {
  let component: AdminBookingDetailHeaderCardComponent;
  let fixture: ComponentFixture<AdminBookingDetailHeaderCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminBookingDetailHeaderCardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBookingDetailHeaderCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
