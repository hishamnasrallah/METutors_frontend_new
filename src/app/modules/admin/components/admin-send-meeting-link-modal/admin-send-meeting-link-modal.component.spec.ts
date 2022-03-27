import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSendMeetingLinkModalComponent } from './admin-send-meeting-link-modal.component';

describe('AdminSendMeetingLinkModalComponent', () => {
  let component: AdminSendMeetingLinkModalComponent;
  let fixture: ComponentFixture<AdminSendMeetingLinkModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminSendMeetingLinkModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSendMeetingLinkModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
