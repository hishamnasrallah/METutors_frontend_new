import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentTutorReAssignmentModalComponent } from './student-tutor-re-assignment-modal.component';

describe('StudentTutorReAssignmentModalComponent', () => {
  let component: StudentTutorReAssignmentModalComponent;
  let fixture: ComponentFixture<StudentTutorReAssignmentModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentTutorReAssignmentModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentTutorReAssignmentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
