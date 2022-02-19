import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorProfileTutorBadgesComponent } from './tutor-profile-tutor-badges.component';

describe('TutorProfileTutorBadgesComponent', () => {
  let component: TutorProfileTutorBadgesComponent;
  let fixture: ComponentFixture<TutorProfileTutorBadgesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TutorProfileTutorBadgesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorProfileTutorBadgesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
