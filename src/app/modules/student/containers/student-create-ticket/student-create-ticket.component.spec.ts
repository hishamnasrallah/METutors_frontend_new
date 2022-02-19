import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentCreateTicketComponent } from './student-create-ticket.component';

describe('StudentCreateTicketComponent', () => {
  let component: StudentCreateTicketComponent;
  let fixture: ComponentFixture<StudentCreateTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentCreateTicketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentCreateTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
