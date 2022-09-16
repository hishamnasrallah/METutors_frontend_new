import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddNewProgramModalComponent } from './admin-add-new-program-modal.component';

describe('AdminAddNewProgramModalComponent', () => {
  let component: AdminAddNewProgramModalComponent;
  let fixture: ComponentFixture<AdminAddNewProgramModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminAddNewProgramModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddNewProgramModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
