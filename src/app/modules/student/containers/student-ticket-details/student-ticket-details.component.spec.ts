import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentTicketDetailsComponent } from './student-ticket-details.component';

describe('StudentTicketDetailsComponent', () => {
  let component: StudentTicketDetailsComponent;
  let fixture: ComponentFixture<StudentTicketDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentTicketDetailsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentTicketDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
