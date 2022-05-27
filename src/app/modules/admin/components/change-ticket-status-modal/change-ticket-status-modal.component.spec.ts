import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeTicketStatusModalComponent } from './change-ticket-status-modal.component';

describe('ChangeTicketStatusModalComponent', () => {
  let component: ChangeTicketStatusModalComponent;
  let fixture: ComponentFixture<ChangeTicketStatusModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChangeTicketStatusModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeTicketStatusModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
