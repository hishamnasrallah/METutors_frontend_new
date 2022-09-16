import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportTicketCardComponent } from './support-ticket-card.component';

describe('SupportTicketCardComponent', () => {
  let component: SupportTicketCardComponent;
  let fixture: ComponentFixture<SupportTicketCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SupportTicketCardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportTicketCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
