import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCancelCourseModalComponent } from './admin-cancel-course-modal.component';

describe('AdminCancelCourseModalComponent', () => {
  let component: AdminCancelCourseModalComponent;
  let fixture: ComponentFixture<AdminCancelCourseModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminCancelCourseModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCancelCourseModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
