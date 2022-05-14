import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTutorAvailabilityModalComponent } from './admin-tutor-availability-modal.component';

describe('AdminTutorAvailabilityModalComponent', () => {
  let component: AdminTutorAvailabilityModalComponent;
  let fixture: ComponentFixture<AdminTutorAvailabilityModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminTutorAvailabilityModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTutorAvailabilityModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
