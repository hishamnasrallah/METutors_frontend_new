import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorProfileShareComponent } from './tutor-profile-share.component';

describe('TutorProfileShareComponent', () => {
  let component: TutorProfileShareComponent;
  let fixture: ComponentFixture<TutorProfileShareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TutorProfileShareComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorProfileShareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
