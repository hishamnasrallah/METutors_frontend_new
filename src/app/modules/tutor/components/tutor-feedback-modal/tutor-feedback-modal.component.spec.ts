import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorFeedbackModalComponent } from './tutor-feedback-modal.component';

describe('TutorFeedbackModalComponent', () => {
  let component: TutorFeedbackModalComponent;
  let fixture: ComponentFixture<TutorFeedbackModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TutorFeedbackModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorFeedbackModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
