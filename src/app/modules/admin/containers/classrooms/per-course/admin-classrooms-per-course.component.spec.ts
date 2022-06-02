import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminClassroomsPerCourseComponent } from '@metutor/modules/admin/containers';

describe('AdminClassroomsPerCourseComponent', () => {
  let component: AdminClassroomsPerCourseComponent;
  let fixture: ComponentFixture<AdminClassroomsPerCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminClassroomsPerCourseComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminClassroomsPerCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
