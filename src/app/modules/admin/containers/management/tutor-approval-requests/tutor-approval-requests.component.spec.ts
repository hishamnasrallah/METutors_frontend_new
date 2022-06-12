import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTutorApprovalRequestsComponent } from './tutor-approval-requests.component';

describe('AdminTutorApprovalRequestsComponent', () => {
  let component: AdminTutorApprovalRequestsComponent;
  let fixture: ComponentFixture<AdminTutorApprovalRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminTutorApprovalRequestsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTutorApprovalRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
