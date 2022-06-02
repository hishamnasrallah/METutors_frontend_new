import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProgramListComponent } from './admin-program-list.component';

describe('AdminProgramListComponent', () => {
  let component: AdminProgramListComponent;
  let fixture: ComponentFixture<AdminProgramListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminProgramListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProgramListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
