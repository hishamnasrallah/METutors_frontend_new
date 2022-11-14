import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorDisputeReasonModalComponent } from './tutor-dispute-reason-modal.component';

describe('TutorDisputeReasonModalComponent', () => {
  let component: TutorDisputeReasonModalComponent;
  let fixture: ComponentFixture<TutorDisputeReasonModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TutorDisputeReasonModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorDisputeReasonModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
