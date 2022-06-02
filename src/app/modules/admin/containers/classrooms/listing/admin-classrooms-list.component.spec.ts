import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminClassroomsListComponent } from './admin-classrooms-list.component';

describe('AdminClassroomsListComponent', () => {
  let component: AdminClassroomsListComponent;
  let fixture: ComponentFixture<AdminClassroomsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminClassroomsListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminClassroomsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
