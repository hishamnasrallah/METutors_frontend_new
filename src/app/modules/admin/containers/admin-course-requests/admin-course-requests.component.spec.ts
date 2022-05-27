import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCourseRequestsComponent } from './admin-course-requests.component';

describe('AdminCourseRequestsComponent', () => {
  let component: AdminCourseRequestsComponent;
  let fixture: ComponentFixture<AdminCourseRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminCourseRequestsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCourseRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
