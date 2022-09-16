import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorApprovalGridComponent } from './tutor-approval-grid.component';

describe('TutorApprovalGridComponent', () => {
  let component: TutorApprovalGridComponent;
  let fixture: ComponentFixture<TutorApprovalGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TutorApprovalGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorApprovalGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
