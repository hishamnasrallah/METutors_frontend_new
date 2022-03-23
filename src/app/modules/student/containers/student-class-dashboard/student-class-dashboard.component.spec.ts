import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentClassDashboardComponent } from './student-class-dashboard.component';

describe('StudentClassDashboardComponent', () => {
  let component: StudentClassDashboardComponent;
  let fixture: ComponentFixture<StudentClassDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentClassDashboardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentClassDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
