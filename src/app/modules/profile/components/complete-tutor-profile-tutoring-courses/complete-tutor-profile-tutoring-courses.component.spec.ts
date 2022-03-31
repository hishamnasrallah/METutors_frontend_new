import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteTutorProfileTutoringCoursesComponent } from './complete-tutor-profile-tutoring-courses.component';

describe('CompleteTutorProfileTutoringCoursesComponent', () => {
  let component: CompleteTutorProfileTutoringCoursesComponent;
  let fixture: ComponentFixture<CompleteTutorProfileTutoringCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompleteTutorProfileTutoringCoursesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(
      CompleteTutorProfileTutoringCoursesComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
