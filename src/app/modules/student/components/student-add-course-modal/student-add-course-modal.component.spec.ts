import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAddCourseModalComponent } from './student-add-course-modal.component';

describe('StudentAddCourseModalComponent', () => {
  let component: StudentAddCourseModalComponent;
  let fixture: ComponentFixture<StudentAddCourseModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentAddCourseModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentAddCourseModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
