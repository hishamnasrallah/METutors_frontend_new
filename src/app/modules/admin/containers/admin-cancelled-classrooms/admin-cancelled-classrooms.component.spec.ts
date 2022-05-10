import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCancelledClassroomsComponent } from './admin-cancelled-classrooms.component';

describe('AdminCancelledClassroomsComponent', () => {
  let component: AdminCancelledClassroomsComponent;
  let fixture: ComponentFixture<AdminCancelledClassroomsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminCancelledClassroomsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCancelledClassroomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
