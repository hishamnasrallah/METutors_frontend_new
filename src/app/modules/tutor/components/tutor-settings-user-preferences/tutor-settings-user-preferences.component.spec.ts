import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorSettingsUserPreferencesComponent } from './tutor-settings-user-preferences.component';

describe('TutorSettingsUserPreferencesComponent', () => {
  let component: TutorSettingsUserPreferencesComponent;
  let fixture: ComponentFixture<TutorSettingsUserPreferencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TutorSettingsUserPreferencesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorSettingsUserPreferencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
