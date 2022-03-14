import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorRejectCourseModalComponent } from './tutor-reject-course-modal.component';

describe('TutorRejectCourseModalComponent', () => {
  let component: TutorRejectCourseModalComponent;
  let fixture: ComponentFixture<TutorRejectCourseModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TutorRejectCourseModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorRejectCourseModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
