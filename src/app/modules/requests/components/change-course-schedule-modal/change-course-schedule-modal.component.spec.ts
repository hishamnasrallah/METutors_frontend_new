import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeCourseScheduleModalComponent } from './change-course-schedule-modal.component';

describe('ChangeCourseScheduleModalComponent', () => {
  let component: ChangeCourseScheduleModalComponent;
  let fixture: ComponentFixture<ChangeCourseScheduleModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChangeCourseScheduleModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeCourseScheduleModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
