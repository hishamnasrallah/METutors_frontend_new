import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestPostCourseComponent } from './request-post-course.component';

describe('RequestPostCourseComponent', () => {
  let component: RequestPostCourseComponent;
  let fixture: ComponentFixture<RequestPostCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RequestPostCourseComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestPostCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
