import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFinanceCoursesComponent } from './admin-finance-courses.component';

describe('AdminFinanceCoursesComponent', () => {
  let component: AdminFinanceCoursesComponent;
  let fixture: ComponentFixture<AdminFinanceCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminFinanceCoursesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFinanceCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
