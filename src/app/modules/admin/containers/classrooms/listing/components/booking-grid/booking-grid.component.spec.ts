import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingGridComponent } from './booking-grid.component';

describe('BookingGridComponent', () => {
  let component: BookingGridComponent;
  let fixture: ComponentFixture<BookingGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookingGridComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
