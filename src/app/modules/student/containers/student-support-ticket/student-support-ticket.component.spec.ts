import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentSupportTicketComponent } from './student-support-ticket.component';

describe('StudentSupportTicketComponent', () => {
  let component: StudentSupportTicketComponent;
  let fixture: ComponentFixture<StudentSupportTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentSupportTicketComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentSupportTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
