import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProgramHomeComponent } from './admin-program-home.component';

describe('AdminProgramListComponent', () => {
  let component: AdminProgramHomeComponent;
  let fixture: ComponentFixture<AdminProgramHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminProgramHomeComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProgramHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
