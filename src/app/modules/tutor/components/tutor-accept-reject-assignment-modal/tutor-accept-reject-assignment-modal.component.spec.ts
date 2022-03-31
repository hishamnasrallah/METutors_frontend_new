import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorAcceptRejectAssignmentModalComponent } from './tutor-accept-reject-assignment-modal.component';

describe('TutorAcceptRejectAssignmentModalComponent', () => {
  let component: TutorAcceptRejectAssignmentModalComponent;
  let fixture: ComponentFixture<TutorAcceptRejectAssignmentModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TutorAcceptRejectAssignmentModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(
      TutorAcceptRejectAssignmentModalComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
