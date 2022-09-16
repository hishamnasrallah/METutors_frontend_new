import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestNewCourseModalComponent } from './request-new-course-modal.component';

describe('RequestNewCourseModalComponent', () => {
  let component: RequestNewCourseModalComponent;
  let fixture: ComponentFixture<RequestNewCourseModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RequestNewCourseModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestNewCourseModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
