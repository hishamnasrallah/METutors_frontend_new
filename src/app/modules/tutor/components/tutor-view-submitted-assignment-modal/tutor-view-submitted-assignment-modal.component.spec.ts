import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorViewSubmittedAssignmentModalComponent } from './tutor-view-submitted-assignment-modal.component';

describe('TutorViewSubmittedAssignmentModalComponent', () => {
  let component: TutorViewSubmittedAssignmentModalComponent;
  let fixture: ComponentFixture<TutorViewSubmittedAssignmentModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TutorViewSubmittedAssignmentModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(
      TutorViewSubmittedAssignmentModalComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
