import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorProfileAboutMeComponent } from './tutor-profile-about-me.component';

describe('TutorProfileAboutMeComponent', () => {
  let component: TutorProfileAboutMeComponent;
  let fixture: ComponentFixture<TutorProfileAboutMeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TutorProfileAboutMeComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorProfileAboutMeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
