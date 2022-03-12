import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSupportTicketComponent } from './admin-support-ticket.component';

describe('AdminSupportTicketComponent', () => {
  let component: AdminSupportTicketComponent;
  let fixture: ComponentFixture<AdminSupportTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminSupportTicketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSupportTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
