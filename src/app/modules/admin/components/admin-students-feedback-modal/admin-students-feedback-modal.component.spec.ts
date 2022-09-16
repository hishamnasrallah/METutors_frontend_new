import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStudentsFeedbackModalComponent } from './admin-students-feedback-modal.component';

describe('AdminStudentsFeedbackModalComponent', () => {
  let component: AdminStudentsFeedbackModalComponent;
  let fixture: ComponentFixture<AdminStudentsFeedbackModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminStudentsFeedbackModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStudentsFeedbackModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
