import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentViewSubmittedAssignmentModalComponent } from '@metutor/modules/student/components';

describe('StudentViewSubmittedAssignmentModalComponent', () => {
  let component: StudentViewSubmittedAssignmentModalComponent;
  let fixture: ComponentFixture<StudentViewSubmittedAssignmentModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentViewSubmittedAssignmentModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(
      StudentViewSubmittedAssignmentModalComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
