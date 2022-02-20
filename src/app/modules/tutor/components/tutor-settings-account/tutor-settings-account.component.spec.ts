import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorSettingsAccountComponent } from './tutor-settings-account.component';

describe('TutorSettingsAccountComponent', () => {
  let component: TutorSettingsAccountComponent;
  let fixture: ComponentFixture<TutorSettingsAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TutorSettingsAccountComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorSettingsAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
