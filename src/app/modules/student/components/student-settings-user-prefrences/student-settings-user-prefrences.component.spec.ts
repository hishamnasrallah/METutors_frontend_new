import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentSettingsUserPrefrencesComponent } from './student-settings-user-prefrences.component';

describe('StudentSettingsUserPrefrencesComponent', () => {
  let component: StudentSettingsUserPrefrencesComponent;
  let fixture: ComponentFixture<StudentSettingsUserPrefrencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentSettingsUserPrefrencesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentSettingsUserPrefrencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
