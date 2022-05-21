import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStudentViewFeedbackModalComponent } from './admin-student-view-feedback-modal.component';

describe('AdminStudentViewFeedbackModalComponent', () => {
  let component: AdminStudentViewFeedbackModalComponent;
  let fixture: ComponentFixture<AdminStudentViewFeedbackModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminStudentViewFeedbackModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStudentViewFeedbackModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
