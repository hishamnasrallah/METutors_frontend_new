import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorSettingsProfileComponent } from './tutor-settings-profile.component';

describe('TutorSettingsProfileComponent', () => {
  let component: TutorSettingsProfileComponent;
  let fixture: ComponentFixture<TutorSettingsProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TutorSettingsProfileComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorSettingsProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
