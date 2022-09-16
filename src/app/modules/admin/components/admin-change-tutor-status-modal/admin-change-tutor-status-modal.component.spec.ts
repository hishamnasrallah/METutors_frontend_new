import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminChangeTutorStatusModalComponent } from './admin-change-tutor-status-modal.component';

describe('ChangeStatusModalComponent', () => {
  let component: AdminChangeTutorStatusModalComponent;
  let fixture: ComponentFixture<AdminChangeTutorStatusModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminChangeTutorStatusModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminChangeTutorStatusModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
