import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorSupportTicketComponent } from './tutor-support-ticket.component';

describe('TutorSupportTicketComponent', () => {
  let component: TutorSupportTicketComponent;
  let fixture: ComponentFixture<TutorSupportTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TutorSupportTicketComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorSupportTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
