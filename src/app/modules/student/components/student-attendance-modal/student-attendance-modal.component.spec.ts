import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAttendanceModalComponent } from '@metutor/modules/student/components';

describe('StudentAttendanceModalComponent', () => {
  let component: StudentAttendanceModalComponent;
  let fixture: ComponentFixture<StudentAttendanceModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentAttendanceModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentAttendanceModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
