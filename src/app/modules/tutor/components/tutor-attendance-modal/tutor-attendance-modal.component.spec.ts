import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorAttendanceModalComponent } from './tutor-attendance-modal.component';

describe('TutorAttendanceModalComponent', () => {
  let component: TutorAttendanceModalComponent;
  let fixture: ComponentFixture<TutorAttendanceModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TutorAttendanceModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorAttendanceModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
