import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentSettingsSecurityComponent } from './student-settings-security.component';

describe('StudentSettingsSecurityComponent', () => {
  let component: StudentSettingsSecurityComponent;
  let fixture: ComponentFixture<StudentSettingsSecurityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentSettingsSecurityComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentSettingsSecurityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
