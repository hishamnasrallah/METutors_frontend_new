import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminViewFeedbackModalComponent } from './admin-view-feedback-modal.component';

describe('AdminStudentViewFeedbackModalComponent', () => {
  let component: AdminViewFeedbackModalComponent;
  let fixture: ComponentFixture<AdminViewFeedbackModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminViewFeedbackModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminViewFeedbackModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
