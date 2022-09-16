import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditFeedbackModalComponent } from './admin-edit-feedback-modal.component';

describe('AdminEditFeedbackModalComponent', () => {
  let component: AdminEditFeedbackModalComponent;
  let fixture: ComponentFixture<AdminEditFeedbackModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminEditFeedbackModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEditFeedbackModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
