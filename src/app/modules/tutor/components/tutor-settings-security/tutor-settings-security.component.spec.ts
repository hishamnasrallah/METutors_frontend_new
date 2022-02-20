import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorSettingsSecurityComponent } from './tutor-settings-security.component';

describe('TutorSettingsSecurityComponent', () => {
  let component: TutorSettingsSecurityComponent;
  let fixture: ComponentFixture<TutorSettingsSecurityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TutorSettingsSecurityComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorSettingsSecurityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
