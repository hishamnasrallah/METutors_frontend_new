import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminScheduleInterviewModalComponent } from '@metutor/modules/admin/components';

describe('AdminScheduleMeetingModalComponent', () => {
  let component: AdminScheduleInterviewModalComponent;
  let fixture: ComponentFixture<AdminScheduleInterviewModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminScheduleInterviewModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminScheduleInterviewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
