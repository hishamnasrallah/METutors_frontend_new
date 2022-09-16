import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentCancelCourseSuccessModalComponent } from './student-cancel-course-success-modal.component';

describe('StudentCancelCourseSuccessModalComponent', () => {
  let component: StudentCancelCourseSuccessModalComponent;
  let fixture: ComponentFixture<StudentCancelCourseSuccessModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentCancelCourseSuccessModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentCancelCourseSuccessModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
