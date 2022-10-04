import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminViewRejectionReasonModalComponent } from './admin-view-rejection-reason-modal.component';

describe('AdminViewRejectionReasonModalComponent', () => {
  let component: AdminViewRejectionReasonModalComponent;
  let fixture: ComponentFixture<AdminViewRejectionReasonModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminViewRejectionReasonModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminViewRejectionReasonModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
