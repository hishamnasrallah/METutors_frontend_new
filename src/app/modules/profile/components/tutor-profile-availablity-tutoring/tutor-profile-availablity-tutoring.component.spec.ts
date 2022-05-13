import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorProfileAvailablityTutoringComponent } from './tutor-profile-availablity-tutoring.component';

describe('TutorProfileAvailablityTutoringComponent', () => {
  let component: TutorProfileAvailablityTutoringComponent;
  let fixture: ComponentFixture<TutorProfileAvailablityTutoringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TutorProfileAvailablityTutoringComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorProfileAvailablityTutoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
