import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStudentViewAssignmentsModalComponent } from './admin-student-view-assignments-modal.component';

describe('AdminStudentViewAssignmentsModalComponent', () => {
  let component: AdminStudentViewAssignmentsModalComponent;
  let fixture: ComponentFixture<AdminStudentViewAssignmentsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminStudentViewAssignmentsModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(
      AdminStudentViewAssignmentsModalComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
