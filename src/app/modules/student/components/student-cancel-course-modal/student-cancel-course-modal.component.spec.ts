import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentCancelCourseModalComponent } from './student-cancel-course-modal.component';

describe('StudentCancelCourseModalComponent', () => {
  let component: StudentCancelCourseModalComponent;
  let fixture: ComponentFixture<StudentCancelCourseModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentCancelCourseModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentCancelCourseModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
