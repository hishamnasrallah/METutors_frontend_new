import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorProfileFeedbackRatingsComponent } from './tutor-profile-feedback-ratings.component';

describe('TutorProfileFeedbackRatingsComponent', () => {
  let component: TutorProfileFeedbackRatingsComponent;
  let fixture: ComponentFixture<TutorProfileFeedbackRatingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TutorProfileFeedbackRatingsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorProfileFeedbackRatingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
