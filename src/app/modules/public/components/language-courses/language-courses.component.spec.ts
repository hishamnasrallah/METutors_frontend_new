import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageCoursesComponent } from './language-courses.component';

describe('LanguageCoursesComponent', () => {
  let component: LanguageCoursesComponent;
  let fixture: ComponentFixture<LanguageCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LanguageCoursesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguageCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
