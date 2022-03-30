import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAssignmentDetailsModalComponent } from './student-assignment-details-modal.component';

describe('StudentAssignmentDetailsModalComponent', () => {
  let component: StudentAssignmentDetailsModalComponent;
  let fixture: ComponentFixture<StudentAssignmentDetailsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentAssignmentDetailsModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentAssignmentDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
