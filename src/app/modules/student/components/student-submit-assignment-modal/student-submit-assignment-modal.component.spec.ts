import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentSubmitAssignmentModalComponent } from './student-submit-assignment-modal.component';

describe('StudentSubmitAssignmentModalComponent', () => {
  let component: StudentSubmitAssignmentModalComponent;
  let fixture: ComponentFixture<StudentSubmitAssignmentModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentSubmitAssignmentModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentSubmitAssignmentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
