import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddNewFieldStudyModalComponent } from './admin-add-new-field-study-modal.component';

describe('AdminAddNewFieldStudyModalComponent', () => {
  let component: AdminAddNewFieldStudyModalComponent;
  let fixture: ComponentFixture<AdminAddNewFieldStudyModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAddNewFieldStudyModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddNewFieldStudyModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
