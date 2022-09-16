import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminManagementTutorReAssignmentComponent } from './admin-management-tutor-re-assignment.component';

describe('AdminManagementTutorReAssignmentComponent', () => {
  let component: AdminManagementTutorReAssignmentComponent;
  let fixture: ComponentFixture<AdminManagementTutorReAssignmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminManagementTutorReAssignmentComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(
      AdminManagementTutorReAssignmentComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
