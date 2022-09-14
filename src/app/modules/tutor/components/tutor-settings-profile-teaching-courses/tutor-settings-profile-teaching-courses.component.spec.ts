import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorSettingsProfileTeachingCoursesComponent } from './tutor-settings-profile-teaching-courses.component';

describe('TutorSettingsProfileTeachingCoursesComponent', () => {
  let component: TutorSettingsProfileTeachingCoursesComponent;
  let fixture: ComponentFixture<TutorSettingsProfileTeachingCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TutorSettingsProfileTeachingCoursesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(
      TutorSettingsProfileTeachingCoursesComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
