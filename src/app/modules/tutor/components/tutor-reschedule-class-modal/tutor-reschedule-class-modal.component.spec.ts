import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorRescheduleClassModalComponent } from './tutor-reschedule-class-modal.component';

describe('TutorRescheduleClassModalComponent', () => {
  let component: TutorRescheduleClassModalComponent;
  let fixture: ComponentFixture<TutorRescheduleClassModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TutorRescheduleClassModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorRescheduleClassModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
