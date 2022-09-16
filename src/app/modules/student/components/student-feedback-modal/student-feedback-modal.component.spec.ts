import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentFeedbackModalComponent } from './student-feedback-modal.component';

describe('StudentFeedbackModalComponent', () => {
  let component: StudentFeedbackModalComponent;
  let fixture: ComponentFixture<StudentFeedbackModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentFeedbackModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentFeedbackModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
