import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSuspendedTutorsComponent } from './admin-suspended-tutors.component';

describe('AdminSuspendedTutorsComponent', () => {
  let component: AdminSuspendedTutorsComponent;
  let fixture: ComponentFixture<AdminSuspendedTutorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminSuspendedTutorsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSuspendedTutorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
