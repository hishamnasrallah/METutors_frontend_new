import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDeclineInterviewModalComponent } from './admin-decline-interview-modal.component';

describe('AdminDeclineInterviewModalComponent', () => {
  let component: AdminDeclineInterviewModalComponent;
  let fixture: ComponentFixture<AdminDeclineInterviewModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminDeclineInterviewModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDeclineInterviewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
