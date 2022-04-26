import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPendingTutorsComponent } from './admin-pending-tutors.component';

describe('AdminPendingTutorsComponent', () => {
  let component: AdminPendingTutorsComponent;
  let fixture: ComponentFixture<AdminPendingTutorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminPendingTutorsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPendingTutorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
