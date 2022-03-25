import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorAssignmentDetailsModalComponent } from './tutor-assignment-details-modal.component';

describe('TutorAssignmentDetailsModalComponent', () => {
  let component: TutorAssignmentDetailsModalComponent;
  let fixture: ComponentFixture<TutorAssignmentDetailsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TutorAssignmentDetailsModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorAssignmentDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
