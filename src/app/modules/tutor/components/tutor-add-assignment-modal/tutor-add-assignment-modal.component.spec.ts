import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorAddAssignmentModalComponent } from './tutor-add-assignment-modal.component';

describe('TutorAddAssignmentModalComponent', () => {
  let component: TutorAddAssignmentModalComponent;
  let fixture: ComponentFixture<TutorAddAssignmentModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TutorAddAssignmentModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorAddAssignmentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
