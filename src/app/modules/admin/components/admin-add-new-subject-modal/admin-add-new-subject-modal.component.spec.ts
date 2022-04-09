import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddNewSubjectModalComponent } from './admin-add-new-subject-modal.component';

describe('AdminAddNewSubjectModalComponent', () => {
  let component: AdminAddNewSubjectModalComponent;
  let fixture: ComponentFixture<AdminAddNewSubjectModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAddNewSubjectModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddNewSubjectModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
