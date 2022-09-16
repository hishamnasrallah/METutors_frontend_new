import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorCancelCourseModalComponent } from './tutor-cancel-course-modal.component';

describe('TutorCancelCourseModalComponent', () => {
  let component: TutorCancelCourseModalComponent;
  let fixture: ComponentFixture<TutorCancelCourseModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TutorCancelCourseModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorCancelCourseModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
