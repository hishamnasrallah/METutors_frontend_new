import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguagesCoursesComponent } from './languages-courses.component';

describe('LanguagesCoursesComponent', () => {
  let component: LanguagesCoursesComponent;
  let fixture: ComponentFixture<LanguagesCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LanguagesCoursesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguagesCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
