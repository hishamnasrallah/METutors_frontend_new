import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentSettingsAccountComponent } from './student-settings-account.component';

describe('StudentSettingsAccountComponent', () => {
  let component: StudentSettingsAccountComponent;
  let fixture: ComponentFixture<StudentSettingsAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentSettingsAccountComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentSettingsAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
