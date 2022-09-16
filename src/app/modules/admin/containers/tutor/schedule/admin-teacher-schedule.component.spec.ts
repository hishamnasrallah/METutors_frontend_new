import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTeacherScheduleComponent } from './admin-teacher-schedule.component';

describe('AdminTeacherScheduleComponent', () => {
  let component: AdminTeacherScheduleComponent;
  let fixture: ComponentFixture<AdminTeacherScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminTeacherScheduleComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTeacherScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
