import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminReassigningTutorSelectionModalComponent } from './admin-reassigning-tutor-selection-modal.component';

describe('AdminReassigningTutorSelectionModalComponent', () => {
  let component: AdminReassigningTutorSelectionModalComponent;
  let fixture: ComponentFixture<AdminReassigningTutorSelectionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminReassigningTutorSelectionModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(
      AdminReassigningTutorSelectionModalComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
