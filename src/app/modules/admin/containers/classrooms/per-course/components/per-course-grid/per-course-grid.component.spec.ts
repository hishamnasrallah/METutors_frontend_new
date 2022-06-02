import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerCourseGridComponent } from './per-course-grid.component';

describe('PerCourseGridComponent', () => {
  let component: PerCourseGridComponent;
  let fixture: ComponentFixture<PerCourseGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PerCourseGridComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerCourseGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
