import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorBadgesComponent } from './tutor-badges.component';

describe('TutorBadgesComponent', () => {
  let component: TutorBadgesComponent;
  let fixture: ComponentFixture<TutorBadgesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TutorBadgesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorBadgesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
