import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorApprovalRequestComponent } from './tutor-approval-request.component';

describe('TutorApprovalRequestComponent', () => {
  let component: TutorApprovalRequestComponent;
  let fixture: ComponentFixture<TutorApprovalRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TutorApprovalRequestComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorApprovalRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
