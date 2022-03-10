import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorCreateTicketComponent } from './tutor-create-ticket.component';

describe('TutorCreateTicketComponent', () => {
  let component: TutorCreateTicketComponent;
  let fixture: ComponentFixture<TutorCreateTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TutorCreateTicketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorCreateTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
