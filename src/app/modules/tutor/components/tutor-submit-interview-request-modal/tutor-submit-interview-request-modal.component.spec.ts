import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorSubmitInterviewRequestModalComponent } from './tutor-submit-interview-request-modal.component';

describe('TutorSubmitInterviewRequestModalComponent', () => {
  let component: TutorSubmitInterviewRequestModalComponent;
  let fixture: ComponentFixture<TutorSubmitInterviewRequestModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TutorSubmitInterviewRequestModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(
      TutorSubmitInterviewRequestModalComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
