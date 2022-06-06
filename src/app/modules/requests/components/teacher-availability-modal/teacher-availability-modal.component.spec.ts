import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherAvailabilityModalComponent } from './teacher-availability-modal.component';

describe('TeacherAvailabilityModalComponent', () => {
  let component: TeacherAvailabilityModalComponent;
  let fixture: ComponentFixture<TeacherAvailabilityModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TeacherAvailabilityModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherAvailabilityModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
