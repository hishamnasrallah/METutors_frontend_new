import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorTicketDetailsComponent } from './tutor-ticket-details.component';

describe('TutorTicketDetailsComponent', () => {
  let component: TutorTicketDetailsComponent;
  let fixture: ComponentFixture<TutorTicketDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TutorTicketDetailsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorTicketDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
