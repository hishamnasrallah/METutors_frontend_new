import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPreviousTeachersModalComponent } from './admin-previous-teachers-modal.component';

describe('AdminPreviousTeachersModalComponent', () => {
  let component: AdminPreviousTeachersModalComponent;
  let fixture: ComponentFixture<AdminPreviousTeachersModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminPreviousTeachersModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPreviousTeachersModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
