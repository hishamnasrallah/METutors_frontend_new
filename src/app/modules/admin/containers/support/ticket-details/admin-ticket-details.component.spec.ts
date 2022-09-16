import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTicketDetailsComponent } from './admin-ticket-details.component';

describe('AdminTicketDetailsComponent', () => {
  let component: AdminTicketDetailsComponent;
  let fixture: ComponentFixture<AdminTicketDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminTicketDetailsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTicketDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
